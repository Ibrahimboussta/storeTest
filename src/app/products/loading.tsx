export default function Loading() {
  return (
    <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-12 md:py-24 space-y-16 animate-in fade-in duration-500">
      {/* Page Title Skeleton */}
      <div className="space-y-4 max-w-2xl">
        <div className="h-16 w-3/4 bg-surface-container rounded-2xl animate-pulse" />
        <div className="h-6 w-1/2 bg-surface-container/50 rounded-xl animate-pulse" />
      </div>

      {/* Filter Chips Skeleton */}
      <div className="flex gap-4 overflow-x-hidden">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-12 w-32 bg-surface-container rounded-full animate-pulse shrink-0" />
        ))}
      </div>

      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="flex flex-col space-y-6">
            <div className="aspect-[4/5] bg-surface-container rounded-2xl animate-pulse w-full" />
            <div className="flex justify-between items-start">
              <div className="space-y-3 flex-grow">
                <div className="h-6 w-3/4 bg-surface-container rounded-lg animate-pulse" />
                <div className="h-4 w-1/2 bg-surface-container/50 rounded-lg animate-pulse" />
              </div>
              <div className="h-6 w-20 bg-surface-container rounded-lg animate-pulse" />
            </div>
            <div className="h-14 w-full bg-surface-container rounded-xl animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}
