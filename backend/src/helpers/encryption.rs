use anyhow::Result;

async fn hash_password(plain: &str) -> Result<String> {
    use argon2::{Argon2, PasswordHasher};
    use argon2::password_hash::{SaltString};
    let salt = SaltString::generate(&mut rand::thread_rng());
    let hash = Argon2::default().hash_password(plain.as_bytes(), &salt)?
        .to_string();
    Ok(hash)

async fn verify_password(plain: &str, hash: &str) -> bool {
    use argon2::{Argon2, PasswordVerifier};
    use argon2::password_hash::{PasswordHash, PasswordVerifier as _};
    if let Ok(parsed) = PasswordHash::new(hash) {
        Argon2::default().verify_password(plain.as_bytes(), &parsed).is_ok()
    } else { false }
}

// Sæt (signeret) session-cookie med user_id
fn set_session_cookie(jar: CookieJar, key: &Key, user_id: i64) -> CookieJar {
    let mut cookie = Cookie::new("session_user_id", user_id.to_string());
    cookie.set_http_only(true);
    cookie.set_same_site(SameSite::Lax); // i prod: SameSite=Strict ofte fint
    // i prod bag HTTPS: cookie.set_secure(true);
    jar.signed(key).add(cookie)
}

fn clear_session_cookie(jar: CookieJar, key: &Key) -> CookieJar {
    let mut cookie = Cookie::named("session_user_id");
    cookie.make_removal();
    jar.signed(key).remove(cookie)
}

// Læs user_id fra cookie (returnerer None hvis ingen/ugyldig)
fn get_user_id_from_cookie(jar: &CookieJar, key: &Key) -> Option<i64> {
    let signed = jar.signed(key);
    let cookie = signed.get("session_user_id")?;
    cookie.value().parse::<i64>().ok()
}