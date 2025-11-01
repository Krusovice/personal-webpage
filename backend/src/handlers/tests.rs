use axum::{http};

// Handlers
pub async fn print_hello() -> (http::StatusCode, String) {
    let s = "Hello!\n".to_string();

    (http::StatusCode::OK, s)
}

pub async fn healthz() -> &'static str { "ok" }