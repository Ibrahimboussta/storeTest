export default function Loading() {
  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      {/* Header Skeleton */}
      <div className="space-y-2">
        <div className="h-10 w-64 bg-surface-container rounded-lg animate-pulse" />
        <div className="h-4 w-48 bg-surface-container/50 rounded-lg animate-pulse" />
      </div>

      {/* Stats Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white p-8 rounded-[2rem] border border-outline/5 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-surface-container animate-pulse" />
            <div className="space-y-2">
              <div className="h-3 w-20 bg-surface-container/50 rounded animate-pulse" />
              <div className="h-8 w-24 bg-surface-container rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>

      {/* Table Skeleton */}
      <div className="bg-white rounded-[2.5rem] border border-outline/5 shadow-sm overflow-hidden p-2">
        <div className="p-8 border-b border-outline/5">
          <div className="h-6 w-40 bg-surface-container rounded animate-pulse" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-surface-container-low/50">
                <th className="px-10 py-6"><div className="h-3 w-24 bg-outline/10 rounded animate-pulse" /></th>
                <th className="px-6 py-6"><div className="h-3 w-24 bg-outline/10 rounded animate-pulse" /></th>
                <th className="px-6 py-6"><div className="h-3 w-16 bg-outline/10 rounded animate-pulse" /></th>
                <th className="px-6 py-6"><div className="h-3 w-24 bg-outline/10 rounded animate-pulse" /></th>
                <th className="px-6 py-6"><div className="h-3 w-16 bg-outline/10 rounded animate-pulse" /></th>
                <th className="px-10 py-6"><div className="h-3 w-20 bg-outline/10 rounded animate-pulse" /></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline/5">
              {[...Array(5)].map((_, i) => (
                <tr key={i}>
                  <td className="px-10 py-6"><div className="h-4 w-20 bg-surface-container rounded animate-pulse" /></td>
                  <td className="px-6 py-6"><div className="h-4 w-32 bg-surface-container rounded animate-pulse" /></td>
                  <td className="px-6 py-6"><div className="h-4 w-20 bg-surface-container rounded animate-pulse" /></td>
                  <td className="px-6 py-6">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded bg-surface-container animate-pulse" />
                      <div className="h-3 w-24 bg-surface-container rounded animate-pulse" />
                    </div>
                  </td>
                  <td className="px-6 py-6"><div className="h-4 w-16 bg-surface-container rounded animate-pulse" /></td>
                  <td className="px-10 py-6"><div className="h-8 w-24 bg-surface-container rounded-full animate-pulse" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
