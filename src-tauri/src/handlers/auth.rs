use crate::state::AuthState;
use reqwest::{blocking::Client, header::AUTHORIZATION};
use serde_json::Value;
use tauri::{State, Manager, Wry};
use tauri_plugin_store::StoreExt;
use std::sync::Arc;

pub const API_URL: &str = "http://localhost:3000";
pub const STORE_PATH: &str = "store.json";

pub fn handle_logout(
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

#[tauri::command]
pub fn check_auth(app: tauri::AppHandle, state: State<AuthState>) -> Result<Value, String> {
    let client = Client::new();

    let token = get_token(&app, &state)?;
    let response = client
        .get(format!("{}/auth/check-auth", API_URL))
        .header(AUTHORIZATION, format!("Bearer {}", token))
        .send()
        .map_err(|e| format!("Failed to send request: {}", e))?;

    handle_auth_response(response)
}

#[tauri::command]
pub fn sign_in(
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
        let json: Value = response
            .json()
            .map_err(|e| format!("Failed to parse JSON: {}", e))?;

        save_token(&app, &state, &json)?;
        Ok(json["user"].clone())
    } else {
        Err(format!("Login failed: {}", response.status()))
    }
}

pub fn get_token(app: &tauri::AppHandle, state: &State<AuthState>) -> Result<String, String> {
    let token_lock = state.token.lock().unwrap();
    if let Some(token) = &*token_lock {
        Ok(token.clone())
    } else {
        let store = app
            .store(STORE_PATH)
            .map_err(|e| format!("Store error: {}", e))?;
        store
            .get("token")
            .and_then(|v| v.as_str().map(|s| s.to_string()))
            .ok_or_else(|| "No token found".to_string())
    }
}

fn save_token(app: &tauri::AppHandle, state: &State<AuthState>, json: &Value) -> Result<(), String> {
    let token = json["access_token"]
        .as_str()
        .ok_or("No token in response")?
        .to_string();

    let mut auth_token = state.token.lock().unwrap();
    *auth_token = Some(token.clone());

    if let Ok(store) = app.store(STORE_PATH) {
        store.set("token", token);
    }
    Ok(())
}

fn handle_auth_response(response: reqwest::blocking::Response) -> Result<Value, String> {
    if response.status().is_success() {
        response
            .json()
            .map_err(|e| format!("Failed to parse JSON: {}", e))
    } else {
        Err(format!("Auth check failed: {}", response.status()))
    }
}