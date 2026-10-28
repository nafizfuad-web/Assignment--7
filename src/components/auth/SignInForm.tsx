"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Field, SocialButtons, SubmitButton } from "@/components/auth/AuthParts";
import { signIn, useSession } from "@/lib/auth-client";
import type { SocialProvider } from "@/lib/social-providers";

type SignInFormProps = {
  callbackURL: string;
  socialError?: string;
  socialProviders: SocialProvider[];
};

type FormErrors = {
  email?: string;
  password?: string;
  form?: string;
};

export default function SignInForm({
  callbackURL,
  socialError,
  socialProviders,
}: SignInFormProps) {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (session) router.replace(callbackURL);
  }, [callbackURL, router, session]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "")
      .trim()
      .toLowerCase();
    const password = String(formData.get("password") ?? "");

    const nextErrors: FormErrors = {};
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      nextErrors.email = "সঠিক ইমেইল দিন।";
    }
    if (password.length < 8) {
      nextErrors.password = "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      toast.error("ফর্মের তথ্য সঠিক নয়, আবার দেখুন।");
      return;
    }

    setLoading(true);
    try {
      const { error } = await signIn.email({ email, password });

      if (error) {
        console.error("SIGN IN ERROR:", {
          status: error.status,
          statusText: error.statusText,
          code: error.code,
        });
        let message = "সাইন ইন করা যায়নি, আবার চেষ্টা করুন।";
        if (
          error.code === "INVALID_EMAIL_OR_PASSWORD" ||
          error.status === 401
        ) {
          message = "ইমেইল বা পাসওয়ার্ড ভুল হয়েছে।";
        } else if (error.status >= 500) {
          message =
            "সার্ভারে সমস্যা হয়েছে। MongoDB চালু আছে কি না যাচাই করে আবার চেষ্টা করুন।";
        } else if (error.message) {
          message = error.message;
        }
        setErrors({ form: message });
        toast.error(message);
        return;
      }

      toast.success("সফলভাবে সাইন ইন হয়েছে।");
      router.push(callbackURL);
      router.refresh();
    } catch {
      const message = "সাইন ইন করা যায়নি, আবার চেষ্টা করুন।";
      setErrors({ form: message });
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  if (isPending) {
    return (
      <div className="w-full">
        <div className="h-10 animate-pulse rounded-lg bg-[#e3ebe5]" />
        <div className="mt-4 h-10 animate-pulse rounded-lg bg-[#e3ebe5]" />
        <div className="mt-4 h-10 animate-pulse rounded-lg bg-[#cfe3d5]" />
        <SocialButtons
          callbackURL={callbackURL}
          errorMessage={socialError}
          providers={socialProviders}
        />
      </div>
    );
  }

  if (session) {
    return (
      <div className="w-full">
        <div className="h-10 animate-pulse rounded-lg bg-[#e3ebe5]" />
        <div className="mt-4 h-10 animate-pulse rounded-lg bg-[#e3ebe5]" />
        <div className="mt-4 h-10 animate-pulse rounded-lg bg-[#cfe3d5]" />
      </div>
    );
  }

  return (
    <>
      <form noValidate onSubmit={handleSubmit}>
        {errors.form && (
          <p
            className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700"
            role="alert"
          >
            {errors.form}
          </p>
        )}
        <Field
          autoComplete="email"
          error={errors.email}
          id="email"
          label="ইমেইল"
          name="email"
          placeholder="you@example.com"
          type="email"
        />
        <Field
          autoComplete="current-password"
          error={errors.password}
          id="password"
          label="পাসওয়ার্ড"
          name="password"
          placeholder="কমপক্ষে ৮ অক্ষর"
          type="password"
        />
        <SubmitButton loading={loading}>সাইন ইন</SubmitButton>
      </form>
      <SocialButtons
        callbackURL={callbackURL}
        errorMessage={socialError}
        providers={socialProviders}
      />
      <p className="mt-4 text-center text-sm">
        অ্যাকাউন্ট নেই?{" "}
        <Link
          className="text-[#08873f] hover:underline"
          href={`/signup?callbackURL=${encodeURIComponent(callbackURL)}`}
        >
          সাইন আপ করুন
        </Link>
      </p>
    </>
  );
}
