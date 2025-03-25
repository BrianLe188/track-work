// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
use reqwest::{blocking::Client, header::AUTHORIZATION};
use serde::{Deserialize, Serialize};
use serde_json::Value;
use std::sync::{Arc, Mutex};
use tauri::{Emitter, Listener, Manager, State, WebviewUrl, WebviewWindowBuilder, Wry};
use tauri_plugin_store::StoreExt;
use xcap::Monitor;

mod utils;

struct AuthState {
    token: Arc<Mutex<Option<String>>>,
}

struct TrackingState {
    running: Arc<Mutex<bool>>,
}

#[derive(Deserialize, Serialize, Debug)]
#[serde(rename_all = "camelCase")]
struct CreateProjectPayload {
    name: String,
    thumbnail: Option<String>,
    description: String,
    category: Option<String>,
    start_date: String,
    end_date: Option<String>,
    priority: String,
    team_members: Vec<String>,
    tags: Option<Vec<String>>,
    is_public: Option<bool>,
    repository_url: Option<String>,
}

#[derive(Deserialize, Serialize, Debug)]
#[serde(rename_all = "camelCase")]
struct CaptureScreenPayload {
    monitor_index: Option<u8>,
}

const STORE_PATH: &str = "store.json";
const API_URL: &str = "http://localhost:3000";

#[tauri::command]
fn create_project(
    app: tauri::AppHandle,
    state: State<AuthState>,
    payload: CreateProjectPayload,
) -> Result<Value, String> {
    let client = Client::new();

    let token = {
        let token_lock = state.token.lock().unwrap();
        if let Some(token) = &*token_lock {
            Some(token.clone())
        } else {
            let store = app
                .store(STORE_PATH)
                .map_err(|e| format!("Store error: {}", e))?;
            store
                .get("token")
                .and_then(|v| v.as_str().map(|s| s.to_string()))
        }
    };

    let Some(token) = token else {
        return Err("No token found".to_string());
    };

    let response = client
        .post(format!("{}/projects", API_URL))
        .json(&payload)
        .header(AUTHORIZATION, format!("Bearer {}", token))
        .send()
        .map_err(|e| format!("Failed to send request: {}", e))?;

    if response.status().is_success() {
        let json: serde_json::Value = response
            .json()
            .map_err(|e| format!("Failed to parse JSON: {}", e))?;
        let proj = json["project"].clone();

        Ok(proj)
    } else {
        Err("Something went's wrong while create project.".to_string())
    }
}

#[tauri::command]
fn check_auth(app: tauri::AppHandle, state: State<AuthState>) -> Result<Value, String> {
    let client = Client::new();

    let token = {
        let token_lock = state.token.lock().unwrap();
        if let Some(token) = &*token_lock {
            Some(token.clone())
        } else {
            let store = app
                .store(STORE_PATH)
                .map_err(|e| format!("Store error: {}", e))?;
            store
                .get("token")
                .and_then(|v| v.as_str().map(|s| s.to_string()))
        }
    };

    let Some(token) = token else {
        return Err("No token found".to_string());
    };

    let response = client
        .get(format!("{}/auth/check-auth", API_URL))
        .header(AUTHORIZATION, format!("Bearer {}", token))
        .send()
        .map_err(|e| format!("Failed to send request: {}", e))?;

    if response.status().is_success() {
        let json: serde_json::Value = response
            .json()
            .map_err(|e| format!("failed to parse JSON: {}", e))?;

        let user = json["user"].clone();

        Ok(user)
    } else {
        Err(format!("Login failed: {}", response.status()))
    }
}

#[tauri::command]
fn sign_in(
    app: tauri::AppHandle,
    state: State<AuthState>,
    email: String,
    password: String,
) -> Result<Value, String> {
    let client = Client::new();

    let response = client
        .post(format!("{}/auth/sign-in", API_URL))
        .json(&serde_json::json!({
            "email": email,
            "password": password
        }))
        .send()
        .map_err(|e| format!("Failed to send request: {}", e))?;

    if response.status().is_success() {
        let json: serde_json::Value = response
            .json()
            .map_err(|e| format!("Failed to parse JSON: {}", e))?;

        let token = json["access_token"]
            .as_str()
            .ok_or("No token is response")?
            .to_string();

        let mut auth_token = state.token.lock().unwrap();
        *auth_token = Some(token.clone());

        if let Ok(store) = app.store(STORE_PATH) {
            store.set("token", token);
        }

        let user = json["user"].clone();

        Ok(user)
    } else {
        Err(format!("Login failed: {}", response.status()))
    }
}

fn normalized(filename: String) -> String {
    filename
        .replace(['|', '\\', ':', '/', '*', '?', '"', '<', '>'], "")
        .trim()
        .to_string()
}

fn handle_logout(app: &tauri::AppHandle, store: &Arc<tauri_plugin_store::Store<Wry>>) -> Result<(), String> {
    let state = app.state::<AuthState>();
    let mut token = state.token.lock().map_err(|e| format!("Failed to lock token: {}", e))?;
    *token = None;

    store.delete("token");
    println!("User logging out");
    Ok(())
}

fn handle_capture_screen(app: &tauri::AppHandle, payload: CaptureScreenPayload) -> Result<(), String> {
    let monitor_index = payload.monitor_index;

    match monitor_index {
        Some(index) => {
            let monitors = Monitor::all().map_err(|e| format!("Failed to get monitors: {}", e))?;

            if (index as usize) >= monitors.len() {
                return Err("Invalid monitor index".to_string());
            }

            if let Some(monitor) = monitors.get(index as usize) {
                let image = monitor.capture_image().map_err(|e| format!("Failed to capture image: {}", e))?;
                let monitor_name = monitor.name().unwrap_or("unknown".to_string());
                let normalized_name = normalized(monitor_name.to_string());

                std::fs::create_dir_all("target/monitors")
                    .map_err(|e| format!("Failed to create directory: {}", e))?;

                let file_path = format!("target/monitors/monitor-{}.png", normalized_name);
                image
                    .save(&file_path)
                    .map_err(|e| format!("Failed to save image to {}: {}", file_path, e))?;

                let app_handle = app.clone();
                utils::start_interval(move || {
                    if let Err(e) = WebviewWindowBuilder::new(
                        &app_handle,
                        "screenshot_popup",
                        WebviewUrl::App("/screenshot-popup".into()),
                    )
                    .build()
                    .map_err(|e| format!("Failed to build window: {}", e))
                    .and_then(|_| {
                        app_handle
                            .emit_to("screenshot_popup", "show_tracking_screenshot", "")
                            .map_err(|e| format!("Failed to emit event: {}", e))
                    }) {
                        eprintln!("Error in screenshot popup: {}", e);
                    }
                });
            }
        }
        None => return Err("No monitor index provided".to_string()),
    }
    Ok(())
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
            sign_in,
            check_auth,
            create_project
        ])
        .setup(|app| {
            let store = app.store(STORE_PATH)?;
            let app_handle = app.handle();
            
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
                    if let Ok(payload) = serde_json::from_str::<CaptureScreenPayload>(event.payload()) {
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
