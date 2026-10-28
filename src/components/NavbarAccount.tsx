"use client";

import Image from "next/image";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";

export function NavbarAccount() {
  const { data: session, isPending } = useSession();

  if (!session || isPending) {
    return (
      <div className="flex shrink-0 items-center gap-2">
        <Link
          className="btn btn-sm border border-green-700 bg-white text-green-700 hover:bg-green-50"
          href="/signup"
        >
          সাইন আপ
        </Link>
        <Link
          className="btn btn-sm border-0 bg-green-700 text-white hover:bg-green-800"
          href="/signin"
        >
          সাইন ইন
        </Link>
      </div>
    );
  }

  return (
    <Link
      aria-label="আমার প্রোফাইল"
      className="flex min-w-0 items-center gap-2 rounded-full p-1 text-sm font-medium hover:bg-green-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700"
      href="/profile"
    >
      {session.user.image ? (
        <Image
          alt=""
          className="h-9 w-9 rounded-full object-cover"
          height={36}
          src={session.user.image}
          unoptimized
          width={36}
        />
      ) : (
        <span
          aria-hidden="true"
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-green-100 font-semibold text-green-800"
        >
          {session.user.name.slice(0, 1)}
        </span>
      )}
      <span className="max-w-32 truncate">{session.user.name}</span>
    </Link>
  );
}
