use serde::{Deserialize, Serialize};

#[derive(Deserialize)]
pub struct RegisterBody {
    pub email: String,
    pub username: String,
    pub password: String,
    pub first_name: String,
    pub last_name: String,
    pub company: Option<String>,
    pub registration_key: String
}

#[derive(Deserialize)]
pub struct LoginBody { 
	pub email: String, 
	pub password: String 
}

#[derive(Serialize)]
pub struct ApiMsg { 
	pub message: String 
}

#[derive(Serialize)]
pub struct UserInfo {
    pub id: i64,
    pub email: String,
    pub username: String,
    pub first_name: String,
    pub last_name: String,
    pub company: Option<String>
}