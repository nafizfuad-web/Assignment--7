import { redirect } from "next/navigation";
import { connection } from "next/server";
import { ProfileUpdateForm } from "@/components/ProfileUpdateForm";
import { SignOutButton } from "@/components/SignOutButton";
import { UserAvatar } from "@/components/UserAvatar";
import { getCurrentSession } from "@/lib/auth";

export const instant = false;

export default async function ProfilePage() {
  await connection();
  const session = await getCurrentSession();
  if (!session) redirect("/signin?callbackURL=%2Fprofile");

  return (
    <main className="profile-page">
      <div className="profile-layout">
        <header className="profile-heading">
          <h1>আমার প্রোফাইল</h1>
          <p>আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>
        </header>

        <section aria-label="ব্যবহারকারীর তথ্য" className="profile-summary">
          <UserAvatar
            alt={`${session.user.name} এর ছবি`}
            className="profile-avatar"
            fallbackClassName="profile-avatar profile-avatar-placeholder"
            image={session.user.image}
            name={session.user.name}
            size={64}
          />
          <div className="profile-user-details">
            <h2>{session.user.name}</h2>
            <p className="profile-email">{session.user.email}</p>
          </div>
          <SignOutButton />
        </section>

        <section aria-labelledby="profile-info-title" className="profile-info">
          <h2 id="profile-info-title">তথ্য</h2>
          <ProfileUpdateForm name={session.user.name} />
        </section>
      </div>
    </main>
  );
}
