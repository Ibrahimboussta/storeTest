'use client';

import { ChevronLeft, Plus, Minus, ShoppingCart, Info, Zap, CheckCircle2, X, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useShopStore } from '@/store/useShopStore';
import { createOrder } from '@/lib/supabase/actions';

export default function ProductDetailsClient({ product }: { product: any }) {
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const addToCart = useShopStore((state) => state.addToCart);
  
  const [isOrdering, setIsOrdering] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderError, setOrderError] = useState<string | null>(null);

  const images = product.images && product.images.length > 0 
    ? product.images 
    : [product.image_url];

  const handleThumbnailClick = (index: number) => {
    setActiveImage(index);
    if (scrollRef.current) {
      const width = scrollRef.current.clientWidth;
      scrollRef.current.scrollTo({ left: width * index, behavior: 'smooth' });
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleQuickOrder = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsOrdering(true);
    setOrderError(null);

    const formData = new FormData(e.currentTarget);
    const shippingAddress = {
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      phone: formData.get('phone') as string,
      city: formData.get('city') as string,
      address: formData.get('address') as string,
    };

    const cartItems = [{ ...product, quantity, price: product.price }];
    const total = product.price * quantity;

    const result = await createOrder({ total, shippingAddress }, cartItems);

    setIsOrdering(false);
    if (result.error) {
      setOrderError(result.error);
    } else {
      setOrderSuccess(true);
    }
  };

  return (
    <main className="pt-32 pb-20 px-5 md:px-16 min-h-screen">
      <div className="max-w-[1280px] mx-auto">
        <Link 
          href="/products" 
          className="inline-flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors font-label-md text-sm uppercase tracking-widest mb-12"
        >
          <ChevronLeft className="w-4 h-4" />
          Retour à la boutique
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="aspect-square bg-white rounded-[2rem] overflow-hidden shadow-[0_40px_80px_rgba(112,90,76,0.06)] border border-outline/5 relative group">
              <div 
                ref={scrollRef}
                className="w-full h-full flex overflow-x-auto snap-x snap-mandatory scrollbar-hide [&::-webkit-scrollbar]:hidden"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                onScroll={(e) => {
                  const target = e.target as HTMLDivElement;
                  const index = Math.round(target.scrollLeft / target.clientWidth);
                  setActiveImage(index);
                }}
              >
                {images.map((img: string, i: number) => (
                  <img
                    key={i}
                    src={img}
                    alt={`${product.name} - Vue ${i + 1}`}
                    className="w-full h-full object-cover flex-shrink-0 snap-center"
                  />
                ))}
              </div>
              
              {/* Pagination dots for mobile */}
              {images.length > 1 && (
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 md:hidden">
                  {images.map((_: any, i: number) => (
                    <div 
                      key={i} 
                      className={`h-1.5 rounded-full transition-all ${activeImage === i ? 'w-4 bg-primary' : 'w-1.5 bg-on-surface-variant/30'}`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Thumbnails (Desktop only) */}
            {images.length > 1 && (
              <div className="hidden md:flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                {images.map((img: string, i: number) => (
                  <button
                    key={i}
                    onClick={() => handleThumbnailClick(i)}
                    className={`w-24 h-24 rounded-2xl overflow-hidden border-2 transition-all shrink-0 ${
                      activeImage === i ? 'border-primary' : 'border-transparent opacity-60'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col"
          >
            <div className="mb-8">
              <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-label-md uppercase tracking-wider mb-6 inline-block">
                {product.badge || 'Premium'}
              </span>
              {product.is_sold_out && (
                <span className="bg-error/10 text-error px-4 py-1.5 rounded-full text-xs font-label-md uppercase tracking-wider mb-6 inline-block ml-3">
                  Rupture de Stock
                </span>
              )}
              <h1 className="font-display-lg text-4xl md:text-5xl lg:text-6xl text-on-surface mb-6 leading-tight">
                {product.name}
              </h1>
              <div className="flex items-baseline gap-4 mb-8">
                <p className="font-headline-md text-4xl text-primary font-semibold">
                  {Number(product.price).toFixed(2)} DH
                </p>
                {product.old_price && (
                  <p className="font-headline-md text-2xl text-on-surface-variant line-through opacity-40">
                    {Number(product.old_price).toFixed(2)} DH
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-6 mb-12">
              <div className="flex items-center gap-6">
                <div className={`flex items-center bg-white border border-outline/10 rounded-full p-1 h-14 ${product.is_sold_out ? 'opacity-30 pointer-events-none' : ''}`}>
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={product.is_sold_out}
                    className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-surface-container transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-headline-md text-lg">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    disabled={product.is_sold_out}
                    className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-surface-container transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <button 
                  onClick={handleAddToCart}
                  disabled={product.is_sold_out}
                  className={`flex-1 h-14 rounded-full font-label-md uppercase tracking-widest text-[11px] md:text-sm flex items-center justify-center gap-2 transition-all border border-outline/10 ${
                    product.is_sold_out 
                    ? 'bg-surface-container text-on-surface-variant cursor-not-allowed shadow-none border-transparent' 
                    : 'bg-white text-on-surface hover:bg-surface-container-low hover:border-primary/20'
                  }`}
                >
                  {product.is_sold_out ? (
                    'Indisponible'
                  ) : (
                    <>
                      <ShoppingCart className="w-4 h-4 md:w-5 md:h-5" />
                      Ajouter au panier
                    </>
                  )}
                </button>
              </div>

              {/* Quick Order Panel */}
              <div className="bg-surface-container-low p-6 md:p-8 rounded-[2rem] border border-outline/10 relative">
                {orderSuccess ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="font-headline-md text-xl font-bold mb-2 text-green-800">Commande Confirmée !</h3>
                    <p className="font-body-md text-on-surface-variant mb-6">Merci pour votre commande. Notre équipe vous contactera très prochainement.</p>
                    <button 
                      onClick={() => setOrderSuccess(false)}
                      className="bg-white px-6 py-3 rounded-full font-label-md text-sm uppercase tracking-widest border border-outline/10 hover:bg-surface-container transition-all"
                    >
                      Nouvelle commande
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleQuickOrder} className="space-y-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-headline-md font-semibold text-lg flex items-center gap-2">
                        <Zap className="w-5 h-5 text-primary" /> Commander directement
                      </h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input required name="firstName" placeholder="Prénom" className="w-full h-12 px-4 rounded-xl bg-white border border-outline/10 focus:outline-none focus:border-primary transition-all font-body-md" />
                      <input required name="lastName" placeholder="Nom" className="w-full h-12 px-4 rounded-xl bg-white border border-outline/10 focus:outline-none focus:border-primary transition-all font-body-md" />
                    </div>
                    <input required name="phone" type="tel" pattern="[0-9]{10}" maxLength={10} title="Veuillez entrer un numéro à 10 chiffres exacts" placeholder="Téléphone (10 chiffres)" className="w-full h-12 px-4 rounded-xl bg-white border border-outline/10 focus:outline-none focus:border-primary transition-all font-body-md" />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <input required name="city" placeholder="Ville" className="w-full h-12 px-4 rounded-xl bg-white border border-outline/10 focus:outline-none focus:border-primary transition-all font-body-md md:col-span-1" />
                      <input required name="address" placeholder="Adresse complète" className="w-full h-12 px-4 rounded-xl bg-white border border-outline/10 focus:outline-none focus:border-primary transition-all font-body-md md:col-span-2" />
                    </div>
                    
                    {orderError && (
                      <p className="text-error text-xs font-label-md bg-error/5 p-3 rounded-lg border border-error/10 text-center">
                        {orderError}
                      </p>
                    )}

                    <button 
                      type="submit"
                      disabled={isOrdering || product.is_sold_out}
                      className={`w-full h-14 rounded-xl font-label-md uppercase tracking-widest text-sm flex items-center justify-center gap-3 transition-all mt-2 ${
                        product.is_sold_out 
                        ? 'bg-surface-container text-on-surface-variant cursor-not-allowed shadow-none' 
                        : 'bg-primary text-on-primary hover:bg-primary-container shadow-lg shadow-primary/10'
                      }`}
                    >
                      {isOrdering ? <Loader2 className="w-5 h-5 animate-spin" /> : `Confirmer la commande (${(product.price * quantity).toFixed(2)} DH)`}
                    </button>
                    
                    <p className="text-center text-[10px] md:text-xs font-label-md text-on-surface-variant mt-4 flex items-center justify-center gap-2">
                      <CheckCircle2 className="w-3 h-3 text-green-500" /> Expédition rapide entre 24h et 48h max
                    </p>
                  </form>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8 mb-12 p-8 bg-surface-container-low rounded-2xl border border-outline/5">
              <div>
                <h4 className="font-label-md text-xs uppercase tracking-widest text-primary mb-4">Profil Aromatique</h4>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Info className="w-5 h-5" />
                  </div>
                  <span className="font-headline-md text-lg font-semibold">{product.flavor_profile || 'Équilibré'}</span>
                </div>
              </div>
              <div>
                <h4 className="font-label-md text-xs uppercase tracking-widest text-primary mb-4">Conservation</h4>
                <p className="font-body-md text-on-surface-variant text-sm">6 mois après ouverture.</p>
              </div>
            </div>

            <div className="mb-12">
              <h3 className="font-headline-md text-2xl font-bold mb-6">Description du produit</h3>
              <div 
                className="font-body-lg text-lg text-on-surface-variant leading-relaxed prose prose-stone max-w-none prose-img:max-w-full prose-img:h-auto prose-img:mx-auto prose-img:rounded-2xl prose-img:shadow-md prose-p:mb-4 prose-headings:font-headline-md prose-headings:font-bold prose-a:text-primary break-words overflow-hidden [&_*]:!bg-transparent [&_*]:!whitespace-normal [&_span]:!text-base [&_p]:!text-base [&_span]:!font-sans [&_p]:!font-sans [&_*]:!text-on-surface-variant [&_h1]:!text-3xl [&_h2]:!text-2xl [&_h3]:!text-xl [&_img]:!my-8"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            </div>

           
          </motion.div>
        </div>
      </div>
    </main>
  );
}
