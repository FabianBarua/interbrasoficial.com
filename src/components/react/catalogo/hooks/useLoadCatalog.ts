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
  } = useCatalogStore();

  const t = (k: string) => getValueFromKey(k, getI18NProducts({ currentLocale }));
  const tCat = (k: string) => getValueFromKey(k, getI18NCatalog({ currentLocale }));

  useEffect(() => {
    (async () => {
      const res = await fetch("http://localhost:3000/api/catalog/latest?&show_hidden=true");
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
