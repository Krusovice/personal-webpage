use axum::{extract::{State},routing::{post, get}, Json, Router};
use axum::http::StatusCode;
use axum_extra::extract::cookie::{Cookie, CookieJar, Key, SameSite};
use serde::{Deserialize, Serialize};
use sqlx::{PgPool};
use std::net::SocketAddr;

use backend::helpers::encryption::{hash_password};



async fn register(
    State(state): State<AppState>,
    Json(body): Json<RegisterBody>
) -> Result<Json<ApiMsg>, (StatusCode, String)> {
    // hash pw
    let pw_hash = hash_password(&body.password).await
        .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;

    // indsæt bruger
    let res = sqlx::query!(
        "INSERT INTO users (email, username, password_hash, first_name, last_name, company) VALUES ($1, $2, $3, $4, $5, $6)",
        body.email, body.username, pw_hash, body.first_name, body.last_name, body.company
    )
    .execute(&state.pool).await;

    match res {
        Ok(_) => Ok(Json(ApiMsg { message: "registered".into() })),
        Err(e) if e.as_database_error().map(|d| d.is_unique_violation()).unwrap_or(false) => {
            Err((axum::http::StatusCode::CONFLICT, "email already exists".into()))
        }
        Err(e) => Err((axum::http::StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))
    }
}

async fn login(
    State(state): State<AppState>,
    jar: CookieJar,
    Json(body): Json<LoginBody>
) -> Result<(CookieJar, Json<ApiMsg>), (axum::http::StatusCode, String)> {

    // find bruger
    let row = sqlx::query!(
        "SELECT id, password_hash FROM users WHERE email = $1",
        body.email
    )
    .fetch_optional(&state.pool).await
    .map_err(|e| (axum::http::StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;

    let Some(user) = row else {
        return Err((axum::http::StatusCode::UNAUTHORIZED, "invalid credentials".into()));
    };

    // tjek pw
    if !verify_password(&body.password, &user.password_hash).await {
        return Err((axum::http::StatusCode::UNAUTHORIZED, "invalid credentials".into()));
    }

    // sæt session-cookie
    let jar = set_session_cookie(jar, &state.cookie_key, user.id.unwrap());

    Ok((jar, Json(ApiMsg { message: "logged in".into() })))
}

async fn logout(
    State(state): State<AppState>,
    jar: CookieJar
) -> (CookieJar, Json<ApiMsg>) {
    let jar = clear_session_cookie(jar, &state.cookie_key);
    (jar, Json(ApiMsg { message: "logged out".into() }))
}

async fn list_items_protected(
    State(state): State<AppState>,
    jar: CookieJar
) -> Result<Json<serde_json::Value>, (axum::http::StatusCode, String)> {
    // kræver login
    let Some(_uid) = get_user_id_from_cookie(&jar, &state.cookie_key) else {
        return Err((axum::http::StatusCode::UNAUTHORIZED, "login required".into()));
    };

    // her ville du slå litteratur op i DB — demo svar:
    Ok(Json(serde_json::json!({
        "items": [
            {"id": 1, "title": "Example", "author": "You", "keywords": "demo"}
        ]
    })))
}