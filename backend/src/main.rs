use anyhow::Result;
use std::net::SocketAddr;

use tokio::net::TcpListener;
use axum::{Router};
use axum::routing::{get, post};
use sqlx::{PgPool};
use tower_http::cors::{Any, CorsLayer};

use axum_extra::extract::cookie::{Cookie};

use backend::handlers::tests::{print_hello, healthz};
use backend::handlers::literature_app::get_literature_items;
use backend::states::AppState;
use backend::helpers::encryption::hash_password;


#[derive(Deserialize)]
struct RegisterBody { email: String, password: String }

#[derive(Deserialize)]
struct LoginBody { email: String, password: String }

#[derive(Serialize)]
struct ApiMsg { message: String }


#[tokio::main]
async fn main() -> Result<()> {

    // Constants from environment.
    let _ = dotenvy::from_filename("../.env");

    let db_url = std::env::var("DB_URL").expect("DB_URL not set");

    let backend_ip = std::env::var("BACKEND_IP").expect("BACKEND_IP not set");
    let backend_port = std::env::var("BACKEND_PORT").expect("BACKEND_PORT not set");

    // pool ?
    println!("{}", db_url);
    let pool = PgPool::connect(&db_url).await?;

    // Cookie key
    let cookie_key = Key::generate();

    // Appstate
    let state = AppState { pool, cookie_key };

    // Cors layer
    let cors = CorsLayer::new()
        .allow_origin(Any)   // narrow later to your frontend origin
        .allow_methods(Any)
        .allow_headers(Any);

    // Setting routes
    let app = Router::new()
        .route("/api/auth/register", post(register))
        .route("/api/auth/login",    post(login))
        .route("/api/auth/logout",   post(logout))
        .route("/print_hello", get(print_hello))
        .route("/healthz", get(healthz))
        .route("/search_literature_items", post(get_literature_items))
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