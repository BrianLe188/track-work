// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
use reqwest::blocking::Client;
use serde_json::Value;
use std::sync::{Arc, Mutex};
use tauri::State;

struct AuthState {
    token: Arc<Mutex<Option<String>>>,
}

const API_URL: &str = "http://localhost:3000/auth/sign-in";

#[tauri::command]
fn sign_in(
    app: tauri::AppHandle,
    state: State<AuthState>,
    email: String,
    password: String,
) -> Result<Value, String> {
    let client = Client::new();

    let response = client
        .post(API_URL)
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
        *auth_token = Some(token);

        let user = json["user"].clone();

        Ok(user)
    } else {
        Err(format!("Login failed: {}", response.status()))
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let auth_state = AuthState {
        token: Arc::new(Mutex::new(None)),
    };

    tauri::Builder::default()
        .manage(auth_state)
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![sign_in])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
