import { getProducts, getCategories } from '@/lib/supabase/queries';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import ProductImport from '@/components/admin/ProductImport';
import ProductsTable from '@/components/admin/ProductsTable';

export default async function AdminProductsPage() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories()
  ]);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="font-headline-lg text-3xl font-semibold">Produits</h1>
          <p className="text-on-surface-variant font-body-md">Gérez votre catalogue de sauces gastronomiques</p>
        </div>
        <div className="flex items-center gap-4">
          <ProductImport categories={categories} />
          <Link 
            href="/admin/products/new"
            className="flex items-center gap-2 bg-primary text-on-primary px-6 py-4 rounded-full font-label-md text-sm uppercase tracking-widest hover:bg-primary-container transition-all shadow-lg shadow-primary/20 h-fit"
          >
            <Plus className="w-4 h-4" />
            Ajouter un produit
          </Link>
        </div>
      </div>

      <ProductsTable products={products} />
    </div>
  );
}
