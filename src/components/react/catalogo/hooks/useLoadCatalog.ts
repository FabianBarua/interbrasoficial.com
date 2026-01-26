import { useEffect } from "react";
import { getI18NProducts, getI18NCatalog, getValueFromKey } from "@/i18n";
import type { GroupedByCategory, ProductData } from "../types";
import { useCatalogStore } from "../store/useCatalogStore";

export const useLoadCatalog = (currentLocale: string) => {
  const {
    setGroupedData,
    setSelectedProducts,
    setCoverUrl,
    setLoading,
    setCustomSections,
    setDisplayOrder,
    customSections,
    displayOrder,
  } = useCatalogStore();

  const t = (k: string) => getValueFromKey(k, getI18NProducts({ currentLocale }));
  const tCat = (k: string) => getValueFromKey(k, getI18NCatalog({ currentLocale }));

  useEffect(() => {
    (async () => {
      // We rely on zustand-persist to load customSections and displayOrder.

      const res = await fetch("https://interbras-dashboard.vercel.app/api/catalog/latest?&show_hidden=true");
      const json: GroupedByCategory = await res.json();

      for (const cat of Object.values(json)) {
        cat.categoryName = t(cat.categoryName);
        cat.categoryDescription = t(cat.categoryDescription);
        cat.categoryShortDescription = t(cat.categoryShortDescription);
        cat.products.forEach((p: ProductData) => {
          p.color = t(p.color);
          p.originalName = t(p.originalName);
          p.info.review = t(p.info.review);
          p.info.specs = t(p.info.specs);
          p.showInCatalog = true; // Ensure showInCatalog is true
          p.info.included = p.info.included ? t(p.info.included) : null;
        });
      }

      setGroupedData(json);
      setSelectedProducts(json);

      // Reconcile display order: persisted order + new keys
      const allKeys = new Set([
        ...customSections.map(s => s.id),
        ...Object.keys(json)
      ]);

      let initialOrder: string[] = [...displayOrder];

      // If store was empty or invalid, or we have new keys, we merge
      // Filter to only include keys that currently exist (cleanup old keys)
      initialOrder = initialOrder.filter((k) => allKeys.has(k));

      // Add any new keys that might be missing from the saved order
      const existingSet = new Set(initialOrder);
      const newKeys = [...allKeys].filter(k => !existingSet.has(k));
      initialOrder = [...initialOrder, ...newKeys];

      // If we ended up empty (first run), default to natural order
      if (initialOrder.length === 0) {
        initialOrder = [
          ...customSections.map(s => s.id),
          ...Object.keys(json)
        ];
      }

      setDisplayOrder(initialOrder);

      setLoading(false);
    })();
  }, [currentLocale]);

  useEffect(() => {
    const handler = (e: Event) => {
      const { coverDataUrl } = (e as CustomEvent).detail;
      setCoverUrl(coverDataUrl);
    };
    window.addEventListener("coverDataUrlUpdated", handler);
    return () => window.removeEventListener("coverDataUrlUpdated", handler);
  }, []);

  return { t, tCat };
};
