use serde::{Deserialize, Serialize};
use sqlx;

#[derive(Serialize, Deserialize, sqlx::FromRow)]
pub struct LiteratureItem {
    id: i32,
    title: String,
    author: String,
    keywords: String,
    timestamp_upload: chrono::DateTime<chrono::Utc>,
    timestamp_modified: chrono::DateTime<chrono::Utc>,
}