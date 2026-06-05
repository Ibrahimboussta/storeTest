'use client';

import { useShopStore } from '@/store/useShopStore';
import Link from 'next/link';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useShopStore();

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = 0;
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <main className="pt-32 pb-20 px-5 md:px-16 min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto">
          <div className="w-24 h-24 bg-surface-container-low rounded-full flex items-center justify-center text-primary/20 mx-auto mb-8">
            <ShoppingBag className="w-12 h-12" />
          </div>
          <h1 className="font-display-lg-mobile text-3xl mb-4">Votre panier est vide</h1>
          <p className="font-body-lg text-on-surface-variant mb-12">
            Il semble que vous n'ayez pas encore ajouté de délicieuses sauces à votre panier.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-3 bg-primary text-on-primary px-10 py-4 rounded-full font-label-md text-sm uppercase tracking-widest hover:bg-primary-container transition-all shadow-xl"
          >
            Découvrir la collection
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-32 pb-20 px-5 md:px-16 min-h-screen">
      <div className="max-w-[1280px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <span className="font-label-md text-sm text-primary tracking-widest uppercase mb-2 block">
              Panier
            </span>
            <h1 className="font-display-lg-mobile md:font-display-lg text-4xl md:text-6xl text-on-surface">
              Votre Sélection
            </h1>
          </div>
          <Link 
            href="/products" 
            className="text-on-surface-variant hover:text-primary transition-colors font-label-md text-sm uppercase tracking-widest flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Continuer mes achats
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-8">
            <AnimatePresence initial={false}>
              {cart.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  className="flex flex-col sm:flex-row gap-8 p-6 bg-white rounded-2xl border border-outline/5 shadow-[0_20px_40px_rgba(112,90,76,0.02)] relative group"
                >
                  <div className="w-full sm:w-40 aspect-square rounded-xl overflow-hidden bg-surface-container relative">
                    <img alt={item.name} className="absolute inset-0 w-full h-full object-cover" src={item.image_url} />
                  </div>
                  <div className="flex-grow flex flex-col justify-between py-2">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <Link href={`/products/${item.slug}`}>
                          <h3 className="font-headline-md text-2xl font-semibold hover:text-primary transition-colors">
                            {item.name}
                          </h3>
                        </Link>
                        <p className="font-headline-md text-xl text-primary font-semibold">
                          {(item.price * item.quantity).toFixed(2)} DH
                        </p>
                      </div>
                      <p className="font-body-md text-on-surface-variant line-clamp-1 mb-4">
                        {item.description}
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center bg-surface-container-low rounded-full p-1 border border-outline/5">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white hover:shadow-sm transition-all"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-10 text-center font-headline-md text-sm">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white hover:shadow-sm transition-all"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="p-3 text-on-surface-variant/40 hover:text-error transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-[2rem] p-10 border border-outline/5 shadow-[0_40px_80px_rgba(112,90,76,0.06)] sticky top-32">
              <h2 className="font-headline-lg text-2xl font-semibold mb-8">Récapitulatif</h2>
              <div className="space-y-6 mb-8">
                <div className="flex justify-between text-on-surface-variant font-body-lg">
                  <span>Sous-total</span>
                  <span className="font-semibold text-on-surface">{subtotal.toFixed(2)} DH</span>
                </div>
                <div className="flex justify-between text-on-surface-variant font-body-lg">
                  <span>Frais de livraison</span>
                  <span className="font-bold text-primary">
                    Gratuit (Maroc)
                  </span>
                </div>
                <div className="pt-6 border-t border-outline/10 flex justify-between items-end">
                  <span className="font-label-md text-sm uppercase tracking-widest">Total</span>
                  <span className="font-display-lg-mobile text-3xl text-primary leading-none">{total.toFixed(2)} DH</span>
                </div>
              </div>
              <Link
                href="/checkout"
                className="w-full h-16 bg-primary text-on-primary rounded-full font-label-md uppercase tracking-widest text-sm flex items-center justify-center gap-3 hover:bg-primary-container transition-all shadow-xl shadow-primary/10"
              >
                Passer la commande
                <ArrowRight className="w-4 h-4" />
              </Link>
              <div className="mt-8 flex flex-col items-center gap-4 text-on-surface-variant/60">
                <div className="flex gap-4">
                  <img src="https://img.icons8.com/color/48/visa.png" alt="Visa" className="h-6 opacity-50 grayscale hover:grayscale-0 transition-all cursor-pointer" />
                  <img src="https://img.icons8.com/color/48/mastercard.png" alt="Mastercard" className="h-6 opacity-50 grayscale hover:grayscale-0 transition-all cursor-pointer" />
                  <img src="https://img.icons8.com/color/48/apple-pay.png" alt="Apple Pay" className="h-6 opacity-50 grayscale hover:grayscale-0 transition-all cursor-pointer" />
                </div>
                <p className="font-caption text-[10px] uppercase tracking-[0.2em]">Paiement 100% Sécurisé</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
