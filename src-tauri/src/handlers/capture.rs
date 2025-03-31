use crate::state::TrackingState;
use serde::{Deserialize, Serialize};
use tauri::{Emitter, Manager};
use uuid::Uuid;
use xcap::Monitor;

#[derive(Deserialize, Serialize, Debug)]
#[serde(rename_all = "camelCase")]
pub struct CaptureScreenPayload {
    monitor_index: Option<u8>,
}

#[derive(Deserialize, Serialize, Debug)]
#[serde(rename_all = "camelCase")]
pub struct HideWindowScreenshotPopupPayload {
    pub key: String,
}

pub fn handle_capture_screen(
    app: &tauri::AppHandle,
    payload: CaptureScreenPayload,
) -> Result<(), String> {
    let state = app.state::<TrackingState>();
    let monitor = get_monitor(payload.monitor_index)?;
    let app_handle = app.clone();

    let interval_handle = crate::utils::start_interval(move || {
        capture_and_show_screenshot(&app_handle, &monitor);
    });

    *state.running.lock().unwrap() = Some(interval_handle);
    Ok(())
}

pub fn handle_stop_capture_screen(app: &tauri::AppHandle) -> Result<(), String> {
    let state = app.state::<TrackingState>();
    if let Some(running) = state.running.lock().unwrap().as_ref() {
        *running.lock().unwrap() = false;
        println!("🛑 Stopping screen capture...");
    }
    Ok(())
}

fn get_monitor(index: Option<u8>) -> Result<Monitor, String> {
    let Some(index) = index else {
        return Err("No monitor index provided".to_string());
    };

    let monitors = Monitor::all().map_err(|e| format!("Failed to get monitors: {}", e))?;
    if (index as usize) >= monitors.len() {
        return Err("Invalid monitor index".to_string());
    }

    monitors
        .get(index as usize)
        .ok_or_else(|| "Monitor not found".to_string())
        .map(|m| m.clone())
}

fn capture_and_show_screenshot(app_handle: &tauri::AppHandle, monitor: &Monitor) {
    if let Ok(image) = monitor.capture_image() {
        let filename = Uuid::new_v4();
        let file_path = format!("target/monitors/{}.png", filename);

        if let Err(e) = std::fs::create_dir_all("target/monitors") {
            eprintln!("Failed to create directory: {}", e);
            return;
        }

        if let Err(e) = image.save(&file_path) {
            eprintln!("Failed to save image: {}", e);
            return;
        }

        if let Some(win) = app_handle.get_webview_window("screenshot_popup") {
            println!("📢 Emitting event to screenshot_popup...");
            let _ = win.show();
            let _ = win.emit(
                "show_tracking_screenshot",
                serde_json::json!({ "path": "", "key": filename }),
            );
        } else {
            println!("❌ screenshot_popup window not found!");
        }
    }
}
