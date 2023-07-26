import { create } from "zustand";
import { StoreState } from "./interaces";

export const useStore = create<StoreState>((set) => ({
  authenticatedUser: null,
  setAuthenticatedUser: (authenticatedUser) =>
    set(() => ({ authenticatedUser: authenticatedUser })),
  selectedCarData: null,
  setSelectedCarData: (selectedCarData) =>
    set(() => ({ selectedCarData: selectedCarData })),
  selectedPartData: null,
  setSelectedPartData: (selectedPartData) =>
    set(() => ({ selectedPartData: selectedPartData })),
  selectedBlogData: null,
  setSelectedBlogData: (selectedBlogData) =>
    set(() => ({ selectedBlogData: selectedBlogData })),
  cartItems: [],
  setCartItems: (cartItems) => set(() => ({ cartItems: cartItems })),
  addToCart: (item: any) =>
    set((state) => {
      const existingItemIndex = state.cartItems.findIndex(
        (cartItem) => cartItem.id === item.id
      );

      if (existingItemIndex !== -1) {
        const updatedCartItems = [...state.cartItems];
        updatedCartItems[existingItemIndex].quantity = item.quantity;
        console.log("updatedCartItems", updatedCartItems);
        return { cartItems: updatedCartItems };
      } else {
        return { cartItems: [...state.cartItems, item] };
      }
    }),
  removeFromCart: (itemId: number) =>
    set((state) => ({
      cartItems: state.cartItems.filter((cartItem) => cartItem.id !== itemId),
    })),
  clearCart: () => set(() => ({ cartItems: [] })),
}));
