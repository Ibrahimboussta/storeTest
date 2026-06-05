'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, Heart } from 'lucide-react';
import { useShopStore } from '@/store/useShopStore';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: {
    id: string;
    slug: string;
    name: string;
    price: number;
    description: string;
    image_url: string;
    badge?: string;
    old_price?: number | null;
    is_sold_out?: boolean;
  };
  layout?: 'home' | 'products';
}

export function ProductCard({ product, layout = 'products' }: ProductCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const addToCart = useShopStore((state) => state.addToCart);
  const toggleWishlist = useShopStore((state) => state.toggleWishlist);
  const wishlist = useShopStore((state) => state.wishlist);
  
  const isWishlisted = wishlist.some(item => item.id === product.id);

  if (layout === 'home') {
    return (
      <motion.div 
        whileHover={{ y: -8 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="bg-surface-container-lowest p-6 rounded-xl shadow-[0_40px_80px_rgba(112,90,76,0.05)] group cursor-pointer border border-outline/5 h-full flex flex-col"
      >
        <Link href={`/products/${product.slug}`} className="flex-grow flex flex-col">
          <div className="aspect-square mb-8 overflow-hidden rounded-lg bg-surface-container relative">
            {!imageLoaded && (
              <div className="absolute inset-0 bg-surface-container animate-pulse flex items-center justify-center z-10">
                <div className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
              </div>
            )}
            <motion.img
              initial={{ opacity: 0 }}
              animate={{ opacity: imageLoaded ? 1 : 0 }}
              onLoad={() => setImageLoaded(true)}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.6 }}
              alt={product.name}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover"
              src={product.image_url}
            />
          </div>
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="font-headline-md text-xl font-semibold mb-1 group-hover:text-primary transition-colors">{product.name}</h3>
              <p className="text-on-surface-variant font-caption text-xs uppercase tracking-widest opacity-60">{product.badge}</p>
            </div>
            <div className="text-right">
              <span className="text-primary font-headline-md text-xl font-semibold block">{product.price.toFixed(2)} DH</span>
              {product.old_price && (
                <span className="text-on-surface-variant line-through text-xs opacity-40">{product.old_price.toFixed(2)} DH</span>
              )}
            </div>
          </div>
        </Link>
        <motion.button 
          whileTap={product.is_sold_out ? {} : { scale: 0.95 }}
          onClick={() => !product.is_sold_out && addToCart(product as any)}
          disabled={product.is_sold_out}
          className={`mt-auto w-full border border-outline py-3 rounded-full font-label-md text-sm uppercase tracking-widest transition-all shadow-sm ${
            product.is_sold_out 
            ? 'bg-surface-container text-on-surface-variant opacity-50 cursor-not-allowed' 
            : 'group-hover:bg-primary group-hover:text-on-primary group-hover:border-primary'
          }`}
        >
          {product.is_sold_out ? 'Rupture de Stock' : 'Ajouter au panier'}
        </motion.button>
      </motion.div>
    );
  }

  // Products layout
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group flex flex-col h-full"
    >
      <div className="relative aspect-[4/5] bg-white rounded-xl overflow-hidden shadow-[0_4px_40px_rgba(112,90,76,0.04)] mb-6">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-surface-container animate-pulse flex items-center justify-center z-10">
            <div className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
          </div>
        )}
        <Link href={`/products/${product.slug}`}>
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: imageLoaded ? 1 : 0 }}
            onLoad={() => setImageLoaded(true)}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.8 }}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover"
            src={product.image_url}
          />
        </Link>
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => toggleWishlist(product as any)}
          className={`absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center transition-colors shadow-sm ${
            isWishlisted ? 'text-primary' : 'text-secondary hover:text-primary'
          }`}
        >
          <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
        </motion.button>
        {product.badge && (
          <div className="absolute bottom-4 left-4">
            <span className="bg-primary/90 backdrop-blur-sm text-on-primary px-4 py-1 rounded-full text-[10px] font-label-md uppercase tracking-[0.2em]">
              {product.badge}
            </span>
          </div>
        )}
        {product.is_sold_out && (
          <div className="absolute inset-0 bg-surface/40 backdrop-blur-[2px] flex items-center justify-center">
            <span className="bg-error/90 text-white px-6 py-2 rounded-full text-xs font-label-md uppercase tracking-[0.2em] shadow-xl">
              Rupture de Stock
            </span>
          </div>
        )}
      </div>
      <div className="flex justify-between items-start mb-2">
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-headline-md text-2xl font-semibold text-on-surface hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="text-right">
          <span className="font-headline-md text-2xl font-semibold text-primary block">{product.price.toFixed(2)} DH</span>
          {product.old_price && (
            <span className="text-on-surface-variant line-through text-sm opacity-40">{product.old_price.toFixed(2)} DH</span>
          )}
        </div>
      </div>
      <p className="font-body-md text-on-surface-variant mb-6 line-clamp-2 flex-grow">
        {product.description}
      </p>
      <motion.button 
        whileHover={product.is_sold_out ? {} : { scale: 1.02 }}
        whileTap={product.is_sold_out ? {} : { scale: 0.98 }}
        onClick={() => !product.is_sold_out && addToCart(product as any)}
        disabled={product.is_sold_out}
        className={`w-full py-4 font-label-md uppercase tracking-widest rounded-lg transition-all duration-300 flex items-center justify-center gap-3 shadow-sm ${
          product.is_sold_out 
          ? 'bg-surface-container text-on-surface-variant opacity-50 cursor-not-allowed' 
          : 'bg-secondary text-on-secondary hover:bg-primary hover:shadow-lg hover:shadow-primary/20'
        }`}
      >
        {!product.is_sold_out && <ShoppingCart className="w-5 h-5" />}
        {product.is_sold_out ? 'Rupture de Stock' : 'Ajouter au panier'}
      </motion.button>
    </motion.div>
  );
}
