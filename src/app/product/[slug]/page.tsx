import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getCurrentSession } from "@/lib/auth";
import { formatPrice, getUnitBn, getProductBySlug } from "@/lib/utils";

export const instant = false;

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const session = await getCurrentSession();

  if (!session) {
    redirect(`/signin?callbackURL=${encodeURIComponent(`/product/${slug}`)}`);
  }

  const product = await getProductBySlug(slug);
  if (!product) notFound();

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-8">
      <div className="breadcrumbs mb-5 text-sm">
        <ul>
          <li>
            <Link href="/">হোম</Link>
          </li>
          <li>
            <Link href={`/category/${product.category}`}>
              {product.categoryNameBn}
            </Link>
          </li>
          <li>{product.nameBn}</li>
        </ul>
      </div>
      <article className="card card-border bg-base-100">
        <div className="card-body gap-6 sm:p-8">
          <div className="flex items-start gap-4">
            <span aria-hidden="true" className="text-5xl">
              {product.image}
            </span>
            <div>
              <p className="text-sm text-base-content/60">
                {product.categoryNameBn}
              </p>
              <h1 className="text-3xl font-bold">{product.nameBn}</h1>
              <p className="mt-1 text-base-content/60">
                {getUnitBn(product.unit)}
              </p>
            </div>
          </div>

          <div className="stats stats-vertical border border-base-300 sm:stats-horizontal">
            <div className="stat">
              <div className="stat-title">আজকের দাম</div>
              <div className="stat-value text-primary">
                ৳{formatPrice(product.today)}
              </div>
            </div>
            <div className="stat">
              <div className="stat-title">গতকালের দাম</div>
              <div className="stat-value text-xl">
                ৳{formatPrice(product.yesterday)}
              </div>
            </div>
            <div className="stat">
              <div className="stat-title">গত সপ্তাহের দাম</div>
              <div className="stat-value text-xl">
                ৳{formatPrice(product.lastWeek)}
              </div>
            </div>
          </div>

          <section aria-labelledby="market-prices">
            <h2 className="mb-3 text-xl font-bold" id="market-prices">
              বাজারভেদে দাম
            </h2>
            {product.markets.length ? (
              <div className="overflow-x-auto">
                <table className="table">
                  <thead>
                    <tr>
                      <th>বাজার</th>
                      <th>বিভাগ</th>
                      <th>দামের পরিসর</th>
                    </tr>
                  </thead>
                  <tbody>
                    {product.markets.map((market) => (
                      <tr key={`${market.market}-${market.division}`}>
                        <td>{market.market}</td>
                        <td>{market.division}</td>
                        <td>
                          ৳{formatPrice(market.min)}–৳{formatPrice(market.max)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-base-content/60">বাজারের তথ্য পাওয়া যায়নি।</p>
            )}
          </section>
        </div>
      </article>
    </div>
  );
}
