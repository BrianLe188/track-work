use std::sync::{Arc, Mutex};
use tokio::task;
use tokio::time::{self, Duration};

pub fn start_interval<F>(callback: F) -> Arc<Mutex<bool>>
where
    F: Fn() + Send + 'static,
{
    let running = Arc::new(Mutex::new(true));
    let running_clone = running.clone();

    task::spawn(async move {
        let mut interval = time::interval(Duration::from_secs(20));

        while *running_clone.lock().unwrap() {
            interval.tick().await;
            callback();
        }
    });

    running
}
