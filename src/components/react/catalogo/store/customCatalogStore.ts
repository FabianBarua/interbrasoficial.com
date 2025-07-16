import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { GroupedByCategory, ProductData } from "../types";

interface CustomCategory extends GroupedByCategory[string] {
  hidden?: boolean;
}

interface CustomCatalogState {
  customSections: Record<string, CustomCategory>;
}

interface CustomCatalogActions {
  addSection: (key: string, data: CustomCategory) => void;
  updateSection: (key: string, data: CustomCategory) => void;
  removeSection: (key: string) => void;
  toggleProduct: (category: string, code: string) => void;
  toggleVisibility: (category: string) => void;
}

export const useCustomCatalogStore = create<CustomCatalogState & CustomCatalogActions>(
  persist(
    (set, get) => ({
      customSections: {},
      addSection: (key, data) =>
        set({ customSections: { ...get().customSections, [key]: data } }),
      updateSection: (key, data) =>
        set({ customSections: { ...get().customSections, [key]: data } }),
      removeSection: (key) => {
        const next = { ...get().customSections };
        delete next[key];
        set({ customSections: next });
      },
      toggleProduct: (category, code) => {
        const next = { ...get().customSections };
        const product = next[category]?.products.find((p: ProductData) => p.code === code);
        if (product) product.show = !product.show;
        set({ customSections: next });
      },
      toggleVisibility: (category) => {
        const next = { ...get().customSections };
        if (next[category]) {
          next[category].hidden = !next[category].hidden;
          set({ customSections: next });
        }
      },
    }),
    { name: "custom-catalog" }
  )
);
