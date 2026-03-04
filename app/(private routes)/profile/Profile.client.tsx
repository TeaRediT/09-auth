"use client";

import { useAuthStore } from "@/lib/store/authStore";
import css from "./Profile.module.css";

import Image from "next/image";

const ProfileClient = () => {
  const user = useAuthStore((state) => state.user);

  return (
    <>
      {user && (
        <>
          <div className={css.avatarWrapper}>
            <Image
              src={user.avatar}
              alt="User Avatar"
              width={120}
              height={120}
              className={css.avatar}
            />
          </div>
          <div className={css.profileInfo}>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
          </div>
        </>
      )}
    </>
  );
};

export default ProfileClient;
