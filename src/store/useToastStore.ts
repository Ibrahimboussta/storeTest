'use client';

import { create } from 'zustand';

type Toast = {
  id: number;
  message: string;
  type?: 'info' | 'success' | 'error';
};

type ToastState = {
  toasts: Toast[];
  show: (message: string, type?: Toast['type']) => void;
  remove: (id: number) => void;
};

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  show: (message, type = 'info') =>
    set((s) => ({ toasts: [...s.toasts, { id: Date.now(), message, type }] })),
  remove: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}));

// Convenience exported function for non-react modules
export function showToast(message: string, type: Toast['type'] = 'info') {
  useToastStore.getState().show(message, type);
}
