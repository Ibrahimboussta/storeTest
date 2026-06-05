export default function Loading() {
  return (
    <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-12 md:py-24 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        
        {/* Image Skeleton */}
        <div className="space-y-6">
          <div className="aspect-square bg-surface-container rounded-3xl animate-pulse" />
          <div className="grid grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="aspect-square bg-surface-container/50 rounded-xl animate-pulse" />
            ))}
          </div>
        </div>

        {/* Info Skeleton */}
        <div className="flex flex-col pt-8">
          <div className="h-4 w-32 bg-primary/10 rounded-full animate-pulse mb-6" />
          <div className="h-16 w-3/4 bg-surface-container rounded-2xl animate-pulse mb-4" />
          <div className="h-6 w-full bg-surface-container/50 rounded-xl animate-pulse mb-12" />
          
          <div className="flex items-baseline gap-4 mb-12">
            <div className="h-12 w-32 bg-surface-container rounded-xl animate-pulse" />
            <div className="h-6 w-24 bg-surface-container/30 rounded-lg animate-pulse" />
          </div>

          <div className="space-y-4 mb-12">
            <div className="h-4 w-full bg-surface-container/40 rounded animate-pulse" />
            <div className="h-4 w-full bg-surface-container/40 rounded animate-pulse" />
            <div className="h-4 w-2/3 bg-surface-container/40 rounded animate-pulse" />
          </div>

          <div className="flex gap-4 mb-12">
            <div className="h-16 w-32 bg-surface-container rounded-2xl animate-pulse" />
            <div className="h-16 flex-grow bg-surface-container rounded-2xl animate-pulse" />
          </div>

          <div className="space-y-6 border-t border-outline/5 pt-12">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-12 h-12 bg-surface-container rounded-full animate-pulse" />
                <div className="space-y-2 flex-grow">
                  <div className="h-4 w-32 bg-surface-container rounded animate-pulse" />
                  <div className="h-3 w-48 bg-surface-container/50 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
