export default function Loading() {
  return (
    <div className="space-y-24 animate-in fade-in duration-500">
      {/* Hero Skeleton */}
      <section className="h-[90vh] bg-surface-container relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-surface-container to-surface-container-high animate-pulse" />
        <div className="relative h-full flex flex-col items-center justify-center text-center px-6 space-y-8">
          <div className="h-20 w-3/4 max-w-3xl bg-white/20 rounded-3xl animate-pulse" />
          <div className="h-6 w-1/2 max-w-xl bg-white/10 rounded-2xl animate-pulse" />
          <div className="h-16 w-48 bg-white/20 rounded-full animate-pulse" />
        </div>
      </section>

      {/* Featured Section Skeleton */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="flex justify-between items-end mb-16">
          <div className="space-y-4">
            <div className="h-4 w-32 bg-primary/10 rounded-full animate-pulse" />
            <div className="h-12 w-96 bg-surface-container rounded-2xl animate-pulse" />
          </div>
          <div className="h-6 w-32 bg-surface-container/50 rounded-lg animate-pulse" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex flex-col space-y-6">
              <div className="aspect-square bg-surface-container rounded-2xl animate-pulse w-full" />
              <div className="space-y-3">
                <div className="h-6 w-3/4 bg-surface-container rounded-lg animate-pulse" />
                <div className="h-6 w-20 bg-surface-container rounded-lg animate-pulse" />
              </div>
              <div className="h-12 w-full bg-surface-container rounded-full animate-pulse" />
            </div>
          ))}
        </div>
      </section>

      {/* Banner Section Skeleton */}
      <section className="h-[60vh] bg-surface-container-high rounded-[3rem] mx-6 md:mx-12 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-b from-surface-container to-surface-container-high animate-pulse" />
      </section>
    </div>
  );
}
