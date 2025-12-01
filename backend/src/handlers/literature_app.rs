use anyhow::Result;
use axum::extract::State;
use sqlx;
use axum::Json;
use reqwest::StatusCode;
use serde::Deserialize;
use axum_extra::extract::cookie::{SignedCookieJar};

use crate::models::literature_app::LiteratureItem;
use crate::states::AppState;

#[derive(Deserialize)]
pub struct SearchRequest {
    #[serde(rename = "searchKeywords")]
    search_keywords: String}

fn internal<E: std::fmt::Display>(e: E) -> (StatusCode, String) {
    (StatusCode::INTERNAL_SERVER_ERROR, e.to_string())
}

pub async fn get_literature_items(
    State(state): State<AppState>,
    jar: SignedCookieJar,
    Json(request): Json<SearchRequest>)
    -> Result<Json<Vec<LiteratureItem>>, (StatusCode, String)> {

    let private_access = jar
        .get("session_user_id")
        .and_then(|c| c.value().parse::<i64>().ok())
        .is_some();

    let search_input = format!("%{}%", request.search_keywords);

    let items = sqlx::query_as::<_, LiteratureItem>(
        r#"
        SELECT id, title, author, keywords, timestamp_upload, timestamp_modified, views, public, content
        FROM literature.items
        WHERE (title ILIKE $1 OR author ILIKE $1 OR keywords ILIKE $1)
          AND ($2::bool OR public = TRUE)
        ORDER BY id DESC
        "#
    )
    .bind(&search_input)
    .bind(private_access)
    .fetch_all(&state.pool)
    .await
    .map_err(internal)?;

    Ok(Json(items))
}