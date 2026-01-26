import type { GroupedByCategory } from "../types";

export interface CatalogActions {
  setGroupedData: (data: GroupedByCategory) => void;
  setSelectedProducts: (data: GroupedByCategory) => void;
  setDisplayOrder: (order: string[]) => void;
  toggleProduct: (category: string, code: string) => void;
  setCoverUrl: (url: string | null) => void;
  setLoading: (b: boolean) => void;
  setShowPrices: (v: boolean) => void;
  setShowCommingSoon: (v: boolean) => void;
  setShowOnlyPromotion: (v: boolean) => void;
  setShowWithoutStock: (v: boolean) => void;
  reorderCategories: (newOrder: string[]) => void;
  // Custom Sections Actions
  addCustomSection: (section: import("../types").CustomSection) => void;
  updateCustomSection: (id: string, updates: Partial<import("../types").CustomSection>) => void;
  deleteCustomSection: (id: string) => void;
  // Initialize from storage or similar if needed, but we might just load it in component
  setCustomSections: (sections: import("../types").CustomSection[]) => void;
  setEditingSection: (id: string | null) => void;
}

export const createCatalogActions = (set: any, get: any): CatalogActions => ({
  setGroupedData: (data) => set({ groupedData: data }),
  setSelectedProducts: (data) => set({ selectedProducts: data }),
  setDisplayOrder: (order) => set({ displayOrder: order }),
  setCoverUrl: (url) => set({ coverUrl: url }),
  setLoading: (b) => set({ loading: b }),
  setShowCommingSoon: (v) => set({ showCommingSoon: v }),
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
    set({ displayOrder: newOrder });
    localStorage.setItem("categoryOrder", JSON.stringify(newOrder));
  },
  addCustomSection: (section) => {
    const { customSections, displayOrder } = get();
    const newSections = [...customSections, section];
    set({
      customSections: newSections,
      displayOrder: [section.id, ...displayOrder] // Add new section to top
    });
    localStorage.setItem("customSections", JSON.stringify(newSections));
  },
  updateCustomSection: (id, updates) => {
    const { customSections } = get();
    const newSections = customSections.map((s) => (s.id === id ? { ...s, ...updates } : s));
    set({ customSections: newSections });
    localStorage.setItem("customSections", JSON.stringify(newSections));
  },
  deleteCustomSection: (id) => {
    const { customSections, displayOrder } = get();
    const newSections = customSections.filter((s) => s.id !== id);
    set({
      customSections: newSections,
      displayOrder: displayOrder.filter(k => k !== id)
    });
    localStorage.setItem("customSections", JSON.stringify(newSections));
  },
  setCustomSections: (sections) => {
    set({ customSections: sections });
  },
  setEditingSection: (id) => set({ editingSectionId: id }),
});
