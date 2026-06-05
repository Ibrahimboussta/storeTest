'use client';

import { 
  TrendingUp, 
  Users, 
  Package, 
  ShoppingCart, 
  ArrowUpRight, 
  ArrowDownRight,
  Clock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';

export default function DashboardClient({ orders: initialOrders, products }: { orders: any[], products: any[] }) {
  const [orders, setOrders] = useState(initialOrders);
  const supabase = createClient();

  const fetchLatestOrders = async () => {
    const { data } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5);
    
    if (data) setOrders(data);
  };

  useEffect(() => {
    // Subscribe to real-time changes
    const channel = supabase
      .channel('dashboard-orders')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'orders' },
        () => {
          fetchLatestOrders();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const stats = [
    { label: 'Ventes Totales', value: `${orders.reduce((acc, o) => acc + Number(o.total_amount), 0).toFixed(2)} DH`, trend: '+12.5%', isUp: true, icon: TrendingUp },
    { label: 'Commandes', value: orders.length.toString(), trend: '+8.2%', isUp: true, icon: ShoppingCart },
    { label: 'Produits Actifs', value: products.length.toString(), trend: '0%', isUp: true, icon: Package },
  ];

  return (
    <div className="space-y-12">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-8 rounded-[2rem] border border-outline/5 shadow-sm"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 rounded-2xl bg-surface-container-low flex items-center justify-center text-on-surface-variant">
                <stat.icon className="w-6 h-6" />
              </div>
              <div className={`flex items-center gap-1 text-xs font-label-md px-2 py-1 rounded-full ${stat.isUp ? 'bg-success/10 text-success' : 'bg-error/10 text-error'}`}>
                {stat.isUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {stat.trend}
              </div>
            </div>
            <p className="text-on-surface-variant font-label-md text-xs uppercase tracking-widest mb-2">{stat.label}</p>
            <h3 className="font-display-lg-mobile text-3xl font-bold">{stat.value}</h3>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Recent Orders */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 bg-white rounded-[2rem] border border-outline/5 shadow-sm overflow-hidden"
        >
          <div className="p-10 border-b border-outline/5 flex justify-between items-center">
            <h3 className="font-headline-lg text-2xl font-semibold">Commandes Récentes</h3>
            <button className="text-primary font-label-md text-xs uppercase tracking-widest border-b border-primary">Voir tout</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-surface-container-low font-label-md text-[10px] uppercase tracking-[0.2em] text-on-surface-variant/60">
                  <th className="px-10 py-6">ID Commande</th>
                  <th className="px-6 py-6">Client</th>
                  <th className="px-6 py-6">Date</th>
                  <th className="px-6 py-6">Produits</th>
                  <th className="px-6 py-6">Montant</th>
                  <th className="px-10 py-6">Statut</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline/5">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-surface-container-low/30 transition-colors group">
                    <td className="px-10 py-6 font-headline-md text-sm font-semibold">#{order.id.slice(0, 8)}</td>
                    <td className="px-6 py-6 font-body-md text-on-surface-variant">
                      {order.shipping_address?.firstName 
                        ? `${order.shipping_address.firstName} ${order.shipping_address.lastName || ''}`
                        : (order.profiles as any)?.full_name || 'Anonyme'}
                    </td>
                    <td className="px-6 py-6 font-body-md text-on-surface-variant/60 text-xs">{new Date(order.created_at).toLocaleDateString()}</td>
                    <td className="px-6 py-6">
                      <div className="text-xs space-y-0.5">
                        {order.order_items?.map((item: any, idx: number) => (
                          <div key={idx} className="truncate max-w-[150px]">
                            <span className="font-bold text-primary mr-1">{item.quantity}x</span>
                            {item.products?.name}
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-6 font-headline-md text-sm font-semibold">{Number(order.total_amount).toFixed(2)} DH</td>
                    <td className="px-10 py-6">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-label-md uppercase tracking-wider ${
                        order.status === 'confirmed' ? 'text-success bg-success/10' :
                        order.status === 'pending' ? 'text-warning bg-warning/10' :
                        order.status === 'cancelled' ? 'text-error bg-error/10' :
                        order.status === 'not_interested' ? 'text-on-surface-variant bg-surface-container' :
                        'text-primary bg-primary/10'
                      }`}>
                        {order.status === 'confirmed' ? <CheckCircle2 className="w-3 h-3" /> :
                         order.status === 'pending' ? <Clock className="w-3 h-3" /> :
                         <AlertCircle className="w-3 h-3" />}
                        {order.status === 'confirmed' ? 'Confirmer' :
                         order.status === 'pending' ? 'En attente' :
                         order.status === 'cancelled' ? 'Annuler' :
                         order.status === 'not_interested' ? 'Pas intéressé' :
                         'Pas de réponse'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Inventory Alert */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-[2rem] border border-outline/5 shadow-sm p-10 h-fit"
        >
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-headline-lg text-2xl font-semibold">Alertes Stock</h3>
            <Link 
              href="/admin/inventory" 
              className="text-primary font-label-md text-[10px] uppercase tracking-[0.2em] border-b border-primary hover:text-primary-container hover:border-primary-container transition-all"
            >
              Gérer tout
            </Link>
          </div>
          <div className="space-y-6">
            {products
              .filter(p => p.stock_quantity < 20)
              .sort((a, b) => a.stock_quantity - b.stock_quantity)
              .slice(0, 5)
              .map((item, i) => (
              <div key={i} className="p-6 rounded-2xl bg-surface-container-low border border-outline/5">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-headline-md text-sm font-semibold">{item.name}</h4>
                  <span className={`w-2 h-2 rounded-full ${item.stock_quantity < 10 ? 'bg-error' : 'bg-warning'}`} />
                </div>
                <div className="w-full bg-surface-container rounded-full h-1.5 mb-2">
                  <div className={`${item.stock_quantity < 10 ? 'bg-error' : 'bg-warning'} h-1.5 rounded-full`} style={{ width: `${Math.min(100, (item.stock_quantity / 20) * 100)}%` }} />
                </div>
                <p className="text-[10px] font-label-md uppercase tracking-wider text-on-surface-variant opacity-60">
                  {item.stock_quantity} unités restantes (Seuil: 20)
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
