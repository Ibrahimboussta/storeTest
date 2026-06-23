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
  AlertCircle,
  Eye,
  AlertTriangle,
  Menu,
  X
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';

export default function DashboardClient({ orders: initialOrders, products }: { orders: any[], products: any[] }) {
  const [orders, setOrders] = useState(initialOrders);
  const [ordersMenuOpen, setOrdersMenuOpen] = useState(false);
  const [stockMenuOpen, setStockMenuOpen] = useState(false);
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
          <div className="p-4 md:p-10 border-b border-outline/5">
            <div className="flex justify-between items-center">
              <h3 className="font-headline-lg text-lg md:text-2xl font-semibold">Commandes Récentes</h3>
              
              {/* Desktop buttons */}
              <div className="hidden md:flex gap-3">
                <Link
                  href="/admin/orders"
                  className="flex items-center gap-2 px-4 py-2 text-primary font-label-md text-xs uppercase tracking-widest border border-primary rounded-lg hover:bg-primary/5 transition-colors"
                >
                  <Eye className="w-4 h-4" />
                  Voir tout
                </Link>
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden relative">
                <button
                  onClick={() => setOrdersMenuOpen(!ordersMenuOpen)}
                  className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-surface-container transition-colors text-primary"
                  aria-label="Orders menu"
                >
                  {ordersMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
                
                {/* Mobile dropdown menu */}
                {ordersMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 bg-white border border-outline/10 rounded-lg shadow-lg z-50 min-w-[200px] py-2">
                    <Link
                      href="/admin/orders"
                      onClick={() => setOrdersMenuOpen(false)}
                      className="block px-4 py-3 hover:bg-surface-container-low text-sm font-label-md text-on-surface flex items-center gap-3 transition-colors"
                    >
                      <Eye className="w-4 h-4 text-primary" />
                      Voir les commandes
                    </Link>
                    <button
                      onClick={() => {
                        // Export functionality
                        setOrdersMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-3 hover:bg-surface-container-low text-sm font-label-md text-on-surface flex items-center gap-3 transition-colors"
                    >
                      <ShoppingCart className="w-4 h-4 text-primary" />
                      Exporter les commandes
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[800px]">
              <thead>
                <tr className="bg-surface-container-low font-label-md text-[10px] uppercase tracking-[0.2em] text-on-surface-variant/60">
                  <th className="px-4 md:px-10 py-4 md:py-6">ID Commande</th>
                  <th className="px-3 md:px-6 py-4 md:py-6">Client</th>
                  <th className="px-3 md:px-6 py-4 md:py-6 hidden sm:table-cell">Date</th>
                  <th className="px-3 md:px-6 py-4 md:py-6 hidden md:table-cell">Produits</th>
                  <th className="px-3 md:px-6 py-4 md:py-6">Montant</th>
                  <th className="px-4 md:px-10 py-4 md:py-6">Statut</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline/5">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-surface-container-low/30 transition-colors group">
                    <td className="px-4 md:px-10 py-4 md:py-6 font-headline-md text-xs md:text-sm font-semibold">#{order.id.slice(0, 8)}</td>
                    <td className="px-3 md:px-6 py-4 md:py-6 font-body-md text-on-surface-variant text-xs md:text-sm">
                      {order.shipping_address?.firstName 
                        ? `${order.shipping_address.firstName} ${order.shipping_address.lastName || ''}`
                        : (order.profiles as any)?.full_name || 'Anonyme'}
                    </td>
                    <td className="px-3 md:px-6 py-4 md:py-6 font-body-md text-on-surface-variant/60 text-xs hidden sm:table-cell">{new Date(order.created_at).toLocaleDateString()}</td>
                    <td className="px-3 md:px-6 py-4 md:py-6 hidden md:table-cell">
                      <div className="text-xs space-y-0.5">
                        {order.order_items?.map((item: any, idx: number) => (
                          <div key={idx} className="truncate max-w-[150px]">
                            <span className="font-bold text-primary mr-1">{item.quantity}x</span>
                            {item.products?.name}
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-3 md:px-6 py-4 md:py-6 font-headline-md text-xs md:text-sm font-semibold">{Number(order.total_amount).toFixed(2)} DH</td>
                    <td className="px-4 md:px-10 py-4 md:py-6">
                      <span className={`inline-flex items-center gap-1.5 px-2 md:px-3 py-1 rounded-full text-[9px] md:text-[10px] font-label-md uppercase tracking-wider ${
                        order.status === 'confirmed' ? 'text-success bg-success/10' :
                        order.status === 'pending' ? 'text-warning bg-warning/10' :
                        order.status === 'cancelled' ? 'text-error bg-error/10' :
                        order.status === 'not_interested' ? 'text-on-surface-variant bg-surface-container' :
                        'text-primary bg-primary/10'
                      }`}>
                        {order.status === 'confirmed' ? <CheckCircle2 className="w-3 h-3" /> :
                         order.status === 'pending' ? <Clock className="w-3 h-3" /> :
                         <AlertCircle className="w-3 h-3" />}
                        <span className="hidden sm:inline">{order.status === 'confirmed' ? 'Confirmer' :
                         order.status === 'pending' ? 'En attente' :
                         order.status === 'cancelled' ? 'Annuler' :
                         order.status === 'not_interested' ? 'Pas intéressé' :
                         'Pas de réponse'}</span>
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
          className="bg-white rounded-[2rem] border border-outline/5 shadow-sm p-4 md:p-10 h-fit"
        >
          <div className="flex justify-between items-center mb-6 md:mb-8">
            <h3 className="font-headline-lg text-lg md:text-2xl font-semibold flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-warning" />
              Alertes Stock
            </h3>
            
            {/* Desktop button */}
            <Link 
              href="/admin/inventory" 
              className="hidden md:flex items-center gap-2 px-4 py-2 text-primary font-label-md text-xs uppercase tracking-widest border border-primary rounded-lg hover:bg-primary/5 transition-colors"
            >
              <Eye className="w-4 h-4" />
              Gérer tout
            </Link>

            {/* Mobile menu button */}
            <div className="md:hidden relative">
              <button
                onClick={() => setStockMenuOpen(!stockMenuOpen)}
                className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-surface-container transition-colors text-primary"
                aria-label="Stock menu"
              >
                {stockMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
              
              {/* Mobile dropdown menu */}
              {stockMenuOpen && (
                <div className="absolute right-0 top-full mt-2 bg-white border border-outline/10 rounded-lg shadow-lg z-50 min-w-[200px] py-2">
                  <Link
                    href="/admin/inventory"
                    onClick={() => setStockMenuOpen(false)}
                    className="block px-4 py-3 hover:bg-surface-container-low text-sm font-label-md text-on-surface flex items-center gap-3 transition-colors"
                  >
                    <Eye className="w-4 h-4 text-primary" />
                    Gérer l'inventaire
                  </Link>
                  <Link
                    href="/admin/products"
                    onClick={() => setStockMenuOpen(false)}
                    className="block px-4 py-3 hover:bg-surface-container-low text-sm font-label-md text-on-surface flex items-center gap-3 transition-colors"
                  >
                    <Package className="w-4 h-4 text-primary" />
                    Voir les produits
                  </Link>
                </div>
              )}
            </div>
          </div>
          <div className="space-y-4">
            {products
              .filter(p => p.stock_quantity < 20)
              .sort((a, b) => a.stock_quantity - b.stock_quantity)
              .slice(0, 5)
              .map((item, i) => (
              <div key={i} className="p-4 md:p-6 rounded-xl md:rounded-2xl bg-surface-container-low border border-outline/5">
                <div className="flex justify-between items-center mb-3 md:mb-4">
                  <h4 className="font-headline-md text-xs md:text-sm font-semibold line-clamp-2">{item.name}</h4>
                  <span className={`flex-shrink-0 w-2 h-2 rounded-full ${item.stock_quantity < 10 ? 'bg-error' : 'bg-warning'}`} />
                </div>
                <div className="w-full bg-surface-container rounded-full h-1.5 mb-2">
                  <div className={`${item.stock_quantity < 10 ? 'bg-error' : 'bg-warning'} h-1.5 rounded-full`} style={{ width: `${Math.min(100, (item.stock_quantity / 20) * 100)}%` }} />
                </div>
                <p className="text-[9px] md:text-[10px] font-label-md uppercase tracking-wider text-on-surface-variant opacity-60">
                  {item.stock_quantity} unités (Seuil: 20)
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
