import { getOrders, getProducts } from '@/lib/supabase/queries';
import DashboardClient from './DashboardClient';

export default async function AdminDashboard() {
  const [orders, products] = await Promise.all([
    getOrders(),
    getProducts()
  ]);
  
  return <DashboardClient orders={orders} products={products} />;
}
