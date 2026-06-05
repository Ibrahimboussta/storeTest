'use client';

import { ChevronLeft, Plus, Minus, ShoppingCart, Heart, Share2, Info } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useShopStore } from '@/store/useShopStore';

export default function ProductDetailsClient({ product }: { product: any }) {
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const addToCart = useShopStore((state) => state.addToCart);

  const images = product.images && product.images.length > 0 
    ? product.images 
    : [product.image_url];

  const handleAddToCart = () => {
    addToCart(product, quantity);
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
            <div className="aspect-square bg-white rounded-[2rem] overflow-hidden shadow-[0_40px_80px_rgba(112,90,76,0.06)] border border-outline/5 relative">
              <motion.img
                key={activeImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                alt={product.name}
                className="w-full h-full object-cover"
                src={images[activeImage] || ''}
              />
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                {images.map((img: string, i: number) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
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
              <p className="font-body-lg text-lg text-on-surface-variant leading-relaxed">
                {product.description}
              </p>
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

            <div className="space-y-6 mt-auto">
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
                  className={`flex-grow h-14 rounded-full font-label-md uppercase tracking-widest text-sm flex items-center justify-center gap-3 transition-all ${
                    product.is_sold_out 
                    ? 'bg-surface-container text-on-surface-variant cursor-not-allowed shadow-none' 
                    : 'bg-primary text-on-primary hover:bg-primary-container shadow-xl shadow-primary/10'
                  }`}
                >
                  {product.is_sold_out ? (
                    'Indisponible'
                  ) : (
                    <>
                      <ShoppingCart className="w-5 h-5" />
                      Ajouter au panier
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="mt-16 border-t border-outline/10 pt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                  <h4 className="font-label-md text-sm uppercase tracking-widest mb-6">Ingrédients</h4>
                  <ul className="space-y-3">
                    {product.ingredients?.map((ing: string, i: number) => (
                      <li key={i} className="font-body-md text-on-surface-variant flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary/30" />
                        {ing}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
