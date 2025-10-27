use anyhow::Result;
use axum::{http, extract::State};
use sqlx;
use axum::Json;
use reqwest::StatusCode;


use crate::{AppState, LiteratureItem};

fn internal<E: std::fmt::Display>(e: E) -> (StatusCode, String) {
    (StatusCode::INTERNAL_SERVER_ERROR, e.to_string())
}

async fn get_all_literature_items(
    State(state): State<AppState>)
    -> Result<Json<Vec<LiteratureItem>>, (http::StatusCode, String)> {
    let items = sqlx::query_as::<_, LiteratureItem>(
        r#"
        SELECT id, title, author, keywords, timestamp_upload, timestamp_modified
        FROM literature.items
        ORDER BY id DESC
        LIMIT 100
        "#,
    )
    .fetch_all(&state.pool)
    .await
    .map_err(internal)?;

    Ok(Json(items))
}