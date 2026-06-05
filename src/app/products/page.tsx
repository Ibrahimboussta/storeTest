import { getProducts, getCategories } from '@/lib/supabase/queries';
import ProductsClient from './ProductsClient';

export default async function ProductsPage() {
  const products = await getProducts();
  const categories = await getCategories();

  return <ProductsClient initialProducts={products} categories={categories} />;
}
