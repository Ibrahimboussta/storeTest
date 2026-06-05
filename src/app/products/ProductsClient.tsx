'use client';

import { useState } from 'react';
import { ProductCard } from '@/components/features/ProductCard';
import { Filter, Search, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProductsClient({ initialProducts, categories }: { initialProducts: any[], categories: any[] }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');

  const filteredProducts = initialProducts.filter((product) => {
    const matchesCategory = selectedCategory === 'all' || product.category_id === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         (product.description || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    return 0;
  });

  return (
    <main className="pt-32 pb-20 px-5 md:px-16 min-h-screen">
      <div className="max-w-[1280px] mx-auto">
        <div className="mb-16">
          <span className="font-label-md text-sm text-primary tracking-widest uppercase mb-4 block">
            Boutique
          </span>
          <h1 className="font-display-lg-mobile md:font-display-lg text-4xl md:text-6xl text-on-surface mb-6">
            La Collection <span className="text-primary">Panel</span>
          </h1>
          <p className="font-body-lg text-lg text-on-surface-variant max-w-2xl">
            Explorez notre gamme de sauces gastronomiques, conçues avec les meilleurs ingrédients pour sublimer vos créations culinaires.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 mb-12 items-start lg:items-center justify-between">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-6 py-2 rounded-full font-label-md text-sm uppercase tracking-wider transition-all border ${
                selectedCategory === 'all' 
                ? 'bg-secondary text-on-secondary border-secondary' 
                : 'bg-white text-on-surface-variant border-outline/10 hover:border-secondary/30'
              }`}
            >
              Tous
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-6 py-2 rounded-full font-label-md text-sm uppercase tracking-wider transition-all border ${
                  selectedCategory === cat.id 
                  ? 'bg-secondary text-on-secondary border-secondary' 
                  : 'bg-white text-on-surface-variant border-outline/10 hover:border-secondary/30'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            <div className="relative group flex-grow sm:flex-grow-0">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant/50 group-focus-within:text-primary transition-colors" />
              <input
                type="text"
                placeholder="Rechercher..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-11 pr-6 py-3 bg-white border border-outline/10 rounded-full font-body-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all w-full sm:w-64"
              />
            </div>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none pl-6 pr-12 py-3 bg-white border border-outline/10 rounded-full font-label-md text-sm uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer w-full"
              >
                <option value="featured">En vedette</option>
                <option value="price-low">Prix croissant</option>
                <option value="price-high">Prix décroissant</option>
              </select>
              <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant/50 pointer-events-none" />
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12"
          >
            {sortedProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  );
}
