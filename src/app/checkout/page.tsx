'use client';

import { useShopStore } from '@/store/useShopStore';
import { useState } from 'react';
import { ChevronLeft, Truck, CheckCircle2, ArrowRight, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { createOrder } from '@/lib/supabase/actions';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const { cart, clearCart } = useShopStore();
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = 0;
  const total = subtotal + shipping;

  const handleCompleteOrder = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const shippingAddress = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      phone: formData.get('phone'),
      address: formData.get('address'),
      city: formData.get('city'),
    };

    const result = await createOrder({ total, shippingAddress }, cart);

    if (result.success) {
      setIsSuccess(true);
      clearCart();
    } else {
      // If it's a stock error, it will contain the names of sold out products
      alert(result.error);
    }
    setLoading(false);
  };

  if (isSuccess) {
    return (
      <main className="pt-32 pb-20 px-5 md:px-16 min-h-screen flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-xl mx-auto"
        >
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-8">
            <CheckCircle2 className="w-12 h-12" />
          </div>
          <h1 className="font-display-lg-mobile text-4xl mb-6">Merci pour votre confiance !</h1>
          <p className="font-body-lg text-on-surface-variant mb-4">
            Votre commande a été reçue avec succès. 
          </p>
          <div className="bg-primary/5 p-8 rounded-3xl mb-12 space-y-4">
            <p className="font-headline-md text-lg text-primary">
              📞 Notre équipe vous contactera par téléphone dans quelques instants pour confirmer votre commande.
            </p>
            <p className="font-body-md text-on-surface-variant">
              🚚 Livraison prévue à votre domicile entre 24h et 48h maximum.
            </p>
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-3 bg-primary text-on-primary px-10 py-4 rounded-full font-label-md text-sm uppercase tracking-widest hover:bg-primary-container transition-all shadow-xl"
          >
            Retour à l'accueil
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="pt-32 pb-20 px-5 md:px-16 min-h-screen bg-surface-container-lowest">
      <div className="max-w-[1280px] mx-auto">
        <div className="mb-12">
          <Link 
            href="/cart" 
            className="inline-flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors font-label-md text-sm uppercase tracking-widest mb-8"
          >
            <ChevronLeft className="w-4 h-4" />
            Retour au panier
          </Link>
          <h1 className="font-display-lg-mobile text-4xl text-on-surface">Finaliser la Commande</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-7">
            <form onSubmit={handleCompleteOrder} className="space-y-12">
              {/* Shipping Section */}
              <section className="bg-white p-10 rounded-[2rem] border border-outline/5 shadow-sm">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Truck className="w-5 h-5" />
                  </div>
                  <h2 className="font-headline-lg text-2xl font-semibold">Informations de Livraison</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="font-label-md text-xs uppercase tracking-widest text-on-surface-variant">Prénom</label>
                    <input required name="firstName" type="text" className="w-full h-14 px-6 rounded-xl bg-surface-container-low border border-outline/10 focus:outline-none focus:border-primary transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="font-label-md text-xs uppercase tracking-widest text-on-surface-variant">Nom</label>
                    <input required name="lastName" type="text" className="w-full h-14 px-6 rounded-xl bg-surface-container-low border border-outline/10 focus:outline-none focus:border-primary transition-all" />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="font-label-md text-xs uppercase tracking-widest text-on-surface-variant">Numéro de téléphone</label>
                    <input required name="phone" type="tel" pattern="[0-9]{10}" maxLength={10} title="Veuillez entrer un numéro à 10 chiffres exacts" className="w-full h-14 px-6 rounded-xl bg-surface-container-low border border-outline/10 focus:outline-none focus:border-primary transition-all" />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="font-label-md text-xs uppercase tracking-widest text-on-surface-variant">Adresse</label>
                    <input required name="address" type="text" className="w-full h-14 px-6 rounded-xl bg-surface-container-low border border-outline/10 focus:outline-none focus:border-primary transition-all" />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="font-label-md text-xs uppercase tracking-widest text-on-surface-variant">Ville</label>
                    <input required name="city" type="text" className="w-full h-14 px-6 rounded-xl bg-surface-container-low border border-outline/10 focus:outline-none focus:border-primary transition-all" />
                  </div>
                </div>
              </section>

              <button 
                disabled={loading}
                type="submit"
                className="w-full h-16 bg-primary text-on-primary rounded-full font-label-md uppercase tracking-widest text-sm flex items-center justify-center gap-3 hover:bg-primary-container transition-all shadow-xl shadow-primary/10 disabled:opacity-50"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Confirmer la commande'}
              </button>
            </form>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-white rounded-[2rem] p-10 border border-outline/5 shadow-sm sticky top-32">
              <h2 className="font-headline-lg text-2xl font-semibold mb-8">Votre Commande</h2>
              <div className="space-y-6 mb-8 max-h-[400px] overflow-y-auto pr-4 custom-scrollbar">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-20 h-20 rounded-lg overflow-hidden bg-surface-container shrink-0">
                      <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-headline-md text-base font-semibold leading-tight mb-1">{item.name}</h4>
                      <p className="text-sm text-on-surface-variant">Quantité: {item.quantity}</p>
                    </div>
                    <p className="font-headline-md text-base font-semibold">{(item.price * item.quantity).toFixed(2)} DH</p>
                  </div>
                ))}
              </div>
              <div className="space-y-4 pt-8 border-t border-outline/10">
                <div className="flex justify-between text-on-surface-variant">
                  <span>Sous-total</span>
                  <span>{subtotal.toFixed(2)} DH</span>
                </div>
                <div className="flex justify-between text-on-surface-variant">
                  <span>Livraison</span>
                  <span className="text-primary font-bold">Gratuite (Maroc)</span>
                </div>
                <div className="flex justify-between items-end pt-4">
                  <span className="font-label-md text-sm uppercase tracking-widest">Total à payer</span>
                  <span className="font-display-lg-mobile text-3xl text-primary leading-none">{total.toFixed(2)} DH</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
