"use client";

import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { signIn } from "@/lib/auth-client";
import { getSocialAuthErrorMessage } from "@/lib/social-auth-errors";
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

type Provider = SocialProvider;

const PROVIDERS: { id: Provider; label: string; icon: React.ReactNode }[] = [
  {
    id: "google",
    label: "Google",
    icon: (
      <svg width="16" height="16" viewBox="0 0 48 48" aria-hidden>
        <path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 8 3l5.7-5.7C34 6.1 29.3 4 24 4 13 4 4 13 4 24s9 20 20 20 20-9 20-20c0-1.3-.1-2.6-.4-3.9z" />
        <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 8 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
        <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
        <path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.6-.4-3.9z" />
      </svg>
    ),
  },
  {
    id: "github",
    label: "GitHub",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.5 7.5 0 014 0c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z" />
      </svg>
    ),
  },
  {
    id: "facebook",
    label: "Facebook",
    icon: (
      <span className="flex h-4 w-4 items-center justify-center rounded bg-[#1877F2] text-[11px] font-bold leading-none text-white">
        f
      </span>
    ),
  },
  {
    id: "discord",
    label: "Discord",
    icon: (
      <span className="flex h-4 w-4 items-center justify-center rounded bg-[#5865F2] text-[10px] font-bold leading-none text-white">
        D
      </span>
    ),
  },
];

const REQUESTED_PROVIDERS = PROVIDERS.filter(
  ({ id }) => id === "google" || id === "github",
);

export function SocialButtons({
  providers,
  callbackURL,
  errorMessage,
}: {
  providers: Provider[];
  callbackURL: string;
  errorMessage?: string;
}) {
  const [busy, setBusy] = useState<Provider | null>(null);
  const [requestError, setRequestError] = useState("");

  async function social(provider: Provider) {
    setBusy(provider);
    setRequestError("");
    try {
      const { error } = await signIn.social({
        provider,
        callbackURL,
        errorCallbackURL: window.location.href,
      });
      if (error) {
        const message = getSocialAuthErrorMessage(
          `${error.code ?? ""} ${error.message ?? ""}`,
        );
        setRequestError(message);
        toast.error(message);
        setBusy(null);
      }
    } catch (requestError) {
      const message = getSocialAuthErrorMessage(
        requestError instanceof Error ? requestError.message : undefined,
      );
      setRequestError(message);
      toast.error(message);
      setBusy(null);
    }
  }

  return (
    <>
      <div className="my-4 flex items-center gap-3 text-xs text-[#5d6b62]">
        <span className="h-px flex-1 bg-[#dfe8e1]" />
        অথবা
        <span className="h-px flex-1 bg-[#dfe8e1]" />
      </div>
      {(errorMessage || requestError) && (
        <p className="mb-3 text-sm text-red-700" role="alert">
          {requestError || errorMessage}
        </p>
      )}
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {REQUESTED_PROVIDERS.map((provider) => {
          const isConfigured = providers.includes(provider.id);
          return (
            <button
              key={provider.id}
              type="button"
              disabled={busy !== null || !isConfigured}
              onClick={() => void social(provider.id)}
              aria-busy={busy === provider.id}
              className="flex h-10 items-center justify-center gap-2 rounded-lg border border-[#dfe8e1] bg-white px-2 text-[13px] font-semibold transition hover:bg-[#f1f6f1] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {provider.icon}
              {busy === provider.id
                ? `${provider.label}-এ সংযোগ হচ্ছে...`
                : `${provider.label} দিয়ে চালিয়ে যান`}
            </button>
          );
        })}
      </div>
      {REQUESTED_PROVIDERS.some(({ id }) => !providers.includes(id)) && (
        <div className="mt-2 space-y-1 text-center text-xs text-[#5d6b62]">
          {REQUESTED_PROVIDERS.filter(({ id }) => !providers.includes(id)).map(
            (provider) => (
              <p key={provider.id} role="status">
                {provider.label}: এই লগইন পদ্ধতি এখনো সেটআপ করা হয়নি।
              </p>
            ),
          )}
        </div>
      )}
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
