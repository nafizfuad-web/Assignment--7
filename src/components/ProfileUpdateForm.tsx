"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { authClient } from "@/lib/auth-client";

export function ProfileUpdateForm({ name }: { name: string }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSaved(false);
    setIsPending(true);

    const formData = new FormData(event.currentTarget);
    try {
      const result = await authClient.updateUser({
        name: String(formData.get("name")),
      });

      if (result.error) {
        setError(result.error.message ?? "নাম আপডেট করা যায়নি।");
        return;
      }

      setSaved(true);
      router.refresh();
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "নাম আপডেট করা যায়নি।",
      );
    } finally {
      setIsPending(false);
    }
  }

  return (
    <form className="card-body gap-4" onSubmit={handleSubmit}>
      <label className="form-control w-full">
        <span className="label-text mb-1">নাম</span>
        <input
          className="input input-bordered w-full"
          defaultValue={name}
          name="name"
          required
        />
      </label>
      {error && (
        <p className="text-sm text-error" role="alert">
          {error}
        </p>
      )}
      {saved && (
        <p className="text-sm text-success" role="status">
          প্রোফাইল আপডেট হয়েছে।
        </p>
      )}
      <button className="btn btn-primary" disabled={isPending}>
        {isPending ? "সংরক্ষণ হচ্ছে…" : "পরিবর্তন সংরক্ষণ করুন"}
      </button>
    </form>
  );
}
