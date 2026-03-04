import Link from "next/link";
import css from "./Profile.module.css";
import { Metadata } from "next";
import ProfileClient from "./Profile.client";

export const metadata: Metadata = {
  title: "Profile | NoteHub",
  description: "View and update your personal profile details",
  openGraph: {
    title: "Profile | NoteHub",
    description: "View and update your personal profile details",
    url: "/profile",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub",
      },
    ],
  },
};

const Profile = () => {
  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>
        <ProfileClient />
      </div>
    </main>
  );
};

export default Profile;
