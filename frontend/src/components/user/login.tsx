import { useState } from "react";
import { useNavigate } from "react-router-dom";

import styling from "./../../styles/user/login.module.css"


export default function UserLogin() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
	async function submitLogin(e: React.FormEvent) {
		e.preventDefault();
    if (loading) return;
		setErr("");
    setLoading(true);

    try {
      const r = await fetch("/api/auth/login", {
        method: "POST",
        credentials: "include", // send/receive cookies
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          // ...(csrf ? { "x-csrf-token": csrf } : {}), // if your backend uses CSRF
        },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      if (!r.ok) {
        // try to read { message } from backend, otherwise generic text
        let msg = "Login failed";
        try {
          const data = await r.json();
          if (typeof data?.message === "string") msg = data.message;
        } catch {
          msg = await r.text().catch(() => "Login failed");
        }
        setErr(msg);
        return;
      }

      navigate("/");
    } catch (e) {
      setErr("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }


  // Changing the form, based on anything in the email input
  const emailFilled = email.trim().length > 0;

	return (
		<div>
			<form onSubmit={submitLogin}>
        <div className = { styling.loginArea }>
          {err && <div className={styling.error}>{err}</div>}

          <div className={ styling.emailField }>
            <input 
              type="email"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </div>
              
          <div className={ styling.passwordField }>
            <input 
              type="password" 
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </div>

          <div className = { styling.buttonField }>
            {emailFilled ? (
              <button type="submit" disabled={loading}>
                {loading ? "Signing in…" : "Sign In"}
              </button>
            ) : (
              <button
                type="button"
                onClick={() => navigate("/register")}
                disabled={loading}
              >
                Register
              </button>
            )}
          </div>
        </div>
			</form>
		</div>
	);
}