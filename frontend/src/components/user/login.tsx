import { useState } from "react";

import styling from "./../../styles/user/login.module.css"

const API = import.meta.env.VITE_API_BASE?.replace(/\/$/, "") || "";
const LOGIN_URL = API + "/api/auth/login"; // change if your route differs

export default function UserLogin() {
	const [email, setEmail] = useState("");
	const [pw, setPw] = useState("");
	const [err, setErr] = useState("");

	async function onSubmit(e: React.FormEvent) {
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

	return (
		<div>
			<form onSubmit={onSubmit}>
        <div className = { styling.formArea }>
          <div className={ styling.emailField }>
            <input type="text" placeholder="email" />
          </div>
              
          <div className={ styling.passwordField }>
            <input type="password" placeholder="password" />
          </div>
              
          <div className={ styling.loginField }>
            <button type="submit">Sign in</button>
          </div>

          <div className={ styling.registerField }>
            <button type="submit">Sign up</button>
          </div>
        </div>
			</form>
		</div>
		
	);
}