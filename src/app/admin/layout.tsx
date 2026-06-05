'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  Image as ImageIcon, 
  Settings, 
  LogOut,
  ChevronRight
} from 'lucide-react';

const sidebarLinks = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/products', label: 'Produits', icon: Package },
  { href: '/admin/orders', label: 'Commandes', icon: ShoppingCart },
  { href: '/admin/settings', label: 'Paramètres', icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-surface-container-lowest">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-outline/5 flex flex-col sticky top-0 h-screen">
        <div className="p-8 border-b border-outline/5">
          <Link href="/" className="font-display-lg text-2xl tracking-tighter text-on-surface">
            PANEL<span className="text-primary">.</span><span className="text-xs font-label-md uppercase tracking-[0.3em] block opacity-40">Admin</span>
          </Link>
        </div>
        
        <nav className="flex-grow p-6 space-y-2">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all group ${
                  isActive 
                  ? 'bg-primary text-on-primary shadow-lg shadow-primary/20' 
                  : 'text-on-surface-variant hover:bg-surface-container-low hover:text-primary'
                }`}
              >
                <div className="flex items-center gap-3">
                  <link.icon className={`w-5 h-5 ${isActive ? 'text-on-primary' : 'text-on-surface-variant group-hover:text-primary'}`} />
                  <span className="font-label-md text-sm uppercase tracking-wider">{link.label}</span>
                </div>
                {isActive && <ChevronRight className="w-4 h-4 opacity-50" />}
              </Link>
            );
          })}
        </nav>

        <div className="p-6 border-t border-outline/5 space-y-4">
          <button
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-error hover:bg-error/5 transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-label-md text-sm uppercase tracking-wider">Déconnexion</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow">
        <header className="h-20 bg-white border-b border-outline/5 flex items-center justify-between px-12 sticky top-0 z-30">
          <h2 className="font-headline-md text-xl font-semibold capitalize">
            {sidebarLinks.find(l => l.href === pathname)?.label || 'Paramètres'}
          </h2>
          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="font-headline-md text-sm font-semibold leading-none mb-1">Admin Panel</p>
              <p className="text-[10px] font-label-md uppercase tracking-wider text-on-surface-variant opacity-60">Administrateur</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-surface-container border border-outline/10 flex items-center justify-center font-display-lg text-lg text-primary">
              P
            </div>
          </div>
        </header>
        <div className="p-12">
          {children}
        </div>
      </main>
    </div>
  );
}
