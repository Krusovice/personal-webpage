use axum::{
    extract::{Path, State},
    http::{header, StatusCode},
    response::{Response, IntoResponse},
};
use tokio::fs;
use mime_guess::from_path;

use axum_extra::extract::cookie::SignedCookieJar;

use crate::states::AppState;
use crate::models::users::UserInfo;
use crate::handlers::auth::get_user_information;


#[derive(sqlx::FromRow)]
struct LiteratureItemRow {
    content: String,
    public: bool,
}

pub async fn view_literature_file(
    State(state): State<AppState>,
    jar: SignedCookieJar,
    Path(id): Path<i64>,
) -> Result<Response, (StatusCode, String)> {
    // 1) Fetching up item
    let item = sqlx::query_as::<_, LiteratureItemRow>(
        "SELECT content, public
         FROM literature.items
         WHERE id = $1"
    )
    .bind(id)
    .fetch_optional(&state.pool)
    .await
    .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?
    .ok_or((StatusCode::NOT_FOUND, "Item not found".into()))?;

    // 2) Checking if a user is logged in
    let user_result = get_user_information(&state, jar).await;
    let user: Option<UserInfo> = match user_result {
        Ok(u) => Some(u),
        Err((StatusCode::UNAUTHORIZED, _msg)) => None, // not logged in
        Err(e) => return Err(e), // other errors (e.g. DB) -> propagate
    };

    let user_logged_in = user.is_some();

    // 3) Enforce login if item is not public
    if !item.public && !user_logged_in {
        return Err((StatusCode::UNAUTHORIZED, "Login required".into()));
    }

    // 4) Build file path under media_root
    let file_name = item.content;
    let file_path = state.literature_media_root.join(&file_name);

    println!("Literature item file_path: {:?}", file_path); // For debugging

    let bytes = fs::read(&file_path)
        .await
        .map_err(|_| (StatusCode::NOT_FOUND, "File missing".into()))?;

    // using mime_guess to guess the content_type for the http request,
    // based on the file extension.
    let mime = from_path(&file_path).first_or_octet_stream();

    let mut resp = bytes.into_response();
    resp.headers_mut().insert(header::CONTENT_TYPE, mime.to_string().parse().unwrap());        
    resp.headers_mut().insert(
        header::CONTENT_DISPOSITION,
        format!("inline; filename=\"{}\"", file_name)
            .parse()
            .unwrap(),
    );
    Ok(resp)


    /* NOT IMPLEMENTING THIS PART RIGHT AWAY
    // 4) Track view (ignore errors if you want it non-fatal)
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
}