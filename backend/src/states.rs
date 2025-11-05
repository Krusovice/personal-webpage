use sqlx::{PgPool};
use axum_extra::extract::cookie::Key;

#[derive(Clone)]
pub struct AppState {
    pub pool: PgPool,
    // nøgle til at signere/validere cookies (ligger i .env i praksis)
    pub cookie_key: Key,
}