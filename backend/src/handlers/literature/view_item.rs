use axum::{
    extract::{Path, State},
    http::{header, StatusCode},
    response::{IntoResponse, Response},
};
use serde::Deserialize;
use tokio::fs;
use std::path::PathBuf;
use mime_guess::from_path;



#[derive(sqlx::FromRow)]
struct LitItemRow {
    id: i64,
    content: Option<String>,
    public: bool,
}

pub async fn download_literature_file(
    State(state): State<AppState>,
    Path(id): Path<i64>,
    current_user: Option<CurrentUser>, // or Option<CurrentUser> if you want 200 for public
) -> Result<Response, (StatusCode, String)> {
    // 1) Look up item
    let item = sqlx::query_as::<_, LitItemRow>(
        "SELECT id, content, public
         FROM literature.items
         WHERE id = $1"
    )
    .bind(id)
    .fetch_optional(&state.db)
    .await
    .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?
    .ok_or((StatusCode::NOT_FOUND, "Item not found".into()))?;

    let file_name = item
        .file_name
        .ok_or((StatusCode::NOT_FOUND, "No file attached".into()))?;

    // 2) Require login if needed
    if item.requires_login && current_user.id <= 0 {
        return Err((StatusCode::UNAUTHORIZED, "Login required".into()));
    }

    /* NOT IMPLEMENTING THIS PART RIGHT AWAY
    // 3) Track view (ignore errors if you want it non-fatal)
    if item.requires_login {
        let _ = sqlx::query!(
            "INSERT INTO literature_item_views (literature_item_id, user_id)
             VALUES ($1, $2)",
            item.id,
            current_user.id
        )
        .execute(&state.db)
        .await;

        let _ = sqlx::query!(
            "UPDATE literature_items SET views = views + 1 WHERE id = $1",
            item.id
        )
        .execute(&state.db)
        .await;
    }
    */
    // 4) Build file path under media_root (e.g. /app/media)
    let path: PathBuf = state.media_root.join(&file_name);

    let bytes = fs::read(&path)
        .await
        .map_err(|_| (StatusCode::NOT_FOUND, "File missing".into()))?;

    let mime = from_path(&path).first_or_octet_stream();

    let mut resp = bytes.into_response();
    resp.headers_mut()
        .insert(header::CONTENT_TYPE, mime.to_string().parse().unwrap());
    resp.headers_mut().insert(
        header::CONTENT_DISPOSITION,
        format!("inline; filename=\"{}\"", file_name)
            .parse()
            .unwrap(),
    );
    Ok(resp)
}