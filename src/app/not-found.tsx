import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="mx-auto flex w-full max-w-xl flex-1 flex-col items-center justify-center px-4 py-16 text-center">
      <p className="text-7xl font-bold text-primary">৪০৪</p>
      <h1 className="mt-4 text-2xl font-bold">পাতাটি খুঁজে পাওয়া যায়নি</h1>
      <p className="mt-2 text-base-content/60">
        ঠিকানাটি ভুল হতে পারে অথবা পাতাটি সরানো হয়েছে।
      </p>
      <Link className="btn btn-primary mt-6" href="/">
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}
