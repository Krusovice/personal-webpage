import { useState } from "react";

import styling from "./../../styles/userpage.module.css"

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
				<div className={ styling.login }>
					<input 
						type="text"
						placeholder="email"
					/>
				</div>

				<div className={ styling.password }>
					<input 
						type="password"
						placeholder="password"
				 	/>
				</div>

				<button type="submit">Sign in</button>
			</form>
		</div>
		
	);
}