import { AuthForm } from "@/components/AuthForm";
import { AuthShell } from "@/components/auth/AuthParts";
import { getSafeCallbackURL } from "@/lib/auth-redirect";
import { getEnabledSocialProviders } from "@/lib/social-providers";

export default async function SignUpPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackURL?: string }>;
}) {
  const { callbackURL } = await searchParams;
  const socialProviders = getEnabledSocialProviders();

  return (
    <AuthShell
      subtitle="বাজারদরের তথ্য পেতে নতুন অ্যাকাউন্ট খুলুন।"
      title="অ্যাকাউন্ট তৈরি করুন"
    >
      <AuthForm
        callbackURL={getSafeCallbackURL(callbackURL)}
        mode="signup"
        socialProviders={socialProviders}
      />
    </AuthShell>
  );
}
