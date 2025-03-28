use serde::{Deserialize, Serialize};
use serde_json::json;
use std::sync::{Arc, Mutex};
use tauri::{Emitter, Listener, Manager, WebviewUrl, WebviewWindowBuilder, Wry};
use tauri_plugin_store::StoreExt;
use uuid::Uuid;
use xcap::Monitor;

mod cmd;
mod utils;

use cmd::{check_auth, create_project, log_message, sign_in, AuthState, STORE_PATH};

// struct TrackingState {
//     running: Arc<Mutex<bool>>,
// }

#[derive(Deserialize, Serialize, Debug)]
#[serde(rename_all = "camelCase")]
struct CaptureScreenPayload {
    monitor_index: Option<u8>,
}

fn handle_logout(
    app: &tauri::AppHandle,
    store: &Arc<tauri_plugin_store::Store<Wry>>,
) -> Result<(), String> {
    let state = app.state::<AuthState>();
    let mut token = state
        .token
        .lock()
        .map_err(|e| format!("Failed to lock token: {}", e))?;
    *token = None;

    store.delete("token");
    println!("User logging out");
    Ok(())
}

fn handle_capture_screen(
    app: &tauri::AppHandle,
    payload: CaptureScreenPayload,
) -> Result<(), String> {
    let monitor_index = payload.monitor_index;

    match monitor_index {
        Some(index) => {
            let monitors = Monitor::all().map_err(|e| format!("Failed to get monitors: {}", e))?;
            let monitors = monitors.clone();

            if (index as usize) >= monitors.len() {
                return Err("Invalid monitor index".to_string());
            }

            let monitor = monitors
                .get(index as usize)
                .ok_or_else(|| "Monitor not found".to_string())?
                .clone();

            let app_handle = app.clone();

            utils::start_interval(move || {
                if let Ok(image) = monitor
                    .capture_image()
                    .map_err(|e| format!("Failed to capture image: {}", e))
                {
                    let _ = std::fs::create_dir_all("target/monitors")
                        .map_err(|e| format!("Failed to create directory: {}", e));

                    let filename = Uuid::new_v4();

                    let file_path = format!("target/monitors/{}.png", filename);
                    let _ = image
                        .save(&file_path)
                        .map_err(|e| format!("Failed to save image to {}: {}", file_path, e));

                    if let Some(win) = app_handle.get_webview_window("screenshot_popup") {
                        println!("📢 Emitting event to screenshot_popup...");
                        let _ = win.show();
                        let _ = win.emit(
                            "show_tracking_screenshot",
                            json!({ "path": "", "key": filename }),
                        );
                    } else {
                        println!("❌ screenshot_popup window not found!");
                    }
                }
            });

            Ok(())
        }
        None => Err("No monitor index provided".to_string()),
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let auth_state = AuthState {
        token: Arc::new(Mutex::new(None)),
    };

    tauri::Builder::default()
        .manage(auth_state)
        .plugin(tauri_plugin_store::Builder::default().build())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            log_message,
            sign_in,
            check_auth,
            create_project
        ])
        .setup(|app| {
            let store = app.store(STORE_PATH)?;
            let app_handle = app.handle();

            let primary_monitor = app_handle.primary_monitor();

            if let Some(monitor) = primary_monitor.as_ref().ok().and_then(|m| m.as_ref()) {
                let monitor_size = monitor.size();
                let _ = WebviewWindowBuilder::new(
                    app_handle,
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

            {
                let handle = app_handle.clone();
                app.listen("logout", move |_event| {
                    if let Err(e) = handle_logout(&handle, &store) {
                        eprintln!("Error during logout: {}", e);
                    }
                });
            }

            {
                let handle = app_handle.clone();
                app.listen("capture_screen", move |event| {
                    if let Ok(payload) =
                        serde_json::from_str::<CaptureScreenPayload>(event.payload())
                    {
                        if let Err(e) = handle_capture_screen(&handle, payload) {
                            eprintln!("Error during screen capture: {}", e);
                        }
                    }
                });
            }

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
