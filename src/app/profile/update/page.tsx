import { redirect } from "next/navigation";
import { ProfileUpdateForm } from "@/components/ProfileUpdateForm";
import { getCurrentSession } from "@/lib/auth";

export const instant = false;

export default async function UpdateProfilePage() {
  const session = await getCurrentSession();
  if (!session) redirect("/signin?callbackURL=%2Fprofile%2Fupdate");

  return (
    <div className="mx-auto w-full max-w-xl px-4 py-10">
      <section className="card card-border bg-base-100">
        <div className="card-body pb-0">
          <h1 className="text-2xl font-bold">প্রোফাইল আপডেট</h1>
          <p className="text-sm text-base-content/60">
            আপনার নাম পরিবর্তন করুন।
          </p>
        </div>
        <ProfileUpdateForm name={session.user.name} />
      </section>
    </div>
  );
}
