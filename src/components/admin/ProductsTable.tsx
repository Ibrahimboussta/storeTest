'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Edit2, ExternalLink, Package, Trash2, Loader2, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import DeleteProductButton from '@/components/admin/DeleteProductButton';
import { bulkDeleteProducts } from '@/lib/supabase/actions';

interface ProductsTableProps {
  products: any[];
}

const ITEMS_PER_PAGE = 25;

function AdminImage({ src, alt }: { src: string; alt: string }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {!loaded && (
        <div className="absolute inset-0 bg-surface-container/50 animate-pulse flex items-center justify-center">
          <Loader2 className="w-4 h-4 animate-spin text-primary/20" />
        </div>
      )}
      <img 
        src={src} 
        alt={alt} 
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={`w-full h-full object-cover transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`} 
      />
    </div>
  );
}

export default function ProductsTable({ products }: ProductsTableProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [deleting, setDeleting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = products.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === products.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(products.map(p => p.id));
    }
  };

  const handleBulkDelete = async () => {
    if (!confirm(`Voulez-vous vraiment supprimer ${selectedIds.length} produits ?`)) return;
    
    setDeleting(true);
    try {
      const result = await bulkDeleteProducts(selectedIds);
      if (result.success) {
        setSelectedIds([]);
      } else {
        alert("Erreur: " + result.error);
      }
    } catch (err: any) {
      alert("Erreur: " + err.message);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-4">
      {selectedIds.length > 0 && (
        <div className="flex items-center justify-between bg-primary/5 p-4 rounded-2xl border border-primary/10 animate-in fade-in slide-in-from-top-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center text-xs font-bold">
              {selectedIds.length}
            </div>
            <span className="text-sm font-medium text-primary">Produits sélectionnés</span>
          </div>
          <button 
            onClick={handleBulkDelete}
            disabled={deleting}
            className="flex items-center gap-2 bg-error text-white px-6 py-2 rounded-full font-label-md text-xs uppercase tracking-widest hover:bg-error/90 transition-all shadow-lg shadow-error/10 disabled:opacity-50"
          >
            {deleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
            Supprimer la sélection
          </button>
        </div>
      )}

      <div className="bg-white rounded-[2rem] border border-outline/5 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-surface-container-low font-label-md text-[10px] uppercase tracking-[0.2em] text-on-surface-variant/60">
                <th className="px-6 py-6 w-10">
                  <input 
                    type="checkbox" 
                    checked={selectedIds.length === products.length && products.length > 0}
                    onChange={toggleSelectAll}
                    className="w-5 h-5 rounded border-outline/20 accent-primary cursor-pointer"
                  />
                </th>
                <th className="px-6 py-6">Produit</th>
                <th className="px-6 py-6">Catégorie</th>
                <th className="px-6 py-6">Prix</th>
                <th className="px-6 py-6">Stock</th>
                <th className="px-10 py-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline/5">
              {paginatedProducts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-20 text-center text-on-surface-variant/40 font-body-md italic">
                    Aucun produit trouvé.
                  </td>
                </tr>
              ) : (
                paginatedProducts.map((product) => (
                  <tr key={product.id} className={`hover:bg-surface-container-low/30 transition-colors group ${selectedIds.includes(product.id) ? 'bg-primary/5' : ''}`}>
                    <td className="px-6 py-6">
                      <input 
                        type="checkbox" 
                        checked={selectedIds.includes(product.id)}
                        onChange={() => toggleSelect(product.id)}
                        className="w-5 h-5 rounded border-outline/20 accent-primary cursor-pointer"
                      />
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-surface-container overflow-hidden shrink-0 flex items-center justify-center text-on-surface-variant/20 border border-outline/5">
                          {product.image_url ? (
                            <AdminImage src={product.image_url} alt={product.name} />
                          ) : (
                            <Package className="w-6 h-6" />
                          )}
                        </div>
                        <div>
                          <div className="font-headline-md text-sm font-semibold">{product.name}</div>
                          <div className="text-[10px] font-label-md uppercase tracking-wider text-on-surface-variant/60">{product.slug}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <span className="px-3 py-1 bg-surface-container rounded-full text-[10px] font-label-md uppercase tracking-wider">
                        {(product.categories as any)?.name || 'N/A'}
                      </span>
                    </td>
                    <td className="px-6 py-6 font-headline-md text-sm font-semibold">
                      {product.price.toFixed(2)} DH
                    </td>
                    <td className="px-6 py-6">
                      <span className={`font-body-md text-sm ${product.stock_quantity < 10 ? 'text-error font-bold' : 'text-on-surface-variant'}`}>
                        {product.stock_quantity}
                      </span>
                    </td>
                    <td className="px-10 py-6">
                      <div className="flex justify-end gap-2">
                        <Link href={`/products/${product.slug}`} target="_blank" className="p-2 hover:bg-primary/5 rounded-lg text-on-surface-variant hover:text-primary transition-colors">
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                        <Link href={`/admin/products/${product.id}`} className="p-2 hover:bg-primary/5 rounded-lg text-on-surface-variant hover:text-primary transition-colors">
                          <Edit2 className="w-4 h-4" />
                        </Link>
                        <DeleteProductButton productId={product.id} productName={product.name} />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-8 py-6 bg-white rounded-3xl border border-outline/5 shadow-sm">
          <p className="text-xs font-label-md text-on-surface-variant uppercase tracking-widest">
            Page <span className="text-primary font-bold">{currentPage}</span> sur <span className="text-primary font-bold">{totalPages}</span>
          </p>
          <div className="flex gap-2">
            <button 
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="w-10 h-10 rounded-full border border-outline/10 flex items-center justify-center hover:bg-surface-container transition-all disabled:opacity-30 disabled:pointer-events-none"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="w-10 h-10 rounded-full border border-outline/10 flex items-center justify-center hover:bg-surface-container transition-all disabled:opacity-30 disabled:pointer-events-none"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
