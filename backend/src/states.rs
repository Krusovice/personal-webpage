use std::path::PathBuf;
use sqlx::{PgPool};
use axum_extra::extract::cookie::Key;
use axum::extract::FromRef;

#[derive(Clone)]
pub struct AppState {
    pub pool: PgPool,
    pub cookie_key: Key,
    pub media_root: PathBuf,
}

impl FromRef<AppState> for Key {
    fn from_ref(state: &AppState) -> Key {
        state.cookie_key.clone()
    }
}

impl AppState {
    pub fn new(pool: PgPool, cookie_key: Key) -> Self {
        let media_root_env = std::env::var("MEDIA_ROOT").expect("MEDIA_ROOT env not set");
            
        Self {
            pool,
            cookie_key,
            media_root: PathBuf::from(media_root_env),
        }
    }
}



