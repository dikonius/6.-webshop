import { create } from 'zustand';

const useProductStore = create((set) => ({
  products: [],
  cart: [],

  setProducts: (pr) =>
    set((state) => ({
      products: Array.isArray(pr) ? pr : [],
    })),

  addToCart: (product) =>
    set((state) => {
      console.log("Adding product to cart:", product); // Debug log
      const existingItem = state.cart.find((item) => item.id === product.id);
      if (existingItem) {
        console.log("Updating existing item:", existingItem); // Debug log
        return {
          cart: state.cart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      console.log("Adding new item to cart"); // Debug log
      return {
        cart: [...state.cart, { ...product, quantity: 1 }],
      };
    }),

  removeFromCart: (productId) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== productId),
    })),

  updateCartQuantity: (productId, quantity) =>
    set((state) => {
      if (quantity <= 0) {
        return {
          cart: state.cart.filter((item) => item.id !== productId),
        };
      }
      return {
        cart: state.cart.map((item) =>
          item.id === productId ? { ...item, quantity } : item
        ),
      };
    }),
}));

export { useProductStore };