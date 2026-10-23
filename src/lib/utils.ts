const bengaliDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

export function toBengaliNumber(num: number | string): string {
  return String(num).replace(/[0-9]/g, (digit) => bengaliDigits[Number(digit)]);
}

export function formatPrice(price: number): string {
  return toBengaliNumber(price.toLocaleString("en-IN"));
}

const units: Record<string, string> = {
  kg: "প্রতি কেজি",
  litre: "প্রতি লিটার",
  dozen: "প্রতি ডজন",
  piece: "প্রতি পিস",
};

export function getUnitBn(unit: string): string {
  return units[unit] ?? `প্রতি ${unit}`;
}

export function getBanglaDate(): string {
  return new Date().toLocaleDateString("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export const PRODUCTS_API =
  "https://api.api-store.workers.dev/api/bazardor/products";
export const CATEGORIES_API =
  "https://api.api-store.workers.dev/api/bazardor/categories";

export interface Product {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: { dir: "up" | "down" | "flat"; pct: number };
  markets: { market: string; division: string; min: number; max: number }[];
}

export interface Category {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

export async function getProducts(): Promise<Product[]> {
  const response = await fetch(PRODUCTS_API, { next: { revalidate: 60 } });
  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.status}`);
  }
  return response.json() as Promise<Product[]>;
}

export async function getCategories(): Promise<Category[]> {
  const response = await fetch(CATEGORIES_API, { next: { revalidate: 60 } });
  if (!response.ok) {
    throw new Error(`Failed to fetch categories: ${response.status}`);
  }
  return response.json() as Promise<Category[]>;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const products = await getProducts();
  return products.find((product) => product.slug === slug) ?? null;
}

export async function getCategoryBySlug(
  slug: string,
): Promise<Category | null> {
  const categories = await getCategories();
  return categories.find((category) => category.slug === slug) ?? null;
}

export async function getProductsByCategory(
  slug: string,
): Promise<Product[]> {
  const products = await getProducts();
  return products.filter((product) => product.category === slug);
}
