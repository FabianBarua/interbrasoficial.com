import { create } from "zustand";
import { persist } from "zustand/middleware";
import { initialCatalogState, type CatalogState } from "./catalogState";
import { createCatalogActions, type CatalogActions } from "./catalogActions";

export const useCatalogStore = create<CatalogState & CatalogActions>()(
  persist(
    (set, get) => ({
      ...initialCatalogState,
      ...createCatalogActions(set, get),
    }),
    {
      name: "catalog-storage",
      partialize: (state) => ({
        customSections: state.customSections,
        displayOrder: state.displayOrder,
        showPrices: state.showPrices,
        showCommingSoon: state.showCommingSoon,
        showWithoutStock: state.showWithoutStock,
        showOnlyPromotion: state.showOnlyPromotion,
        // We don't persist groupedData or selectedProducts as they are derived/fetched
      }),
    }
  )
);
