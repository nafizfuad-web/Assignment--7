"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import {
  Field,
  SocialButtons,
  SubmitButton,
} from "@/components/auth/AuthParts";
import type { SocialProvider } from "@/lib/social-providers";

type AuthFormProps = {
  mode: "signin" | "signup";
  callbackURL: string;
  socialProviders: SocialProvider[];
};

export function AuthForm({
  mode,
  callbackURL,
  socialProviders,
}: AuthFormProps) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(false);
  const isSignUp = mode === "signup";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsPending(true);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email"));
    const password = String(formData.get("password"));
    try {
      const result = isSignUp
        ? await authClient.signUp.email({
            name: String(formData.get("name")),
            email,
            password,
            callbackURL,
          })
        : await authClient.signIn.email({ email, password, callbackURL });

      if (result.error) {
        const message = result.error.message ?? "অনুরোধটি সম্পন্ন করা যায়নি।";
        setError(message);
        toast.error(message);
        return;
      }

      if (isSignUp) {
        toast.success("অ্যাকাউন্ট তৈরি হয়েছে। এবার সাইন ইন করুন।");
        router.push(
          `/signin?callbackURL=${encodeURIComponent(callbackURL)}`,
        );
        return;
      }

      toast.success("সাইন ইন সফল হয়েছে।");
      router.push(callbackURL);
      router.refresh();
    } catch (requestError) {
      const message =
        requestError instanceof Error
          ? requestError.message
          : "অনুরোধটি সম্পন্ন করা যায়নি।";
      setError(message);
      toast.error(message);
    } finally {
      setIsPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {isSignUp && (
        <Field
          autoComplete="name"
          id="name"
          label="নাম"
          name="name"
          required
        />
      )}
      <Field
        autoComplete="email"
        id="email"
        label="ইমেইল"
        name="email"
        required
        type="email"
      />
      <Field
        autoComplete={isSignUp ? "new-password" : "current-password"}
        id="password"
        label="পাসওয়ার্ড"
        minLength={8}
        name="password"
        required
        type="password"
      />
      {error && (
        <p className="text-sm text-error" role="alert">
          {error}
        </p>
      )}
      <SubmitButton loading={isPending}>
        {isSignUp ? "অ্যাকাউন্ট তৈরি করুন" : "সাইন ইন"}
      </SubmitButton>
      <SocialButtons callbackURL={callbackURL} providers={socialProviders} />
      <p className="text-center text-sm text-base-content/70">
        {isSignUp ? "আগে থেকেই অ্যাকাউন্ট আছে?" : "নতুন ব্যবহারকারী?"}{" "}
        <Link
          className="link link-primary"
          href={`/${isSignUp ? "signin" : "signup"}`}
        >
          {isSignUp ? "সাইন ইন" : "অ্যাকাউন্ট তৈরি করুন"}
        </Link>
      </p>
    </form>
  );
}
