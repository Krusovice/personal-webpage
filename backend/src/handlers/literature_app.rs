use anyhow::Result;
use axum::{http, extract::State};
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
    jar: SignedCookieJar
    Json(request): Json<SearchRequest>)
    -> Result<Json<Vec<LiteratureItem>>, (http::StatusCode, String)> {

    // checking for user id
    let Some(user_id_cookie) = jar.get("user_id");

    if user_id_cookie {
        rights = "user";
    } else {
        rights = "public"
    } // Add rights = admin, to allow for literature uploads


    let pattern = format!("%{}%", request.search_keywords);

    let items = sqlx::query_as::<_, LiteratureItem>(
        r#"
        SELECT id, title, author, keywords, timestamp_upload, timestamp_modified, views
        FROM literature.items
        WHERE title ILIKE $1 OR author ILIKE $1 OR keywords ILIKE $1
        ORDER BY id DESC
        "#
    )
    .bind(pattern)
    .fetch_all(&state.pool)
    .await
    .map_err(internal)?;

    Ok(Json(items))
}