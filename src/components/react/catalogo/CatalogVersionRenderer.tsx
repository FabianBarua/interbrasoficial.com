import { useMemo, useCallback } from "react";
import { CategorySection as CategorySectionV1 } from "./V1/CategorySection";
import { CategorySection as CategorySectionV2_2 } from "./V2_2/CategorySection";
import { useCatalogStore } from "./store/useCatalogStore";
import { useVersionManager } from "./hooks/useVersionManager";
import { ALL_VERSIONS } from "./store/useVersionStore";

interface CatalogVersionRendererProps {
  tCat: (key: string) => any;
}

export const CatalogVersionRenderer = ({ tCat }: CatalogVersionRendererProps) => {
  const { currentVersion } = useVersionManager();
  const { selectedProducts, showPrices, toggleProduct } = useCatalogStore();

  // Memoizar la función de toggle
  const memoizedToggleProduct = useCallback((category: string, code: string) => {
    toggleProduct(category, code);
  }, [toggleProduct]);

  // Renderizado simple y directo basado en la versión
  const renderCurrentVersion = useMemo(() => {
    const entries = Object.entries(selectedProducts);
    
    if (currentVersion.id === ALL_VERSIONS.V1.id) {
      return (
        <>
          {entries.map(([key, cat]) => (
            <div key={key}>
              <CategorySectionV1
                categoryKey={key}
                categoryName={cat.categoryName}
                categoryDescription={cat.categoryDescription}
                products={cat.products}
                t_catalog={tCat}
                showPrices={showPrices}
                onToggle={(code) => memoizedToggleProduct(key, code)}
              />
              <div className="flex justify-center items-center my-1" data-hide={true}>
                <button className="h-12 w-full bg-[#f2f2f2] hover:bg-[#e0e0e0] active:bg-[#c9c9c9] border flex items-center justify-center transition-colors">
                  <span className="text-[#979797] text-2xl">+</span>
                </button>
              </div>
            </div>
          ))}
        </>
      );
    }

    // V2 (antes V2_2)
    return (
      <>
        {entries.map(([key, cat]) => (
          <CategorySectionV2_2
            key={key}
            categoryKey={key}
            categoryName={cat.categoryName}
            categoryDescription={cat.categoryDescription}
            products={cat.products}
            t_catalog={tCat}
            showPrices={showPrices}
            onToggle={(code) => memoizedToggleProduct(key, code)}
          />
        ))}
      </>
    );
  }, [currentVersion.id, selectedProducts, showPrices, tCat, memoizedToggleProduct]);

  return (
    <div className="transition-all duration-300 ease-in-out">
      {renderCurrentVersion}
    </div>
  );
};
