export default function Loading() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-2">
          <div className="h-4 w-32 bg-surface-container/30 rounded animate-pulse" />
          <div className="h-10 w-64 bg-surface-container rounded-lg animate-pulse" />
          <div className="h-4 w-48 bg-surface-container/50 rounded-lg animate-pulse" />
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <div className="h-12 w-full md:w-64 bg-surface-container rounded-full animate-pulse" />
          <div className="h-12 w-32 bg-surface-container rounded-full animate-pulse" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-outline/5 shadow-sm space-y-8">
            <div className="flex justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-surface-container animate-pulse" />
                <div className="space-y-2">
                  <div className="h-5 w-32 bg-surface-container rounded animate-pulse" />
                  <div className="h-3 w-20 bg-surface-container/50 rounded animate-pulse" />
                </div>
              </div>
              <div className="w-3 h-3 rounded-full bg-surface-container animate-pulse" />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <div className="h-3 w-24 bg-surface-container/50 rounded animate-pulse" />
                <div className="h-3 w-40 bg-surface-container/50 rounded animate-pulse" />
              </div>
              <div className="w-full h-2 bg-surface-container rounded-full animate-pulse" />
            </div>

            <div className="space-y-2">
              <div className="h-3 w-32 bg-surface-container/30 rounded animate-pulse" />
              <div className="h-14 w-full bg-surface-container rounded-2xl animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
