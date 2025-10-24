import type { GroupedByCategory } from "../types";

export interface CatalogState {
  groupedData: GroupedByCategory;
  selectedProducts: GroupedByCategory;
  showPrices: boolean;
  showCommingSoon: boolean;
  showWithoutStock: boolean;
  showOnlyPromotion: boolean;
  coverUrl: string | null;
  loading: boolean;
}

export const initialCatalogState: CatalogState = {
  groupedData: {},
  selectedProducts: {},
  showPrices: true,
  showOnlyPromotion: false,
  showWithoutStock: false,
  showCommingSoon: false,
  coverUrl: null,
  loading: true,
};
