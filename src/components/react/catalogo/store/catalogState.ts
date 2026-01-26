import type { GroupedByCategory } from "../types";

export interface CatalogState {
  groupedData: GroupedByCategory;
  selectedProducts: GroupedByCategory;
  customSections: import("../types").CustomSection[];
  displayOrder: string[];
  showPrices: boolean;
  showCommingSoon: boolean;
  showWithoutStock: boolean;
  showOnlyPromotion: boolean;
  coverUrl: string | null;
  loading: boolean;
  editingSectionId: string | null;
}

export const initialCatalogState: CatalogState = {
  groupedData: {},
  selectedProducts: {},
  customSections: [],
  displayOrder: [],
  showPrices: true,
  showOnlyPromotion: false,
  showWithoutStock: false,
  showCommingSoon: false,
  coverUrl: null,
  loading: true,
  editingSectionId: null,
};
