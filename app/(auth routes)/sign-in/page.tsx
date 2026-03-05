"use client";

import { useRouter } from "next/navigation";
import css from "./SignIn.module.css";
import { useState } from "react";
import { login, RegisterUser } from "@/lib/api/clientApi";
import { Error } from "@/types/error";
import { useAuthStore } from "@/lib/store/authStore";

const SignIn = () => {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
  const [error, setError] = useState<Error | null>(null);

  const handleSubmit = async (formdata: FormData) => {
    try {
      setError(null);
      const formValues = Object.fromEntries(formdata) as RegisterUser;
      const user = await login(formValues);
      if (user) setUser(user);
      router.push("/profile");
    } catch (error) {
      const apiError = error as Error;
      setError(apiError);
    }
  };

  return (
    <main className={css.mainContent}>
      <form action={handleSubmit} className={css.form}>
        <h1 className={css.formTitle}>Sign in</h1>

        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            required
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className={css.input}
            required
          />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Log in
          </button>
        </div>
        {error && <p className={css.error}>{`Error: ${error}`}</p>}
      </form>
    </main>
  );
};

export default SignIn;
