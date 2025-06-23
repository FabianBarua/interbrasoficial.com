import type { GroupedByCategory } from "../types";

export interface CatalogState {
  groupedData: GroupedByCategory;
  selectedProducts: GroupedByCategory;
  showPrices: boolean;
  coverUrl: string | null;
  loading: boolean;
}

export const initialCatalogState: CatalogState = {
  groupedData: {},
  selectedProducts: {},
  showPrices: true,
  coverUrl: null,
  loading: true,
};
