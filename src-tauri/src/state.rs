use std::sync::{Arc, Mutex};

pub struct AuthState {
    pub token: Arc<Mutex<Option<String>>>,
}

pub struct TrackingState {
    pub running: Arc<Mutex<Option<Arc<Mutex<bool>>>>>,
}
