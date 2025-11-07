use sqlx::{PgPool};
use axum_extra::extract::cookie::Key;
use axum::extract::FromRef;

#[derive(Clone)]
pub struct AppState {
    pub pool: PgPool,
    // nøgle til at signere/validere cookies (ligger i .env i praksis)
    pub cookie_key: Key,
}

impl FromRef<AppState> for Key {
    fn from_ref(state: &AppState) -> Key {
        state.cookie_key.clone()
    }
}