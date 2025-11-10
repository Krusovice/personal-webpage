import { useState } from "react";
import { useForm } from "react-hook-form"

import styling from "./../../styles/user/registration.module.css"

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

  function Field() {
    return (
      <div className = { styling.email }>
        <label htmlFor="">E-mail</label>
        <input
          id="email"
          type="email"
          placeholder="email@example.com"
          autoComplete="email"
          {...register("email", { required: "Email is required" })}
        />
        {errors.email && <small style={{ color: "crimson" }}>{errors.email.message}</small>}
      </div>
    );
  }

	return (
    <div>
  		<h1>Sign up</h1>
  		<form onSubmit={handleSubmit(onSubmit)}>
        <div className={ styling.registration }>

          <div className = { styling.email }>
            <label htmlFor="">E-mail</label>
            <input
              id="email"
              type="email"
              placeholder="email@example.com"
              autoComplete="email"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && <small style={{ color: "crimson" }}>{errors.email.message}</small>}
          </div>
  				
          <div className = { styling.username }>
            <label htmlFor="">Username</label>
            <input
              type="text"
              placeholder="username"
              autoComplete="username"
              {...register("username", { required: "Username is required" })}
            />
            {errors.username && <small style={{ color: "crimson" }}>{errors.username.message}</small>}
          </div>

          <div className = { styling.password }>
            <label htmlFor="">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && <small style={{ color: "crimson" }}>{errors.password.message}</small>}
          </div>

          <div className = { styling.first_name }>
            <label htmlFor="">First Name</label>
            <input
              type="text"
              placeholder="first name"
              autoComplete="given-name"
              {...register("first_name", { required: "First name is required" })}
            />
            {errors.first_name && <small style={{ color: "crimson" }}>{errors.first_name.message}</small>}
          </div>

          <div className = { styling.last_name }>
            <label htmlFor="">Last Name</label>
            <input
              type="text"
              placeholder="last name"
              autoComplete="family-name"
              {...register("last_name", { required: "Last name is required" })}
            />
            {errors.last_name && <small style={{ color: "crimson" }}>{errors.last_name.message}</small>}
          </div>

          <div className = { styling.company }>
            <label htmlFor="">Company</label>
            <input
              type="text"
              placeholder="company"
              autoComplete="organization"
              {...register("company", { required: "Company is required" })}
            />
            {errors.company && <small style={{ color: "crimson" }}>{errors.company.message}</small>}
          </div>

          <div className = { styling.submitButton }>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Signing up…" : "Sign up"}
            </button>
          </div>
  		  </div>	
  		</form>
    </div>
	);
}