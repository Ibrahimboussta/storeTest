import { getCategories } from '@/lib/supabase/queries';
import ProductForm from '@/components/admin/ProductForm';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export default async function NewProductPage() {
  const categories = await getCategories();

  return (
    <div className="space-y-8">
      <div>
        <Link 
          href="/admin/products"
          className="inline-flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors font-label-md text-xs uppercase tracking-widest mb-6"
        >
          <ChevronLeft className="w-4 h-4" />
          Retour aux produits
        </Link>
        <h1 className="font-headline-lg text-3xl font-semibold">Nouveau Produit</h1>
        <p className="text-on-surface-variant font-body-md">Créez une nouvelle référence dans votre catalogue</p>
      </div>

      <ProductForm categories={categories} />
    </div>
  );
}
