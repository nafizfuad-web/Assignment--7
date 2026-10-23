import Link from "next/link";
import { notFound } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import { getCategoryBySlug, getProductsByCategory } from "@/lib/utils";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [category, products] = await Promise.all([
    getCategoryBySlug(slug),
    getProductsByCategory(slug),
  ]);

  if (!category) notFound();

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8">
      <div className="breadcrumbs mb-4 text-sm">
        <ul>
          <li>
            <Link href="/">হোম</Link>
          </li>
          <li>{category.nameBn}</li>
        </ul>
      </div>
      <div className="mb-6 flex items-center gap-3">
        <span aria-hidden="true" className="text-4xl">
          {category.icon}
        </span>
        <div>
          <h1 className="text-3xl font-bold">{category.nameBn}</h1>
          <p className="text-sm text-base-content/60">
            {products.length}টি পণ্যের বাজারদর
          </p>
        </div>
      </div>
      {products.length ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="alert">
          <span>এই বিভাগে এখনো কোনো পণ্যের তথ্য নেই।</span>
        </div>
      )}
    </div>
  );
}
