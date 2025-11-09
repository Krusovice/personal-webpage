import { useState } from "react";
import { useForm } from "react-hook-form"

import styling from "./../../styles/userpage.module.css"

type FormData = {
	email: string
	username: string
	password: string
	first_name: string
	last_name: string
	company: string
}

export default function UserRegistration() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  async function onSubmit(data: FormData) {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      alert(body.message || "Registration failed");
      return;
    }

    window.location.href = "/";
  }


	return (
		<div className={ styling.registration }>
			<form onSubmit={handleSubmit(onSubmit)}>

        <h1>Sign in</h1>

				<input
          type="email"
          placeholder="email@example.com"
          autoComplete="email"
          {...register("email", { required: "Email is required" })}
        />
        {errors.email && <small style={{ color: "crimson" }}>{errors.email.message}</small>}

        <input
          type="text"
          placeholder="username"
          autoComplete="username"
          {...register("username", { required: "Username is required" })}
        />
        {errors.username && <small style={{ color: "crimson" }}>{errors.username.message}</small>}

        <input
          type="password"
          placeholder="••••••••"
          {...register("password", { required: "Password is required" })}
        />
        {errors.password && <small style={{ color: "crimson" }}>{errors.password.message}</small>}

        <input
          type="text"
          placeholder="first name"
          autoComplete="given-name"
          {...register("first_name", { required: "First name is required" })}
        />
        {errors.first_name && <small style={{ color: "crimson" }}>{errors.first_name.message}</small>}

        <input
          type="text"
          placeholder="last name"
          autoComplete="family-name"
          {...register("last_name", { required: "Last name is required" })}
        />
        {errors.last_name && <small style={{ color: "crimson" }}>{errors.last_name.message}</small>}

        <input
          type="text"
          placeholder="company"
          autoComplete="organization"
          {...register("company", { required: "Company is required" })}
        />
        {errors.company && <small style={{ color: "crimson" }}>{errors.company.message}</small>}


        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Signing up…" : "Sign up"}
        </button>
			</form>
		</div>	
	);
}