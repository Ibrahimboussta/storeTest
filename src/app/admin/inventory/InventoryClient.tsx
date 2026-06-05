'use client';

import { useState, useEffect } from 'react';
import { Package, Search, Save, Loader2, CheckCircle2, AlertCircle, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { updateStock } from '@/lib/supabase/actions';
import { useRouter } from 'next/navigation';

function InventoryImage({ src, alt }: { src: string; alt: string }) {
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

export default function InventoryClient({ products: initialProducts }: { products: any[] }) {
  const [products, setProducts] = useState(() => 
    [...initialProducts].sort((a, b) => a.name.localeCompare(b.name))
  );
  const [updates, setUpdates] = useState<{ [key: string]: number }>({});
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<'success' | 'error' | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();

  // Re-sort and sync when database data changes (after save)
  useEffect(() => {
    setProducts([...initialProducts].sort((a, b) => a.stock_quantity - b.stock_quantity));
  }, [initialProducts]);

  const ITEMS_PER_PAGE = 24;

  const handleStockChange = (id: string, value: string) => {
    const newValue = parseInt(value) || 0;
    setUpdates(prev => ({ ...prev, [id]: newValue }));
    setProducts(prev => prev.map(p => p.id === id ? { ...p, stock_quantity: newValue } : p));
  };

  const handleSave = async () => {
    const updateArray = Object.entries(updates).map(([id, stock_quantity]) => ({ id, stock_quantity }));
    if (updateArray.length === 0) return;

    setLoading(true);
    setStatus(null);
    try {
      const result = await updateStock(updateArray);
      if (result.success) {
        setStatus('success');
        setUpdates({});
        router.refresh();
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const pendingCount = Object.keys(updates).length;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <Link href="/admin" className="inline-flex items-center gap-2 text-primary font-label-md text-[10px] uppercase tracking-widest mb-4 hover:gap-3 transition-all">
            <ArrowLeft className="w-3 h-3" /> Retour au Dashboard
          </Link>
          <h1 className="font-headline-lg text-3xl font-semibold">Gestion de l'Inventaire</h1>
          <p className="text-on-surface-variant font-body-md">Mettez à jour vos stocks rapidement</p>
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-grow md:w-64">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant/40" />
            <input 
              placeholder="Rechercher un produit..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-12 pl-11 pr-6 rounded-full bg-white border border-outline/10 focus:outline-none focus:border-primary transition-all text-sm"
            />
          </div>
          <button 
            onClick={handleSave}
            disabled={loading || pendingCount === 0}
            className="flex items-center gap-2 bg-primary text-on-primary px-8 py-3 rounded-full font-label-md text-xs uppercase tracking-widest hover:bg-primary-container transition-all shadow-lg shadow-primary/20 disabled:opacity-30 h-12"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {pendingCount > 0 ? `Sauvegarder (${pendingCount})` : 'Sauvegarder'}
          </button>
        </div>
      </div>

      {status && (
        <div className={`p-4 rounded-2xl flex items-center gap-3 font-label-md text-xs uppercase tracking-widest ${
          status === 'success' ? 'bg-success/10 text-success' : 'bg-error/10 text-error'
        }`}>
          {status === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
          {status === 'success' ? 'Inventaire mis à jour avec succès !' : 'Erreur lors de la mise à jour.'}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {paginatedProducts.map((product) => {
          const isLow = product.stock_quantity < 20;
          const isCritical = product.stock_quantity < 10;
          const percentage = Math.min(100, (product.stock_quantity / 20) * 100);

          return (
            <div key={product.id} className="bg-white p-8 rounded-[2.5rem] border border-outline/5 shadow-sm space-y-6 hover:shadow-xl transition-all duration-500 group">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-surface-container overflow-hidden flex items-center justify-center shrink-0">
                    {product.image_url ? (
                      <InventoryImage src={product.image_url} alt={product.name} />
                    ) : (
                      <Package className="w-6 h-6 text-on-surface-variant/20" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-headline-md text-base font-bold text-on-surface group-hover:text-primary transition-colors">{product.name}</h4>
                    <span className="text-[10px] font-label-md uppercase tracking-widest text-on-surface-variant/40">{(product.categories as any)?.name}</span>
                  </div>
                </div>
                <div className={`w-3 h-3 rounded-full ${isCritical ? 'bg-error shadow-[0_0_12px_rgba(255,59,48,0.4)]' : isLow ? 'bg-warning' : 'bg-success/40'}`} />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-[10px] font-label-md uppercase tracking-widest text-on-surface-variant/60">
                  <span>Niveau de Stock</span>
                  <span className={isCritical ? 'text-error font-bold' : ''}>{product.stock_quantity} UNITÉS RESTANTES (SEUIL: 20)</span>
                </div>
                <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-1000 ease-out rounded-full ${isCritical ? 'bg-error' : isLow ? 'bg-warning' : 'bg-primary'}`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>

              <div className="pt-2">
                <label className="text-[10px] font-label-md uppercase tracking-[0.2em] text-on-surface-variant/40 ml-1 mb-2 block">Ajuster la quantité</label>
                <div className="relative">
                  <input 
                    type="number" 
                    value={product.stock_quantity}
                    onChange={(e) => handleStockChange(product.id, e.target.value)}
                    className={`w-full h-14 px-6 rounded-2xl bg-surface-container-low border transition-all font-bold text-lg focus:outline-none focus:ring-4 ${
                      updates[product.id] !== undefined ? 'border-primary ring-primary/5 bg-primary/5' : 'border-outline/10 focus:border-primary'
                    }`}
                  />
                  {updates[product.id] !== undefined && (
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                      <span className="text-[8px] font-bold uppercase tracking-widest text-primary">Modifié</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-8 py-6 bg-white rounded-3xl border border-outline/5 shadow-sm mt-12">
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
