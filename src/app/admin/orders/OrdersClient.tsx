'use client';

import { useState, useEffect } from 'react';
import { 
  Search, 
  Download, 
  ChevronLeft, 
  ChevronRight, 
  Phone, 
  MapPin, 
  User, 
  ExternalLink,
  Loader2,
  RefreshCw
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { getLatestOrders, updateOrderStatus } from '@/lib/supabase/actions';
import * as XLSX from 'xlsx';

const ITEMS_PER_PAGE = 15;

export default function OrdersClient({ initialOrders }: { initialOrders: any[] }) {
  const [orders, setOrders] = useState<any[]>(initialOrders);
  const [loading, setLoading] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(initialOrders.length);
  const [searchTerm, setSearchTerm] = useState('');
  const [exportMenuOpen, setExportMenuOpen] = useState(false);
  const supabase = createClient();

  const fetchOrders = async () => {
    try {
      setLoading(true);
      
      // If no search/pagination, use server action for reliability
      if (!searchTerm && currentPage === 1) {
        const data = await getLatestOrders();
        if (data) {
          setOrders(data);
          setTotalCount(data.length);
          return;
        }
      }

      const from = (currentPage - 1) * ITEMS_PER_PAGE;
      const to = from + ITEMS_PER_PAGE - 1;

      let query = supabase
        .from('orders')
        .select('*, order_items(*, products(name))', { count: 'exact' });

      if (searchTerm) {
        query = query.or(`shipping_address->>firstName.ilike.%${searchTerm}%, shipping_address->>lastName.ilike.%${searchTerm}%, shipping_address->>phone.ilike.%${searchTerm}%`);
      }

      const { data, error, count } = await query
        .order('created_at', { ascending: false })
        .range(from, to);

      if (data) {
        setOrders(data);
        setTotalCount(count || 0);
      }
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Only fetch if not the initial mount or if search/page changed
    if (searchTerm || currentPage > 1) {
      fetchOrders();
    }

    const channel = supabase
      .channel('realtime-orders-page')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, () => {
        fetchOrders();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [currentPage, searchTerm]);

  const updateStatus = async (orderId: string, newStatus: string) => {
    try {
      setUpdatingId(orderId);
      const result = await updateOrderStatus(orderId, newStatus);
      
      if (result.success) {
        setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
      } else {
        alert("Erreur de mise à jour: " + result.error);
      }
    } catch (err: any) {
      alert("Erreur réseau: " + err.message);
    } finally {
      setUpdatingId(null);
    }
  };

  const exportData = (format: 'csv' | 'xlsx') => {
    const headers = ['Order ID', 'Date', 'Customer', 'Phone', 'Address', 'City', 'Products', 'Total', 'Status'];
    const rows = orders.map(order => {
      const productsStr = order.order_items?.map((item: any) => `${item.quantity}x ${item.products?.name || 'Produit inconnu'}`).join(' | ') || 'N/A';
      return [
        order.id,
        new Date(order.created_at).toLocaleDateString(),
        `${order.shipping_address?.firstName} ${order.shipping_address?.lastName || ''}`.trim(),
        order.shipping_address?.phone || 'N/A',
        order.shipping_address?.address || 'N/A',
        order.shipping_address?.city || 'N/A',
        productsStr,
        order.total_amount,
        order.status
      ];
    });

    if (format === 'csv') {
      const csvContent = "data:text/csv;charset=utf-8," + headers.join(",") + "\n" + rows.map(e => `"${e.join('","')}"`).join("\n");
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "commandes.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else if (format === 'xlsx') {
      const worksheet = XLSX.utils.aoa_to_sheet([headers, ...rows]);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Commandes");
      XLSX.writeFile(workbook, "commandes.xlsx");
    }
    setExportMenuOpen(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap justify-between items-end gap-6">
        <div>
          <h1 className="font-headline-lg text-3xl font-semibold text-on-surface">Gestion des Commandes</h1>
          <p className="text-on-surface-variant font-body-md mt-1">Gérez vos expéditions et le statut des commandes</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => fetchOrders()}
            disabled={loading}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white border border-outline/10 text-on-surface hover:bg-surface-container transition-all font-label-md text-sm uppercase tracking-widest disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Actualiser
          </button>
          <div className="relative">
            <button 
              onClick={() => setExportMenuOpen(!exportMenuOpen)}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-on-primary hover:bg-primary-container transition-all font-label-md text-sm uppercase tracking-widest shadow-lg shadow-primary/20"
            >
              <Download className="w-4 h-4" />
              Exporter
            </button>
            {exportMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-outline/10 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
                <button 
                  onClick={() => exportData('csv')}
                  className="w-full text-left px-4 py-3 text-sm font-body-md text-on-surface hover:bg-surface-container transition-colors"
                >
                  Format CSV
                </button>
                <button 
                  onClick={() => exportData('xlsx')}
                  className="w-full text-left px-4 py-3 text-sm font-body-md text-on-surface hover:bg-surface-container transition-colors border-t border-outline/5"
                >
                  Format Excel (.xlsx)
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-outline/5 shadow-sm flex gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant/40" />
          <input 
            type="text" 
            placeholder="Rechercher par nom ou email..."
            className="w-full h-12 pl-12 pr-6 rounded-xl bg-surface-container-low focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white rounded-[2rem] border border-outline/5 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-surface-container-low font-label-md text-[10px] uppercase tracking-[0.2em] text-on-surface-variant/60">
                <th className="px-8 py-6">Commande & Client</th>
                <th className="px-6 py-6">Coordonnées</th>
                <th className="px-6 py-6">Produits</th>
                <th className="px-6 py-6">Prix</th>
                <th className="px-6 py-6">Statut</th>
                <th className="px-8 py-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline/5">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-20 text-center">
                    <Loader2 className="w-10 h-10 animate-spin text-primary/20 mx-auto" />
                  </td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-20 text-center text-on-surface-variant/60 font-body-md">
                    Aucune commande trouvée
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.id} className="hover:bg-surface-container-low/30 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="space-y-1">
                        <div className="font-headline-md text-sm font-bold text-primary leading-none">#{order.id.slice(0, 8).toUpperCase()}</div>
                        <div className="text-[10px] font-label-md text-on-surface-variant uppercase tracking-wider">
                          {new Date(order.created_at).toLocaleDateString('fr-FR')}
                        </div>
                        <div className="flex items-center gap-2 mt-2 font-medium text-sm">
                          <User className="w-3 h-3 opacity-30" />
                          {order.shipping_address?.firstName} {order.shipping_address?.lastName}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="w-3 h-3 text-primary/60" />
                          {order.shipping_address?.phone || 'N/A'}
                        </div>
                        <div className="flex items-start gap-2 text-xs text-on-surface-variant leading-tight">
                          <MapPin className="w-3 h-3 mt-0.5 opacity-40 shrink-0" />
                          <span>{order.shipping_address?.address}, {order.shipping_address?.city}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <div className="max-w-[200px] space-y-1">
                        {order.order_items && order.order_items.length > 0 ? (
                          order.order_items.map((item: any, idx: number) => (
                            <div key={idx} className="text-xs truncate">
                              <span className="font-bold text-primary mr-1">{item.quantity}x</span>
                              {item.products?.name}
                            </div>
                          ))
                        ) : (
                          <div className="text-[10px] text-on-surface-variant/40 italic">
                            Détails en attente...
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-6 font-headline-md text-base font-bold text-on-surface">
                      {Number(order.total_amount).toFixed(2)} DH
                    </td>
                    <td className="px-6 py-6">
                      <div className="relative">
                        <select 
                          value={order.status}
                          disabled={updatingId === order.id}
                          onChange={(e) => updateStatus(order.id, e.target.value)}
                          className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest border transition-all cursor-pointer focus:outline-none disabled:opacity-50 ${
                            order.status === 'pending' ? 'bg-amber-100 text-amber-700 border-amber-200' :
                            order.status === 'confirmed' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' :
                            order.status === 'cancelled' ? 'bg-rose-100 text-rose-700 border-rose-200' :
                            order.status === 'not_interested' ? 'bg-gray-100 text-gray-700 border-gray-200' :
                            'bg-indigo-100 text-indigo-700 border-indigo-200'
                          }`}
                        >
                          <option value="pending">En attente</option>
                          <option value="confirmed">Confirmer</option>
                          <option value="cancelled">Annuler</option>
                          <option value="not_interested">Pas intéressé</option>
                          <option value="no_answer">Pas de réponse</option>
                        </select>
                        {updatingId === order.id && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Loader2 className="w-4 h-4 animate-spin text-primary" />
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button className="p-2 hover:bg-primary/5 rounded-lg text-on-surface-variant hover:text-primary transition-all">
                        <ExternalLink className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
