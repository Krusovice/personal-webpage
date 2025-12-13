use serde::{Deserialize, Serialize};
use chrono::NaiveDate;

#[derive(Serialize, Deserialize, sqlx::FromRow, Debug)]
pub struct StockData {
    pub id: i32,
    pub ticker: String,
    pub date: NaiveDate,
    pub closing_price: f64,
}
