use serde::{Deserialize, Serialize};
use sqlx::types::chrono::{DateTime, Utc};


#[derive(Serialize, Deserialize, sqlx::FromRow)]
pub struct StockData {
    pub ticker: i64,
    pub ticker: String,
    pub date: String,
    pub closing_price: String,
}