"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export function SignOutButton() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(false);

  async function signOut() {
    setError("");
    setIsPending(true);
    try {
      const result = await authClient.signOut();
      if (result.error) {
        setError(result.error.message ?? "সাইন আউট করা যায়নি।");
        return;
      }
      router.push("/");
      router.refresh();
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "সাইন আউট করা যায়নি।",
      );
    } finally {
      setIsPending(false);
    }
  }

  return (
    <div className="flex flex-col items-start gap-1">
      <button
        className="btn btn-outline"
        disabled={isPending}
        onClick={signOut}
        type="button"
      >
        {isPending ? "সাইন আউট হচ্ছে…" : "সাইন আউট"}
      </button>
      {error && (
        <p className="text-sm text-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
