import { Filters } from "./Filters";
import { CoverSelector } from "./CoverSelector";
import { CategorySection as CategorySectionV1 } from "./V1/CategorySection";
import { CategorySection as CategorySectionV2 } from "./V2/CategorySection";
import { CategorySection as CategorySectionV2_2 } from "./V2_2/CategorySection";

import { CoverImage } from "./CoverImage";
import { LoadingScreen } from "./LoadingScreen";
import { Card } from "@heroui/react";
import { ReorderModal } from "./ReorderModal";

import { useCatalogStore } from "./store/useCatalogStore";
import { useLoadCatalog } from "./hooks/useLoadCatalog";
import { useState } from "react";
import { ALL_VERSIONS, useVersionStore } from "./store/useVersionStore";
import { PikIcon } from "./V2/PickIcon";

export const CatalogoSection = ({ currentLocale }: { currentLocale: string }) => {
  const { selectedProducts, showPrices, coverUrl, loading, toggleProduct } = useCatalogStore();
  const { currentVersion, updateVersion } = useVersionStore();
  const { tCat } = useLoadCatalog(currentLocale);
  const [showModal, setShowModal] = useState(false);

  const handleChangeVersion = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newVersion = e.target.value;
    const versionData = ALL_VERSIONS[newVersion as keyof typeof ALL_VERSIONS];
    if (versionData) {
      updateVersion(versionData);
    }
  };

  if (loading) return <LoadingScreen />;

  return (
    <div className=" px-1">
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
        
        <select
          value={currentVersion.id}
          onChange={handleChangeVersion}
          className="bg-interbrasGreen-100 text-interbrasGreen-600 flex-1  xl:max-w-40  text-nowrap p-1 rounded-md text-sm hover:bg-interbrasGreen-200"
        >
          {Object.values(ALL_VERSIONS).map((version) => (
            <option key={version.id} value={version.id} className="  text-sm bg-[#f2f2f2] text-interbrasGreen-600 ">
              {version.name}
            </option>
          ))}
        </select>

        {
          (currentVersion.id === ALL_VERSIONS.V2.id || currentVersion.id === ALL_VERSIONS.V2_2.id)   && <PikIcon />
        }

        </div>
      </Card>

      <div id="catalogScroll" className="mx-auto overflow-auto fade">
        <div
          id="catalog"
          className="flex flex-col max-w-[1360px] mx-auto"
        >
          {coverUrl && <CoverImage coverDataUrl={coverUrl} />}

          {
            currentVersion.id === ALL_VERSIONS.V1.id && <>
              {Object.entries(selectedProducts).map(([key, cat]) => (
                <CategorySectionV1
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
            </>
          }

          {
            currentVersion.id === ALL_VERSIONS.V2.id && <>
              {Object.entries(selectedProducts).map(([key, cat]) => (
                <CategorySectionV2
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
            </>
          }

          {
            currentVersion.id === ALL_VERSIONS.V2_2.id && <>
              {Object.entries(selectedProducts).map(([key, cat]) => (
                <CategorySectionV2_2
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
            </>
          }

        </div>
      </div>
    </div>
  );
};
