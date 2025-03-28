use reqwest::{blocking::Client, header::AUTHORIZATION};
use serde::{Deserialize, Serialize};
use serde_json::Value;
use std::sync::{Arc, Mutex};
use tauri::State;
use tauri_plugin_store::StoreExt;

pub const STORE_PATH: &str = "store.json";
const API_URL: &str = "http://localhost:3000";

pub struct AuthState {
    pub token: Arc<Mutex<Option<String>>>,
}

#[derive(Deserialize, Serialize, Debug)]
#[serde(rename_all = "camelCase")]
pub struct CreateProjectPayload {
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

#[tauri::command]
pub fn log_message(message: String) {
    println!("{}", message);
}

#[tauri::command]
pub fn create_project(
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
pub fn check_auth(app: tauri::AppHandle, state: State<AuthState>) -> Result<Value, String> {
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
