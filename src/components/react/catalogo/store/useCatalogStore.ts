import { create } from "zustand";
import { initialCatalogState, type CatalogState } from "./catalogState";
import { createCatalogActions, type CatalogActions } from "./catalogActions";

export const useCatalogStore = create<CatalogState & CatalogActions>((set, get) => ({
  ...initialCatalogState,
  ...createCatalogActions(set, get),
}));
