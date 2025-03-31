use serde::{Deserialize, Serialize};
use crate::state::AuthState;
use reqwest::{blocking::Client, header::AUTHORIZATION};
use tauri::State;
use serde_json::Value;
use super::auth::{API_URL, get_token};

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
pub fn create_project(
    app: tauri::AppHandle,
    state: State<AuthState>,
    payload: CreateProjectPayload,
) -> Result<Value, String> {
    let client = Client::new();
    let token = get_token(&app, &state)?;

    let response = client
        .post(format!("{}/projects", API_URL))
        .json(&payload)
        .header(AUTHORIZATION, format!("Bearer {}", token))
        .send()
        .map_err(|e| format!("Failed to send request: {}", e))?;

    if response.status().is_success() {
        let json: Value = response
            .json()
            .map_err(|e| format!("Failed to parse JSON: {}", e))?;
        Ok(json["project"].clone())
    } else {
        Err("Something went wrong while creating project.".to_string())
    }
}