export function getSocialAuthErrorMessage(error?: string): string {
  const normalizedError = error?.toLowerCase() ?? "";

  if (
    normalizedError.includes("account not linked") ||
    normalizedError.includes("account_not_linked")
  ) {
    return "এই ইমেইল দিয়ে আগে থেকেই অ্যাকাউন্ট আছে। একই ইমেইল ব্যবহার করে সাইন ইন করুন।";
  }
  if (
    normalizedError.includes("email_does_not_match") ||
    normalizedError.includes("different emails")
  ) {
    return "Google বা GitHub-এর ইমেইলটি আপনার অ্যাকাউন্টের ইমেইলের সঙ্গে মিলছে না।";
  }
  if (
    normalizedError.includes("access_denied") ||
    normalizedError.includes("popup_closed") ||
    normalizedError.includes("popup closed") ||
    normalizedError.includes("user_cancel")
  ) {
    return "লগইন অনুমতি দেওয়া হয়নি বা প্রক্রিয়াটি বাতিল হয়েছে। আবার চেষ্টা করুন।";
  }
  if (
    normalizedError.includes("network") ||
    normalizedError.includes("fetch failed") ||
    normalizedError.includes("failed to fetch")
  ) {
    return "নেটওয়ার্কে সমস্যা হয়েছে। ইন্টারনেট সংযোগ দেখে আবার চেষ্টা করুন।";
  }

  return "সোশ্যাল লগইন করা যায়নি। আবার চেষ্টা করুন।";
}
