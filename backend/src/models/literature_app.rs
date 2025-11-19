use serde::{Deserialize, Serialize};
use sqlx::types::chrono::{DateTime, Utc};


#[derive(Serialize, Deserialize, sqlx::FromRow)]
pub struct LiteratureItem {
    pub id: i64,
    pub title: String,
    pub author: String,
    pub keywords: String,
    pub content: String,
    pub timestamp_upload: Option<DateTime<Utc>>,
    pub timestamp_modified: Option<DateTime<Utc>>,
    pub views: i64,
}