import ProductCard from "./ProductCard";
import type { Product } from "@/lib/utils";

interface ProductSectionProps {
  title: string;
  products: Product[];
  id?: string;
  icon?: string;
  iconClass?: string;
  subtitle?: string;
}

export default function ProductSection({
  id,
  title,
  subtitle,
  icon,
  iconClass,
  products,
}: ProductSectionProps) {
  return (
    <section className="mb-9 scroll-mt-4" id={id}>
      <h2 className="mb-3 flex items-center gap-2 text-2xl font-bold">
        {icon && (
          <span aria-hidden="true" className={`text-base ${iconClass ?? ""}`}>
            {icon}
          </span>
        )}
        {title}
      </h2>
      {subtitle && <p className="-mt-2 mb-3 text-sm text-gray-500">{subtitle}</p>}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500">এই মুহূর্তে কোনো পণ্যের তথ্য নেই।</p>
      )}
    </section>
  );
}
