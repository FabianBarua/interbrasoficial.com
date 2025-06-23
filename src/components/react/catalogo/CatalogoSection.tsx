import { Filters } from "./Filters";
import { CoverSelector } from "./CoverSelector";
import { CategorySection } from "./CategorySection";
import { CoverImage } from "./CoverImage";
import { LoadingScreen } from "./LoadingScreen";
import { Card } from "@heroui/react";
import { ReorderModal } from "./ReorderModal";

import { useCatalogStore } from "./store/useCatalogStore";
import { useLoadCatalog } from "./hooks/useLoadCatalog";
import { useState } from "react";

export const CatalogoSection = ({ currentLocale }: { currentLocale: string }) => {
  const { selectedProducts, showPrices, coverUrl, loading, toggleProduct } = useCatalogStore();
  const { tCat } = useLoadCatalog(currentLocale);
  const [showModal, setShowModal] = useState(false);

  if (loading) return <LoadingScreen />;

  return (
    <div className="px-4">
      <ReorderModal isOpen={showModal} onClose={() => setShowModal(false)} />

      <Card shadow="sm" className="max-w-[1360px] mx-auto my-5 p-7 fade relative gap-5 z-10 overflow-visible">
        <Filters />
        <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setShowModal(true)}
          className="text-sm w-full max-w-72 flex-1 px-4 py-1 text-nowrap bg-interbrasGreen-500 text-white rounded-md hover:bg-interbrasGreen-600 transition"
        >
          Reordenar Categorías
        </button>
        <CoverSelector tCat={tCat} />

        </div>
      </Card>

      <div id="catalogScroll" className="mx-auto overflow-auto h-0 xl:h-auto fade">
        <div
          id="catalog"
          className="flex flex-col gap-8 w-[1360px] mx-auto"
        >
          {coverUrl && <CoverImage coverDataUrl={coverUrl} />}

          {Object.entries(selectedProducts).map(([key, cat]) => (
            <CategorySection
              key={key}
              categoryKey={key}
              categoryName={cat.categoryName}
              categoryDescription={cat.categoryDescription}
              products={cat.products}
              t_catalog={tCat}
              showPrices={showPrices}
              onToggle={(code) => toggleProduct(key, code)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
