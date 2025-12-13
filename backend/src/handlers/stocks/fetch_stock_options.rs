use anyhow::Result;
use axum::extract::State;
use sqlx;
use axum::Json;
use reqwest::StatusCode;

use crate::states::AppState;

fn internal<E: std::fmt::Display>(e: E) -> (StatusCode, String) {
    eprintln!("INTERNAL ERROR: {e}");
    (StatusCode::INTERNAL_SERVER_ERROR, e.to_string())
}

pub async fn fetch_stock_options(
    State(state): State<AppState>,
) -> Result<Json<Vec<String>>, (StatusCode, String)> {
    let tickers: Vec<String> = sqlx::query_scalar(
        r#"
        SELECT DISTINCT ticker
        FROM stockmarket.stock_prices
        ORDER BY ticker
        "#,
    )
    .fetch_all(&state.pool)
    .await
    .map_err(internal)?;

    Ok(Json(tickers))
}