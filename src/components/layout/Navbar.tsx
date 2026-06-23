'use client';

import { ShoppingCart, User, LogOut } from 'lucide-react';
import { useShopStore } from '@/store/useShopStore';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { signOut } from '@/lib/supabase/actions';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export function Navbar() {
  const cart = useShopStore((state) => state.cart);
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const [user, setUser] = useState<any>(null);
  const [role, setRole] = useState<string | null>(null);
  const supabase = createClient();
  const router = useRouter();

  const isAdmin = role === 'admin' || user?.email === 'admin@panel.com';

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setUser(session?.user ?? null);
        if (session?.user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', session.user.id)
            .single();
          setRole((profile as any)?.role || 'customer');
        }
      } catch (err) {
        console.error('Error fetching session:', err);
      }
    };

    fetchSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      try {
        setUser(session?.user ?? null);
        if (session?.user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', session.user.id)
            .single();
          setRole((profile as any)?.role || 'customer');
        } else {
          setRole(null);
        }
      } catch (err) {
        console.error('Error on auth state change:', err);
      }
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  return (
    <nav className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl border-b border-outline/5 shadow-[0_4px_40px_rgba(112,90,76,0.04)] transition-all duration-500 ease-in-out">
      <div className="max-w-[1280px] mx-auto px-5 md:px-16 flex justify-between items-center h-20">
        <Link href="/" className="font-headline-md text-2xl tracking-tighter text-primary">
          PANEL
        </Link>
        <div className="hidden md:flex gap-10 items-center">
          <Link
            href="/products"
            className="font-label-md text-sm uppercase tracking-widest text-primary hover:border-b-2 hover:border-primary pb-1 transition-all duration-300"
          >
            Produits
          </Link>
          <Link
            href="/about"
            className="font-label-md text-sm uppercase tracking-widest text-secondary hover:text-primary transition-colors duration-300"
          >
            Notre Histoire
          </Link>
          <Link
            href="/contact"
            className="font-label-md text-sm uppercase tracking-widest text-secondary hover:text-primary transition-colors duration-300"
          >
            Contact
          </Link>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/cart" className="relative hover:opacity-70 transition-opacity duration-300 text-primary">
            <ShoppingCart className="w-6 h-6" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-on-primary text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </Link>
          {isAdmin && (
            <button 
              onClick={() => router.push('/admin')}
              className="relative hover:opacity-70 transition-opacity duration-300 text-primary cursor-pointer"
              aria-label="Admin dashboard"
            >
              <User className="w-6 h-6" />
              <span className="sr-only">Admin</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
