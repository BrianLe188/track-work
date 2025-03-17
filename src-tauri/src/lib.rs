// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
use reqwest::{blocking::Client, header::AUTHORIZATION};
use serde_json::Value;
use std::sync::{Arc, Mutex};
use tauri::{Listener, Manager, State};
use tauri_plugin_store::StoreExt;

struct AuthState {
    token: Arc<Mutex<Option<String>>>,
}

const STORE_PATH: &str = "store.json";
const API_URL: &str = "http://localhost:3000";

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

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let auth_state = AuthState {
        token: Arc::new(Mutex::new(None)),
    };

    tauri::Builder::default()
        .manage(auth_state)
        .plugin(tauri_plugin_store::Builder::default().build())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![sign_in, check_auth])
        .setup(|app| {
            let store = app.store(STORE_PATH)?;
            let handle = app.handle();
            let handle_clone = handle.clone();

            app.listen("logout", move |_event| {
                let state = handle_clone.state::<AuthState>();
                let mut token = state.token.lock().unwrap();
                *token = None;

                store.delete("token");
                println!("User loging out");
            });

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
