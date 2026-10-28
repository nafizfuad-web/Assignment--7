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

    const formData = new FormData(event.currentTarget);
    const updatedName = String(formData.get("name") ?? "").trim();
    if (!updatedName) {
      setError("নাম খালি রাখা যাবে না।");
      return;
    }

    setIsPending(true);
    try {
      const result = await authClient.updateUser({
        name: updatedName,
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
    <form
      className="profile-form card-body gap-4"
      noValidate
      onSubmit={handleSubmit}
    >
      <label className="form-control w-full">
        <span className="label-text mb-1">নাম</span>
        <input
          className="input input-bordered w-full"
          defaultValue={name}
          name="name"
          aria-invalid={Boolean(error)}
        />
      </label>
      {error && (
        <p className="text-sm text-error" role="alert">
          {error}
        </p>
      )}
      <button className="btn btn-primary" disabled={isPending} type="submit">
        {isPending ? "সংরক্ষণ হচ্ছে…" : "আপডেট"}
      </button>
      {saved && (
        <p className="text-sm text-success" role="status">
          নাম আপডেট হয়েছে।
        </p>
      )}
    </form>
  );
}
