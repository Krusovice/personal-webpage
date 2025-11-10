import { useState } from "react";
import { useNavigate } from "react-router-dom";

import styling from "./../../styles/user/login.module.css"

const API = import.meta.env.VITE_API_BASE?.replace(/\/$/, "") || "";
const LOGIN_URL = API + "/api/auth/login"; // change if your route differs

export default function UserLogin() {
	const [email, setEmail] = useState("");
	const [pw, setPw] = useState("");
	const [err, setErr] = useState("");
  

	async function submitLogin(e: React.FormEvent) {
		e.preventDefault();
		setErr("");
		const r = await fetch(LOGIN_URL, {
			method: "POST",
			headers: { "Content-Type": "application/json", Accept: "application/json" },
			credentials: "include", // allow cookie-based auth
			body: JSON.stringify({ email, password: pw }),
		});
		if (!r.ok) return setErr((await r.json().catch(() => ({})))?.message || "Login failed");
		window.location.href = "/"; // or navigate("/dashboard")
	}

  // Changing the form, based on anything in the email input
  const emailFilled = email.trim().length > 0;

	return (
		<div>
			<form onSubmit={submitLogin}>
        <div className = { styling.loginArea }>

          <div className={ styling.emailField }>
            <input 
              type="text"
              placeholder="email@example.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
              
          <div className={ styling.passwordField }>
            <input type="password" placeholder="••••••••" />
          </div>

          <div className = { styling.buttonField }>
            {
              emailFilled ? (
                <button type="submit">Sign In</button>
              ) : (
                <button type="button" onClick={() => navigate("/register")}>Register</button>
              )
            }
          </div>


        </div>
			</form>
		</div>
		
	);
}