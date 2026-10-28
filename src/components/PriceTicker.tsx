import {
  formatPrice,
  getProducts,
  toBengaliNumber,
  type Product,
} from "@/lib/utils";

const arrow: Record<Product["change"]["dir"], string> = {
  up: "▲",
  down: "▼",
  flat: "—",
};

const color: Record<Product["change"]["dir"], string> = {
  up: "text-red-600",
  down: "text-green-600",
  flat: "text-gray-500",
};

export default async function PriceTicker() {
  const products = await getProducts();
  const items = [...products, ...products];

  return (
    <div
      aria-label="আজকের পণ্যের বাজারদর"
      className="overflow-hidden border-b border-gray-200 bg-white"
    >
      <div className="animate-marquee flex w-max">
        {items.map((product, index) => (
          <span
            className="flex items-center gap-2 whitespace-nowrap border-r border-gray-100 px-5 py-2 text-[13px]"
            key={`${product.id}-${index}`}
          >
            <span aria-hidden="true">{product.image}</span>
            <span>
              {product.nameBn} {formatPrice(product.today)} টাকা/কেজি
            </span>
            <b className={color[product.change.dir]}>
              {arrow[product.change.dir]}{" "}
              {toBengaliNumber(Math.abs(product.change.pct).toFixed(1))}%
            </b>
          </span>
        ))}
      </div>
    </div>
  );
}
