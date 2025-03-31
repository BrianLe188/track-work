mod handlers;
mod state;
mod utils;

use handlers::*;
use handlers::{
    handle_capture_screen, handle_logout, handle_stop_capture_screen, CaptureScreenPayload,
    HideWindowScreenshotPopupPayload, STORE_PATH,
};
use state::{AuthState, TrackingState};
use std::sync::{Arc, Mutex};
use tauri::{App, AppHandle, Listener, Manager, WebviewUrl, WebviewWindowBuilder, Wry};
use tauri_plugin_store::{Store, StoreExt};

#[tauri::command]
fn log_message(message: String) {
    println!("{}", message);
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let auth_state = AuthState {
        token: Arc::new(Mutex::new(None)),
    };

    let tracking_state = TrackingState {
        running: Arc::new(Mutex::new(None)),
    };

    tauri::Builder::default()
        .manage(auth_state)
        .manage(tracking_state)
        .plugin(tauri_plugin_store::Builder::default().build())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            log_message,
            sign_in,
            check_auth,
            create_project
        ])
        .setup(setup_app)
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

fn setup_app(app: &mut App) -> Result<(), Box<dyn std::error::Error>> {
    let store = app.store(STORE_PATH)?;
    let app_handle = app.handle();

    setup_screenshot_window(app_handle.clone());
    setup_event_listeners(app, store, app_handle);

    Ok(())
}

fn setup_event_listeners(app: &App, store: Arc<Store<Wry>>, app_handle: &AppHandle) {
    setup_logout_listener(app, store.clone(), app_handle.clone());
    setup_capture_screen_listener(app, app_handle.clone());
    setup_stop_capture_listener(app, app_handle.clone());
    setup_hide_window_listener(app, app_handle.clone());
}

fn setup_screenshot_window(app_handle: AppHandle) {
    if let Ok(monitor) = app_handle.primary_monitor() {
        if let Some(monitor) = monitor {
            let monitor_size = monitor.size();
            let _ = WebviewWindowBuilder::new(
                &app_handle,
                "screenshot_popup",
                WebviewUrl::App("/screenshot-popup".into()),
            )
            .title("Screenshot")
            .position(monitor_size.width as f64 - 200.0, 0.0)
            .inner_size(200.0, 160.0)
            .resizable(false)
            .decorations(false)
            .visible(false)
            .build();
        }
    }
}

fn setup_logout_listener(app: &App, store: Arc<Store<Wry>>, app_handle: AppHandle) {
    app.listen("logout", move |_event| {
        if let Err(e) = handle_logout(&app_handle, &store) {
            eprintln!("Error during logout: {}", e);
        }
    });
}

fn setup_capture_screen_listener(app: &App, app_handle: AppHandle) {
    app.listen("capture_screen", move |event| {
        if let Ok(payload) = serde_json::from_str::<CaptureScreenPayload>(event.payload()) {
            if let Err(e) = handle_capture_screen(&app_handle, payload) {
                eprintln!("Error during screen capture: {}", e);
            }
        }
    });
}

fn setup_stop_capture_listener(app: &App, app_handle: AppHandle) {
    app.listen("stop_capture_screen", move |_event| {
        if let Err(e) = handle_stop_capture_screen(&app_handle) {
            eprintln!("Error stopping screen capture: {}", e);
        }
    });
}

fn setup_hide_window_listener(app: &App, app_handle: AppHandle) {
    app.listen("hide_window_screenshot_popup", move |event| {
        if let Ok(payload) =
            serde_json::from_str::<HideWindowScreenshotPopupPayload>(event.payload())
        {
            println!("{:?}", payload);
            if let Some(win) = app_handle.get_webview_window("screenshot_popup") {
                match payload.key.as_str() {
                    "accept_image" => {
                        println!("✅ Image accepted");
                        if let Err(err) = win.hide() {
                            println!("{}", err);
                        }
                    }
                    "remove_image" => {
                        println!("❌ Image removed");
                        if let Err(err) = win.hide() {
                            println!("{}", err);
                        }
                    }
                    _ => {
                        eprintln!("Unknown key: {}", payload.key);
                    }
                }
            } else {
                eprintln!("🚨 screenshot_popup window not found!");
            }
        } else {
            eprintln!("Hide window: error while parse error");
        }
    });
}
