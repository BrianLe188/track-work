use tokio::task;
use tokio::time::{self, Duration};

pub fn start_interval<F>(callback: F)
where
    F: Fn() + Send + 'static,
{
    task::spawn(async move {
        let mut interval = time::interval(Duration::from_secs(2));

        loop {
            interval.tick().await;
            callback()
        }
    });
}
