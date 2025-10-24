use axum::{http};

// Handlers
pub async fn print_hello() -> (http::StatusCode, String) {
    let s = "Hello!".to_string();

    (http::StatusCode::OK, s)
}