use anyhow::Result;
use axum::extract::State;
use sqlx;
use axum::Json;
use axum::http::StatusCode;
use serde::Deserialize;
use axum_extra::extract::cookie::{SignedCookieJar};

use crate::models::stocks_app::StockData;
use crate::states::AppState;

#[derive(Deserialize)]
pub struct FetchRequest {
    #[serde(rename = "fromDate")]
    from_date: String,
    tickers: Vec<String>,
    }

fn internal<E: std::fmt::Display>(e: E) -> (StatusCode, String) {
    (StatusCode::INTERNAL_SERVER_ERROR, e.to_string())
}

pub async fn get_stock_data(
    State(state): State<AppState>,
    Json(request): Json<FetchRequest>)
    -> Result<Json<Vec<StockData>>, (StatusCode, String)> {

    let tickers = format!("{}", request.tickers);
    let from_date = format!("%{}%", request.from_date);

    let items = sqlx::query_as::<_, StockData>(
        r#"
        SELECT id, ticker, date, closing_price
        FROM stockmarket.stock_prices
        WHERE ticker in ANY($1)
        AND date >= $2
        "#
    )
    .bind(&tickers)
    .bind(&fromDate)
    .fetch_all(&state.pool)
    .await
    .map_err(internal)?;

    Ok(Json(items))
}