use anyhow::Result;

use tokio::net::TcpListener;
use axum::{Router};
use axum::routing::{get, post};
use sqlx::{PgPool};
use tower_http::cors::{Any, CorsLayer};

use backend::handlers::tests::print_hello;
use backend::handlers::literature_app::get_literature_items;
use backend::states::AppState;




#[tokio::main]
async fn main() -> Result<()> {
    // dotenvy::dotenv().ok();
    // let db_url = std::env::var("DATABASE_URL")?;

    // pool ?
    let db_url = std::env::var("DATABASE_URL").expect("DATABASE_URL must be set");
    let pool = PgPool::connect(&db_url).await?;

    // cors layer
    let cors = CorsLayer::new()
        .allow_origin(Any)   // narrow later to your frontend origin
        .allow_methods(Any)
        .allow_headers(Any);

    let app = Router::new()
        .route("/print_hello", get(print_hello))
        .route("/search_literature_items", post(get_literature_items))
        .with_state(AppState { pool })
        .layer(cors);

    let listener = TcpListener::bind("127.0.0.1:5000").await.unwrap();
    println!("Personal-webpage backend server running");
    axum::serve(listener, app).await.unwrap();

    Ok(())
}