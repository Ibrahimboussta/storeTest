'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { signOut } from '@/lib/supabase/actions';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Settings, 
  LogOut,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';

const sidebarLinks = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/products', label: 'Produits', icon: Package },
  { href: '/admin/orders', label: 'Commandes', icon: ShoppingCart },
  { href: '/admin/settings', label: 'Paramètres', icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const currentLink = sidebarLinks.find(l => l.href === pathname) || sidebarLinks[0];
  const currentLabel = currentLink.label;
  const CurrentIcon = currentLink.icon;

  return (
    <div className="flex min-h-screen bg-surface-container-lowest">

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-screen w-72 bg-white border-r border-outline/5 flex flex-col z-50 transition-transform duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 lg:sticky lg:top-0`}>
        <div className="p-8 border-b border-outline/5 flex items-center justify-between">
          <Link href="/" className="font-display-lg text-2xl tracking-tighter text-on-surface">
            PANEL<span className="text-primary">.</span>
            <span className="text-xs font-label-md uppercase tracking-[0.3em] block opacity-40">Admin</span>
          </Link>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-container transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        
        <nav className="flex-grow p-6 space-y-2">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setSidebarOpen(false)}
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

        <div className="p-6 border-t border-outline/5">
          <button
            onClick={() => signOut()}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-error hover:bg-error/5 transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-label-md text-sm uppercase tracking-wider">Déconnexion</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow min-w-0">
        {/* Header */}
        <header className="h-16 md:h-20 bg-white border-b border-outline/5 flex items-center justify-between px-4 md:px-8 lg:px-12 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            {/* Mobile hamburger */}
            <button 
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl hover:bg-surface-container transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3">
              <CurrentIcon className="w-5 h-5 text-primary lg:hidden" />
              <h2 className="font-headline-md text-lg md:text-xl font-semibold capitalize">
                {currentLabel}
              </h2>
            </div>
          </div>
          <div className="flex items-center gap-3 md:gap-6">
            <div className="text-right hidden sm:block">
              <p className="font-headline-md text-sm font-semibold leading-none mb-1">Admin Panel</p>
              <p className="text-[10px] font-label-md uppercase tracking-wider text-on-surface-variant opacity-60">Administrateur</p>
            </div>
            <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-surface-container border border-outline/10 flex items-center justify-center font-display-lg text-lg text-primary">
              P
            </div>
          </div>
        </header>

        {/* Page content */}
        <div className="p-4 md:p-8 lg:p-12 pb-24 lg:pb-12">
          {children}
        </div>
      </main>

      {/* Mobile bottom navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-outline/5 flex lg:hidden z-30">
        {sidebarLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex-1 flex flex-col items-center justify-center py-3 gap-1 transition-colors ${
                isActive ? 'text-primary' : 'text-on-surface-variant'
              }`}
            >
              <link.icon className="w-5 h-5" />
              <span className="font-label-md text-[9px] uppercase tracking-wider">{link.label}</span>
              {isActive && <div className="w-1 h-1 rounded-full bg-primary" />}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
