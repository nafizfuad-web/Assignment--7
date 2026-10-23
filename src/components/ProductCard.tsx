import Link from "next/link";
import {
  formatPrice,
  getUnitBn,
  toBengaliNumber,
  type Product,
} from "@/lib/utils";

const badge = {
  up: { cls: "badge-error", icon: "▲" },
  down: { cls: "badge-success", icon: "▼" },
  flat: { cls: "badge-ghost", icon: "—" },
} satisfies Record<Product["change"]["dir"], { cls: string; icon: string }>;

export default function ProductCard({ product }: { product: Product }) {
  const changeBadge = badge[product.change.dir];

  return (
    <Link
      className="card border border-gray-200 bg-white p-4 transition hover:-translate-y-0.5 hover:border-green-600"
      href={`/product/${product.slug}`}
    >
      <div className="flex items-center gap-3">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gray-100 text-2xl">
          {product.image}
        </span>
        <div>
          <div className="font-semibold leading-snug">{product.nameBn}</div>
          <div className="text-xs text-gray-500">
            {getUnitBn(product.unit)}
          </div>
        </div>
      </div>
      <div className="mt-3 flex items-end justify-between">
        <div>
          <div className="text-xs text-gray-500">আজকের দাম</div>
          <div className="text-xl font-bold">
            {formatPrice(product.today)}{" "}
            <small className="text-sm font-medium">টাকা</small>
          </div>
        </div>
        <span className={`badge badge-soft ${changeBadge.cls} font-semibold`}>
          {changeBadge.icon}{" "}
          {toBengaliNumber(Math.abs(product.change.pct).toFixed(1))}%
        </span>
      </div>
    </Link>
  );
}
