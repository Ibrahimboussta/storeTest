import { getProducts } from '@/lib/supabase/queries';
import InventoryClient from './InventoryClient';

export default async function InventoryPage() {
  const products = await getProducts();

  return (
    <div className="max-w-[1600px] mx-auto px-4 md:px-8">
      <InventoryClient products={products} />
    </div>
  );
}
