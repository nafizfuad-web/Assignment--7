import Link from "next/link";
import { redirect } from "next/navigation";
import { SignOutButton } from "@/components/SignOutButton";
import { getCurrentSession } from "@/lib/auth";

export const instant = false;

export default async function ProfilePage() {
  const session = await getCurrentSession();
  if (!session) redirect("/signin?callbackURL=%2Fprofile");

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-10">
      <section className="card card-border bg-base-100">
        <div className="card-body gap-5">
          <div>
            <h1 className="text-2xl font-bold">আমার প্রোফাইল</h1>
            <p className="mt-1 text-base-content/60">
              স্বাগতম, {session.user.name}
            </p>
          </div>
          <dl className="grid gap-3 sm:grid-cols-2">
            <div>
              <dt className="text-sm text-base-content/60">নাম</dt>
              <dd className="font-medium">{session.user.name}</dd>
            </div>
            <div>
              <dt className="text-sm text-base-content/60">ইমেইল</dt>
              <dd className="font-medium">{session.user.email}</dd>
            </div>
          </dl>
          <div className="card-actions">
            <Link className="btn btn-primary" href="/profile/update">
              প্রোফাইল আপডেট
            </Link>
            <SignOutButton />
          </div>
        </div>
      </section>
    </div>
  );
}
