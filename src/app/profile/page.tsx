import Image from "next/image";
import { redirect } from "next/navigation";
import { ProfileUpdateForm } from "@/components/ProfileUpdateForm";
import { SignOutButton } from "@/components/SignOutButton";
import { getCurrentSession } from "@/lib/auth";

export const instant = false;

export default async function ProfilePage() {
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
          {session.user.image ? (
            <Image
              alt={`${session.user.name} এর ছবি`}
              className="profile-avatar"
              height={80}
              src={session.user.image}
              unoptimized
              width={80}
            />
          ) : (
            <div
              aria-hidden="true"
              className="profile-avatar profile-avatar-placeholder"
            >
              {session.user.name.slice(0, 1)}
            </div>
          )}
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
