// Loading animation for shimmer effect
const shimmer =
  "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";

export function TotalProfitSkeleton() {
  return (
    <div
      className={`${shimmer} relative overflow-hidden rounded-md p-4 shadow-sm bg-gray-100`}
    >
      <div className="h-8 w-24 rounded-md bg-gray-200 mb-2" />{" "}
      {/* Placeholder for totalProfit */}
      <div className="h-4 w-32 rounded-md bg-gray-200" />{" "}
      {/* Placeholder for percentage change */}
    </div>
  );
}
