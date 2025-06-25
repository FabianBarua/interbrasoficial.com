import type { GroupedByCategory } from "../types";

export interface CatalogState {
  groupedData: GroupedByCategory;
  selectedProducts: GroupedByCategory;
  showPrices: boolean;
  showOnlyPromotion: boolean;
  coverUrl: string | null;
  loading: boolean;
}

export const initialCatalogState: CatalogState = {
  groupedData: {},
  selectedProducts: {},
  showPrices: true,
  showOnlyPromotion: false,
  coverUrl: null,
  loading: true,
};
