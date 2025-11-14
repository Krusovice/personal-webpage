use axum::{extract::{State}, Json};
use axum::http::StatusCode;
use axum_extra::extract::cookie::{SignedCookieJar};

use crate::states::AppState;

use crate::helpers::encryption::{
    hash_password, 
    verify_password, 
    set_user_id_cookie, 
    clear_user_id_cookie, 
    get_user_id_from_cookie
};

use crate::models::users::{
    RegisterBody,
    LoginBody,
    ApiMsg,
    UserInfo
};

pub async fn register(
    State(state): State<AppState>,
    Json(body): Json<RegisterBody>
) -> Result<Json<ApiMsg>, (StatusCode, String)> {

    // 1) Check registration key
    let expected_key = std::env::var("REGISTRATION_KEY")
        .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;

    if body.registration_key != expected_key {
        return Err((StatusCode::FORBIDDEN, "invalid registration key".into()));
    }

    let pw_hash = hash_password(&body.password).await
        .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;

    let res = sqlx::query!(
        "INSERT INTO users (email, username, password_hash, first_name, last_name, company) VALUES ($1, $2, $3, $4, $5, $6)",
        body.email, body.username, pw_hash, body.first_name, body.last_name, body.company
    )
    .execute(&state.pool).await;

    match res {
        Ok(_) => Ok(Json(ApiMsg { message: "registered".into() })),
        Err(e) if e.as_database_error().map(|d| d.is_unique_violation()).unwrap_or(false) => {
            Err((StatusCode::CONFLICT, "email already exists".into()))
        }
        Err(e) => Err((StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))
    }
}

pub async fn login(
    State(state): State<AppState>,
    jar: SignedCookieJar,
    Json(body): Json<LoginBody>
) -> Result<(SignedCookieJar, Json<ApiMsg>), (axum::http::StatusCode, String)> {

    let row = sqlx::query!(
        "SELECT id, password_hash FROM users WHERE email = $1",
        body.email
    )
    .fetch_optional(&state.pool).await
    .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;

    let Some(user) = row else {
        return Err((StatusCode::UNAUTHORIZED, "invalid credentials".into()));
    };

    if !verify_password(&body.password, &user.password_hash).await {
        return Err((StatusCode::UNAUTHORIZED, "invalid password".into()));
    }

    let jar = set_user_id_cookie(jar, user.id);

    Ok((jar, Json(ApiMsg { message: "logged in".into() })))
}

pub async fn logout(
    State(_): State<AppState>,
    jar: SignedCookieJar
) -> (SignedCookieJar, Json<ApiMsg>) {
    let jar = clear_user_id_cookie(jar);
    (jar, Json(ApiMsg { message: "logged out".into() }))
}

pub async fn user_information(
    State(state): State<AppState>,
    jar: SignedCookieJar,
) -> Result<Json<UserInfo>, (StatusCode, String)> {
    let user_id = get_user_id_from_cookie(jar);

    let user = sqlx::query_as!(
        UserInfo,
        r#"SELECT id, email, username, first_name, last_name, company
           FROM users
           WHERE id = $1"#,
        user_id
    )
    .fetch_optional(&state.pool).await
    .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?
    .ok_or((StatusCode::UNAUTHORIZED, "Not authenticated".into()))?;

    Ok(Json(user))
}