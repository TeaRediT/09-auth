"use client";

import Image from "next/image";
import css from "./Edit.module.css";
import { useAuthStore } from "@/lib/store/authStore";
import { updateMe } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Edit = () => {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const [error, setError] = useState<Error | null>(null);
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    try {
      if (user) {
        setError(null);
        const username = formData.get("username") as string;
        const updateUser = {
          email: user.email,
          username,
        };

        await updateMe(updateUser);
        setUser({ ...updateUser, avatar: user.avatar });
        router.push("/profile");
      }
    } catch (error) {
      const apiError = error as Error;
      setError(apiError);
    }
  };

  const handleClose = () => {
    router.back();
  };

  return (
    user && (
      <>
        <main className={css.mainContent}>
          <div className={css.profileCard}>
            <h1 className={css.formTitle}>Edit Profile</h1>

            <Image
              src={user.avatar}
              alt="User Avatar"
              width={120}
              height={120}
              className={css.avatar}
            />

            <form action={handleSubmit} className={css.profileInfo}>
              <div className={css.usernameWrapper}>
                <label htmlFor="username">Username:</label>
                <input
                  name="username"
                  id="username"
                  type="text"
                  className={css.input}
                  defaultValue={user.username}
                />
              </div>

              <p>Email: {user.email}</p>

              <div className={css.actions}>
                <button type="submit" className={css.saveButton}>
                  Save
                </button>
                <button
                  onClick={handleClose}
                  type="button"
                  className={css.cancelButton}
                >
                  Cancel
                </button>
              </div>
              {error && <p className={css.error}>{`Error: ${error}`}</p>}
            </form>
          </div>
        </main>
      </>
    )
  );
};

export default Edit;
