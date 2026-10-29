type EmailAuthError = {
  code?: string;
  status?: number;
  message?: string;
};

const DATABASE_ERROR_MESSAGE =
  "সার্ভার ডাটাবেসে সংযোগ করতে পারছে না। MongoDB Atlas সংযোগ, DNS/ইন্টারনেট ও IP Access List যাচাই করে আবার চেষ্টা করুন।";

export function getEmailAuthErrorMessage(
  error?: EmailAuthError,
): string {
  const code = error?.code?.toLowerCase() ?? "";

  if (
    code.includes("invalid_email_or_password") ||
    error?.status === 401
  ) {
    return "ইমেইল বা পাসওয়ার্ড ভুল হয়েছে।";
  }
  if (
    code.includes("user_already_exists") ||
    code.includes("email_already_exists")
  ) {
    return "এই ইমেইল দিয়ে আগে থেকেই অ্যাকাউন্ট আছে। সাইন ইন করুন।";
  }
  if (code.includes("invalid_email")) {
    return "সঠিক ইমেইল দিন।";
  }
  if (
    code.includes("password_too_short") ||
    code.includes("password_too_long") ||
    code.includes("invalid_password")
  ) {
    return "পাসওয়ার্ডের তথ্য সঠিক নয়। কমপক্ষে ৮ অক্ষরের পাসওয়ার্ড দিন।";
  }
  if (error?.status !== undefined && error.status >= 500) {
    return DATABASE_ERROR_MESSAGE;
  }

  return "অনুরোধটি সম্পন্ন করা যায়নি। আবার চেষ্টা করুন।";
}

export function getEmailAuthNetworkErrorMessage(): string {
  return "সার্ভারের সঙ্গে সংযোগ করা যায়নি। ইন্টারনেট সংযোগ দেখে আবার চেষ্টা করুন।";
}
