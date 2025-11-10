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

  type FieldProps = {
    id: string;
    type: React.InputHTMLAttributes<HTMLInputElement>["type"];
    placeholder: string;
    autocomplete?: string; // 👈 optional
    label: string;
    register: ReturnType<typeof useForm>["register"];
    errors: Record<string, any>;
  };

  function Field({ id, type, placeholder, autocomplete, label, register, errors }: FieldProps) {
    return (
      <div className = { styling[id] }>
        <label htmlFor={id}>{label}</label>
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          autoComplete={autocomplete}
          {...register(id, { required: `${label}+ is required` })}
        />
        {errors[id] && (
          <small style={{ color: "crimson" }}>
            {errors[id].message}
          </small>
        )}
      </div>
    );
  }

	return (
    <div>
  		<h1>Sign up</h1>
  		<form onSubmit={handleSubmit(onSubmit)}>
        <div className={ styling.registration }>

          {Field({id: "email", 
            type: "email", 
            placeholder: "email@example.com", 
            autocomplete: "email", 
            label: "E-mail", 
            register: register, 
            errors: errors
          })}

          {Field({id: "username", 
            type: "text", 
            placeholder: "Username", 
            autocomplete: "username", 
            label: "Username", 
            register: register, 
            errors: errors
          })}

          {Field({id: "password", 
            type: "password", 
            placeholder: "••••••••", 
            label: "Password", 
            register: register, 
            errors: errors
          })}

          {Field({id: "first_name", 
            type: "text", 
            placeholder: "First Name", 
            autocomplete: "given-name", 
            label: "First Name", 
            register: register, 
            errors: errors
          })}

          {Field({id: "last_name", 
            type: "text", 
            placeholder: "Last Name", 
            autocomplete: "family-name", 
            label: "Last Name", 
            register: register, 
            errors: errors
          })}

          {Field({id: "company", 
            type: "text", 
            placeholder: "Company", 
            autocomplete: "organization", 
            label: "Company or Institution", 
            register: register, 
            errors: errors
          })}

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