import type { GroupedByCategory } from "../types";

export interface CatalogActions {
  setGroupedData: (data: GroupedByCategory) => void;
  setSelectedProducts: (data: GroupedByCategory) => void;
  toggleProduct: (category: string, code: string) => void;
  setCoverUrl: (url: string | null) => void;
  setLoading: (b: boolean) => void;
  setShowPrices: (v: boolean) => void;
  setShowOnlyPromotion: (v: boolean) => void;
  setShowWithoutStock: (v: boolean) => void;
  reorderCategories: (newOrder: string[]) => void;
}

export const createCatalogActions = (set: any, get: any): CatalogActions => ({
  setGroupedData: (data) => set({ groupedData: data }),
  setSelectedProducts: (data) => set({ selectedProducts: data }),
  setCoverUrl: (url) => set({ coverUrl: url }),
  setLoading: (b) => set({ loading: b }),
  setShowPrices: (v) => set({ showPrices: v }),
  setShowOnlyPromotion: (v) => set({ showOnlyPromotion: v }),
  setShowWithoutStock: (v) => set({ showWithoutStock: v }),
  toggleProduct: (category, code) => {
    const { groupedData, selectedProducts } = get();

    const toggleIn = (data: GroupedByCategory) => {
      const product = data[category]?.products.find(p => p.code === code);
      if (product) product.showInCatalog = !product.showInCatalog;
    };

    const newGrouped = structuredClone(groupedData);
    const newSelected = structuredClone(selectedProducts);

    toggleIn(newGrouped);
    toggleIn(newSelected);

    set({
      groupedData: newGrouped,
      selectedProducts: newSelected,
    });
  },
  reorderCategories: (newOrder) => {
    const { selectedProducts } = get();
    const reordered: GroupedByCategory = {};
    newOrder.forEach((key) => {
      if (selectedProducts[key]) {
        reordered[key] = selectedProducts[key];
      }
    });
    set({ selectedProducts: reordered });
  },
});
