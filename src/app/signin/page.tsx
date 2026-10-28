import { AuthShell } from "@/components/auth/AuthParts";
import SignInForm from "@/components/auth/SignInForm";
import { getSafeCallbackURL } from "@/lib/auth-redirect";
import { getEnabledSocialProviders } from "@/lib/social-providers";
import { getSocialAuthErrorMessage } from "@/lib/social-auth-errors";

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackURL?: string; error?: string }>;
}) {
  const { callbackURL, error } = await searchParams;
  const socialProviders = getEnabledSocialProviders();

  return (
    <AuthShell
      subtitle="বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।"
      title="সাইন ইন"
    >
      <SignInForm
        callbackURL={getSafeCallbackURL(callbackURL)}
        socialError={error ? getSocialAuthErrorMessage(error) : undefined}
        socialProviders={socialProviders}
      />
    </AuthShell>
  );
}
