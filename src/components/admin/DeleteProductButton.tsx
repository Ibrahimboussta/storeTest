'use client';

import { useState } from 'react';
import { Trash2, Loader2 } from 'lucide-react';
import { deleteProduct } from '@/lib/supabase/actions';

export default function DeleteProductButton({ productId, productName }: { productId: string, productName: string }) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm(`Êtes-vous sûr de vouloir supprimer "${productName}" ?`)) return;

    setLoading(true);
    const result = await deleteProduct(productId);
    
    if (!result.success) {
      alert(`Erreur lors de la suppression: ${result.error}`);
    }
    setLoading(false);
  };

  return (
    <button 
      onClick={handleDelete}
      disabled={loading}
      className="p-2 hover:bg-error/5 rounded-lg text-on-surface-variant hover:text-error transition-colors disabled:opacity-50"
      title="Supprimer le produit"
    >
      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
    </button>
  );
}
