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
}));
