use anyhow::Result;
use axum::extract::State;
use sqlx;
use axum::Json;
use reqwest::StatusCode;
use serde::Deserialize;
use chrono::NaiveDate;

use crate::models::stocks_app::StockData;
use crate::states::AppState;

#[derive(Deserialize)]
pub struct FetchRequest {
    #[serde(rename = "fromDate")]
    from_date: String,
    tickers: Vec<String>,
    }

fn internal<E: std::fmt::Display>(e: E) -> (StatusCode, String) {
    eprintln!("INTERNAL ERROR: {e}");
    (StatusCode::INTERNAL_SERVER_ERROR, e.to_string())
}

pub async fn get_stock_data(
    State(state): State<AppState>,
    Json(request): Json<FetchRequest>)
    -> Result<Json<Vec<StockData>>, (StatusCode, String)> {

    let from_date = NaiveDate::parse_from_str(&request.from_date, "%Y-%m-%d")
        .map_err(|e| (StatusCode::BAD_REQUEST, format!("Invalid date: {e}")))?;
    
    let items = sqlx::query_as::<_, StockData>(
        r#"
        SELECT id, ticker, date, closing_price::float8 AS closing_price
        FROM stockmarket.stock_prices
        WHERE ticker = ANY($1)
        AND date >= $2
        "#
    )
    .bind(&request.tickers)
    .bind(&from_date)
    .fetch_all(&state.pool)
    .await
    .map_err(internal)?;

    println!("{:#?}", items);

    Ok(Json(items))
}