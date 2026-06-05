export default function Loading() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div className="space-y-2">
          <div className="h-10 w-48 bg-surface-container rounded-lg animate-pulse" />
          <div className="h-4 w-64 bg-surface-container/50 rounded-lg animate-pulse" />
        </div>
        <div className="flex gap-4">
          <div className="h-12 w-32 bg-surface-container rounded-full animate-pulse" />
          <div className="h-14 w-48 bg-surface-container rounded-full animate-pulse" />
        </div>
      </div>

      <div className="bg-white rounded-[2rem] border border-outline/5 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-surface-container-low">
                <th className="px-6 py-6 w-10"><div className="w-5 h-5 bg-outline/10 rounded animate-pulse" /></th>
                <th className="px-6 py-6"><div className="h-3 w-20 bg-outline/10 rounded animate-pulse" /></th>
                <th className="px-6 py-6"><div className="h-3 w-20 bg-outline/10 rounded animate-pulse" /></th>
                <th className="px-6 py-6"><div className="h-3 w-20 bg-outline/10 rounded animate-pulse" /></th>
                <th className="px-6 py-6"><div className="h-3 w-20 bg-outline/10 rounded animate-pulse" /></th>
                <th className="px-10 py-6 text-right"><div className="h-3 w-20 bg-outline/10 rounded animate-pulse ml-auto" /></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline/5">
              {[...Array(10)].map((_, i) => (
                <tr key={i}>
                  <td className="px-6 py-8"><div className="w-5 h-5 bg-surface-container rounded animate-pulse" /></td>
                  <td className="px-6 py-8">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-surface-container animate-pulse" />
                      <div className="space-y-2">
                        <div className="h-4 w-32 bg-surface-container rounded animate-pulse" />
                        <div className="h-3 w-20 bg-surface-container/50 rounded animate-pulse" />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-8"><div className="h-6 w-24 bg-surface-container rounded-full animate-pulse" /></td>
                  <td className="px-6 py-8"><div className="h-4 w-16 bg-surface-container rounded animate-pulse" /></td>
                  <td className="px-6 py-8"><div className="h-4 w-12 bg-surface-container rounded animate-pulse" /></td>
                  <td className="px-10 py-8">
                    <div className="flex justify-end gap-2">
                      <div className="w-8 h-8 bg-surface-container rounded-lg animate-pulse" />
                      <div className="w-8 h-8 bg-surface-container rounded-lg animate-pulse" />
                      <div className="w-8 h-8 bg-surface-container rounded-lg animate-pulse" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
