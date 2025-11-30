use serde::{Deserialize, Serialize};


#[derive(Serialize)]
pub struct UserInfo {
    pub id: i64,
    pub email: String,
    pub username: String,
    pub first_name: String,
    pub last_name: String,
    pub company: Option<String>
}