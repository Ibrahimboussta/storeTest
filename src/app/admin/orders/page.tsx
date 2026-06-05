import { getOrders } from '@/lib/supabase/queries';
import OrdersClient from './OrdersClient';

export default async function AdminOrdersPage() {
  const orders = await getOrders();
  
  return <OrdersClient initialOrders={orders} />;
}
