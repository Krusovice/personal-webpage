use anyhow::Result;

use tokio::net::TcpListener;
use axum::{Router, http};
use axum::routing::get;

use backend::handlers::tests::print_hello;

#[tokio::main]
async fn main() -> Result<()> {
    let app = Router::new()
        .route("/print_hello", get(print_hello));

    let listener = TcpListener::bind("127.0.0.1:8000").await.unwrap();
    println!("Personal-webpage backend server running");
    axum::serve(listener, app).await.unwrap();

    Ok(())
}