export default function HomeLoading() {
  return (
    <div
      aria-label="লোড হচ্ছে"
      className="mx-auto w-full max-w-6xl flex-1 space-y-8 px-4 py-8"
    >
      <div className="skeleton h-56 w-full rounded-box" />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
        {Array.from({ length: 8 }, (_, index) => (
          <div className="skeleton h-28 w-full" key={index} />
        ))}
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }, (_, index) => (
          <div className="skeleton h-40 w-full" key={index} />
        ))}
      </div>
    </div>
  );
}
