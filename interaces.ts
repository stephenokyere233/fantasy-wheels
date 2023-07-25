export interface StoreState extends StoreAction {
  authenticatedUser: any | null;
  selectedCarData: any | null;
  selectedPartData: any | null;
  selectedBlogData: any | null;
  cartItems: CartItem[];
}

export interface StoreAction {
  setAuthenticatedUser: (
    authenticatedUser: StoreState["authenticatedUser"]
  ) => void;
  setSelectedCarData: (selectedCarData: StoreState["selectedCarData"]) => void;
  setSelectedPartData: (
    selectedPartData: StoreState["selectedPartData"]
  ) => void;
  setSelectedBlogData: (
    selectedBlogData: StoreState["selectedBlogData"]
  ) => void;
  setCartItems: (cartItems: StoreState["cartItems"]) => void;
  addToCart: any;
  removeFromCart: any;
}

export interface User {
  uid?: string;
  name: string;
  email: string;
  photoURL: string | null;
  createdAt: any;
}

export interface CartItem {
  brand: string;
  description: string;
  id: number;
  image: string;
  name: string;
  path: string;
  price: number;
  quantity: number;
  uid: string;
}
