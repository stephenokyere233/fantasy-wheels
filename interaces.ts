export interface StoreState extends StoreAction {
  authenticatedUser: any | null;
  selectedCarData: any | null;
  selectedPartData: any | null;
  selectedBlogData: any | null;
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
}

export interface User {
  uid?: string;
  name: string;
  email: string;
  photoURL: string | null;
  createdAt: any;
}
