import { getCategories } from '@/lib/supabase/queries';
import ProductForm from '@/components/admin/ProductForm';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const categories = await getCategories();

  const { data: product } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (!product) {
    notFound();
  }

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
        <h1 className="font-headline-lg text-3xl font-semibold">Modifier le Produit</h1>
        <p className="text-on-surface-variant font-body-md">Mettez à jour les informations de {product.name}</p>
      </div>

      <ProductForm product={product} categories={categories} />
    </div>
  );
}
