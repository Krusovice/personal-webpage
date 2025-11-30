use anyhow::Result;
use std::net::SocketAddr;

use tokio::net::TcpListener;
use axum::{Router};
use axum::routing::{get, post};
use sqlx::{PgPool};
use tower_http::cors::{Any, CorsLayer};
use axum_extra::extract::cookie::{Key};

use backend::handlers::tests::{print_hello, healthz};
use backend::states::AppState;
use backend::handlers::auth::{register, login, logout, user_information};
use backend::handlers::literature_app::get_literature_items;
use backend::handlers::literature::view_file::view_literature_file;

#[tokio::main]
async fn main() -> Result<()> {

    // Constants from environment.
    let _ = dotenvy::from_filename("../.env");

    let database_url = std::env::var("DATABASE_URL").expect("DATABASE_URL not set");

    let backend_ip = std::env::var("BACKEND_IP").expect("BACKEND_IP not set");
    let backend_port = std::env::var("BACKEND_PORT").expect("BACKEND_PORT not set");

    // Postgres connection pool
    println!("{}", database_url);
    let pool = PgPool::connect(&database_url).await?;

    // User Cookie key 
    let cookie_key = Key::generate();

    // Appstate
    let state = AppState::new(pool, cookie_key);

    // Cors layer
    let cors = CorsLayer::new()
        .allow_origin(Any)   // narrow later to your frontend origin
        .allow_methods(Any)
        .allow_headers(Any);

    // Setting routes
    let app = Router::new()
        .route("/print_hello", get(print_hello))
        .route("/healthz", get(healthz))
        .route("/api/auth/register", post(register))
        .route("/api/auth/login",    post(login))
        .route("/api/auth/logout",   post(logout))
        .route("/api/auth/me",       get(user_information))
        .route("/api/search_literature_items", post(get_literature_items))
        .route("/api/literature/:id/file", get(view_literature_file))
        .with_state(state)
        .layer(cors);

    // Set listener
    let addr: SocketAddr = format!("{backend_ip}:{backend_port}")
        .parse()
        .expect("Invalid BACKEND_IP/BACKEND_PORT");

    let listener = TcpListener::bind(addr).await.unwrap();
    println!("Personal-webpage backend server running");
    axum::serve(listener, app).await.unwrap();



    Ok(())
}