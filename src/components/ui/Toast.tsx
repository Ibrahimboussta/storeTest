'use client';

import { useEffect } from 'react';
import { useToastStore } from '@/store/useToastStore';

export default function Toasts() {
  const toasts = useToastStore((s) => s.toasts);
  const remove = useToastStore((s) => s.remove);

  useEffect(() => {
    const timers = toasts.map((t) => {
      const id = setTimeout(() => remove(t.id), 4000);
      return () => clearTimeout(id);
    });
    return () => timers.forEach((t) => t());
  }, [toasts, remove]);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-6 right-6 z-50 flex flex-col gap-3">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`min-w-[220px] max-w-sm px-4 py-3 rounded-lg shadow-lg border flex items-start gap-3 text-sm font-medium transition-transform transform-gpu ` +
            (t.type === 'error' ? 'bg-error/10 text-error border-error/20' : t.type === 'success' ? 'bg-success/10 text-success border-success/20' : 'bg-white text-on-surface border-outline/10')}
        >
          <div className="flex-1">{t.message}</div>
          <button onClick={() => remove(t.id)} className="opacity-60 hover:opacity-90">✕</button>
        </div>
      ))}
    </div>
  );
}
