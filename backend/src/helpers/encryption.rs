use anyhow::Result;
use axum_extra::extract::cookie::{Cookie, SameSite, SignedCookieJar};
use argon2::{Argon2, PasswordHasher, PasswordVerifier};
use argon2::password_hash::{PasswordHash, SaltString};
use argon2::password_hash::rand_core::OsRng;


pub async fn hash_password(plain: &str) -> Result<String> {
    let salt = SaltString::generate(&mut OsRng);
    let hash = Argon2::default().hash_password(plain.as_bytes(), &salt)?
        .to_string();
    Ok(hash)
}

pub async fn verify_password(plain: &str, hash: &str) -> bool {
    if let Ok(parsed) = PasswordHash::new(hash) {
        Argon2::default().verify_password(plain.as_bytes(), &parsed).is_ok()
    } else { false }
}

// SIGNED = integrity only (client can read value)
pub fn set_user_id_cookie(jar: SignedCookieJar, user_id: i64) -> SignedCookieJar {
    let mut c = Cookie::new("session_user_id", user_id.to_string());
    c.set_http_only(true);
    c.set_same_site(SameSite::Lax);
    // In prod behind HTTPS:
    // c.set_secure(true);
    // If you want it available site-wide:
    c.set_path("/");
    jar.add(c)
}

pub fn clear_user_id_cookie(jar: SignedCookieJar) -> SignedCookieJar {
    let mut c = Cookie::from("session_user_id");
    c.set_path("/");            // must match how it was set
    jar.remove(c)
}

// Læs user_id fra cookie (returnerer None hvis ingen/ugyldig)
pub fn get_user_id_from_cookie(jar: SignedCookieJar) -> Option<i64> {
    let cookie = jar.get("session_user_id")?;
    cookie.value().parse().ok()
}