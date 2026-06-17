import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { products } from '../data/mock';
import { showToast } from './useToastStore';

type Product = typeof products[0];

interface CartItem extends Product {
  quantity: number;
}

interface ShopState {
  cart: CartItem[];
  wishlist: Product[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  toggleWishlist: (product: Product) => void;
  clearCart: () => void;
}

export const useShopStore = create<ShopState>()(
  persist(
    (set) => ({
      cart: [],
      wishlist: [],
      addToCart: (product, quantity = 1) =>
        set((state) => {
          // Prevent adding sold-out products
          if ((product as any).is_sold_out) {
            // Use toast notification instead of alert
            try {
              showToast('Ce produit est en rupture de stock et ne peut pas être ajouté au panier.', 'error');
            } catch (e) {
              // fallback to alert if toast store isn't available
              // eslint-disable-next-line no-alert
              alert('Ce produit est en rupture de stock et ne peut pas être ajouté au panier.');
            }
            return { cart: state.cart };
          }

          const existingItem = state.cart.find((item) => item.id === product.id);
          if (existingItem) {
            return {
              cart: state.cart.map((item) =>
                item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
              ),
            };
          }
          return { cart: [...state.cart, { ...product, quantity }] };
        }),
      removeFromCart: (productId) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== productId),
        })),
      updateQuantity: (productId, quantity) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
          ),
        })),
      toggleWishlist: (product) =>
        set((state) => {
          const isWishlisted = state.wishlist.some((item) => item.id === product.id);
          if (isWishlisted) {
            return { wishlist: state.wishlist.filter((item) => item.id !== product.id) };
          }
          return { wishlist: [...state.wishlist, product] };
        }),
      clearCart: () => set({ cart: [] }),
    }),
    {
      name: 'panel-shop-storage',
    }
  )
);
