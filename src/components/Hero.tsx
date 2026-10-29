import Image from "next/image";
import { getBanglaDate } from "@/lib/utils";
import { connection } from "next/server";

export default async function Hero() {
  await connection();

  return (
    <section className="my-6 flex items-center justify-between gap-6 overflow-hidden rounded-3xl border border-gray-200 bg-white px-8 py-7">
      <div className="min-w-0 flex-1">
        <span className="inline-block rounded-full border border-gray-200 bg-green-50 px-3 text-sm text-green-700">
          {getBanglaDate()}
        </span>
        <h1 className="my-2 text-3xl font-bold leading-tight md:text-4xl">
          আজকের বাজারের দাম এক নজরে
        </h1>
        <p className="mb-5 max-w-xl text-gray-500">
          চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
          বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
        </p>
        <a
          className="btn border-0 bg-green-700 text-white hover:bg-green-800"
          href="#সব-পণ্য"
        >
          সব পণ্য দেখুন
        </a>
      </div>
      <Image
        alt="বাজারের পণ্য"
        className="hidden h-[280px] w-[280px] shrink-0 rounded-2xl object-cover md:block"
        height={280}
        priority
        src="/bazar-hero.jpg"
        width={280}
      />
    </section>
  );
}
