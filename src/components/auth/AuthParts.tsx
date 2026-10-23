"use client";

import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { signIn } from "@/lib/auth-client";
import type { SocialProvider } from "@/lib/social-providers";

export function AuthShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto flex min-h-[60vh] w-full max-w-md flex-col items-center px-4 py-10">
      <h1 className="text-3xl font-bold text-[#14231a]">{title}</h1>
      <p className="mt-2 text-center text-sm text-[#5d6b62]">{subtitle}</p>
      <div className="mt-6 w-full rounded-2xl border border-[#dfe8e1] bg-[#fafcfa] p-6 shadow-sm">
        {children}
      </div>
      <Link
        className="mt-6 text-sm text-[#5d6b62] hover:text-[#08873f]"
        href="/"
      >
        ← হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}

export function Field({
  label,
  error,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
}) {
  return (
    <div className="mb-4">
      <label
        className="mb-1.5 block text-sm font-medium text-[#14231a]"
        htmlFor={props.id}
      >
        {label}
      </label>
      <input
        {...props}
        aria-invalid={Boolean(error)}
        className={`h-10 w-full rounded-lg border bg-white px-3 text-sm outline-none transition focus:border-[#08873f] focus:ring-2 focus:ring-[#08873f]/20 ${
          error ? "border-red-500" : "border-[#dfe8e1]"
        }`}
      />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}

export function SubmitButton({
  loading,
  children,
}: {
  loading: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      className="h-10 w-full rounded-lg bg-[#08873f] text-sm font-semibold text-white shadow transition hover:bg-[#066f33] disabled:cursor-not-allowed disabled:opacity-60"
      disabled={loading}
      type="submit"
    >
      {loading ? "অপেক্ষা করুন..." : children}
    </button>
  );
}

export function SocialButtons({
  providers,
  callbackURL,
}: {
  providers: SocialProvider[];
  callbackURL: string;
}) {
  const [busy, setBusy] = useState<SocialProvider | null>(null);

  async function handleSocialSignIn(provider: SocialProvider) {
    setBusy(provider);
    try {
      const { error } = await signIn.social({ provider, callbackURL });
      if (error) {
        toast.error(
          error.message || "সোশ্যাল লগইন করা যায়নি, আবার চেষ্টা করুন।",
        );
      }
    } catch (requestError) {
      toast.error(
        requestError instanceof Error
          ? requestError.message
          : "সোশ্যাল লগইন করা যায়নি, আবার চেষ্টা করুন।",
      );
    } finally {
      setBusy(null);
    }
  }

  if (!providers.length) return null;

  const buttonClass =
    "flex h-10 flex-1 items-center justify-center gap-2 rounded-lg border border-[#dfe8e1] bg-white text-sm font-medium transition hover:bg-[#f1f6f1] disabled:cursor-not-allowed disabled:opacity-60";

  return (
    <>
      <div className="my-4 flex items-center gap-3 text-xs text-[#5d6b62]">
        <span className="h-px flex-1 bg-[#dfe8e1]" />
        অথবা
        <span className="h-px flex-1 bg-[#dfe8e1]" />
      </div>
      <div className="flex flex-col gap-2">
        {providers.map((provider) => (
          <button
            className={buttonClass}
            disabled={busy !== null}
            key={provider}
            onClick={() => void handleSocialSignIn(provider)}
            type="button"
          >
            {provider === "google" ? "Google" : "GitHub"} দিয়ে চালিয়ে যান
          </button>
        ))}
      </div>
    </>
  );
}

export function AuthSkeleton() {
  return (
    <div
      aria-label="লোড হচ্ছে"
      className="mx-auto flex max-w-md animate-pulse flex-col items-center px-4 py-10"
    >
      <div className="h-8 w-40 rounded bg-[#e3ebe5]" />
      <div className="mt-3 h-4 w-64 rounded bg-[#e3ebe5]" />
      <div className="mt-6 w-full space-y-4 rounded-2xl border border-[#dfe8e1] bg-[#fafcfa] p-6">
        <div className="h-10 rounded-lg bg-[#e3ebe5]" />
        <div className="h-10 rounded-lg bg-[#e3ebe5]" />
        <div className="h-10 rounded-lg bg-[#cfe3d5]" />
        <div className="h-10 rounded-lg bg-[#e3ebe5]" />
      </div>
    </div>
  );
}
