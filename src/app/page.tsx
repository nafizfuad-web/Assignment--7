import { Suspense } from "react";
import Hero from "@/components/Hero";
import ProductSection from "@/components/ProductSection";
import { getProducts } from "@/lib/utils";

export default async function HomePage() {
  const products = await getProducts();

  const risers = products
    .filter((product) => product.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  const fallers = products
    .filter((product) => product.change.dir === "down")
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, 6);

  return (
    <div className="mx-auto max-w-6xl px-5 pb-10">
      <Suspense
        fallback={
          <div
            aria-hidden="true"
            className="skeleton my-6 h-56 w-full rounded-3xl"
          />
        }
      >
        <Hero />
      </Suspense>
      <ProductSection
        title="আজ দাম বেড়েছে"
        icon="▲"
        iconClass="text-red-600"
        products={risers}
      />
      <ProductSection
        title="আজ দাম কমেছে"
        icon="▼"
        iconClass="text-green-600"
        products={fallers}
      />
      <ProductSection
        id="সব-পণ্য"
        title="সব পণ্য"
        subtitle={`মোট ${products.length} টি পণ্য দেখানো হচ্ছে`}
        products={products}
      />
    </div>
  );
}
