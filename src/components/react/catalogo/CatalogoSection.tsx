import { Filters } from "./Filters";
import { CoverSelector } from "./CoverSelector";
import { CategorySection as CategorySectionV1 } from "./V1/CategorySection";
import { CategorySection as CategorySectionV2_2 } from "./V2_2/CategorySection";
import { CategorySection as CategorySectionSaltoHack } from "./SaltoHack/CategorySection";
import { CategorySection as CategorySectionArtes } from "./artes/CategorySection";

import { CoverImage } from "./CoverImage";
import { LoadingScreen } from "./LoadingScreen";
import { Card } from "@heroui/react";
import { ReorderModal } from "./ReorderModal";

import { useCatalogStore } from "./store/useCatalogStore";
import { useLoadCatalog } from "./hooks/useLoadCatalog";
import { useState } from "react";
import { ALL_VERSIONS, useVersionStore } from "./store/useVersionStore";
import { PikIcon } from "./V2_2/PickIcon";
import { IsComing } from "./V2_2/IsComming";
import { CustomSectionManager } from "./CustomSectionManager";

export const CatalogoSection = ({ currentLocale }: { currentLocale: string }) => {
  const { selectedProducts, showPrices, coverUrl, loading, toggleProduct, showCommingSoon, customSections, updateCustomSection, groupedData, displayOrder } = useCatalogStore();
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

  const resolveCustomProducts = (codes: string[], customProducts: import("./types").ProductData[] = []) => {
    const allProducts = Object.values(groupedData).flatMap(cat => cat.products);
    const resolved = codes.map(code => {
      const p = allProducts.find(p => p.code === code);
      if (p) return { ...p, showInCatalog: true };
      return null;
    }).filter(Boolean) as import("./types").ProductData[];

    return [...resolved, ...customProducts];
  };

  const handleRemoveFromCustom = (sectionId: string, code: string) => {
    const section = customSections.find(s => s.id === sectionId);
    if (!section) return;

    // Check if it's a catalog product code
    if (section.productCodes.includes(code)) {
      const newCodes = section.productCodes.filter(c => c !== code);
      updateCustomSection(sectionId, { productCodes: newCodes });
    }
    // Check if it's a custom product
    else if (section.customProducts?.some(p => p.code === code)) {
      const newCustom = section.customProducts.filter(p => p.code !== code);
      updateCustomSection(sectionId, { customProducts: newCustom });
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
          <CustomSectionManager t_catalog={tCat} />
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
            currentVersion.id === ALL_VERSIONS.V2_2.id && <PikIcon />
          }

        </div>
        
        {/* Botones de edición de secciones personalizadas */}
        {currentVersion.id === ALL_VERSIONS.V2_2.id && customSections.length > 0 && (
          <div className="flex gap-2 flex-wrap items-center pt-3 border-t border-gray-200">
            <span className="text-sm text-gray-600 font-medium">Editar secciones:</span>
            {customSections.map((section) => (
              <button
                key={section.id}
                onClick={() => useCatalogStore.getState().setEditingSection(section.id)}
                className="text-sm px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition flex items-center gap-1"
                title={`Editar ${section.name}`}
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                {section.name}
              </button>
            ))}
          </div>
        )}
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
                  currentLocale={currentLocale}
                />
              ))}
            </>
          }

          {
            currentVersion.id === ALL_VERSIONS.V2_2.id && <>

              {
                showCommingSoon && <IsComing

                  categoryKey={"coming-soon"}
                  categoryName={tCat('coming_soon_title')}
                  categoryDescription={tCat('coming_soon_description')}
                  products={
                    []
                  }
                  t_catalog={tCat}
                  showPrices={showPrices}
                  onToggle={(code) => toggleProduct("coming-soon", code)}
                  currentLocale={currentLocale}
                />
              }

              {displayOrder.map(key => {
                const customSection = customSections.find(s => s.id === key);
                if (customSection) {
                  return (
                    <CategorySectionV2_2
                      key={customSection.id}
                      categoryKey={customSection.id}
                      categoryName={customSection.name}
                      categoryDescription=""
                      products={resolveCustomProducts(customSection.productCodes, customSection.customProducts)}
                      t_catalog={tCat}
                      showPrices={showPrices}
                      onToggle={(code) => handleRemoveFromCustom(customSection.id, code)}
                      currentLocale={currentLocale}
                      customColor={customSection.color}
                      customIcon={customSection.icon}
                    />
                  );
                }

                const systemCategory = selectedProducts[key];
                if (systemCategory) {
                  return (
                    <CategorySectionV2_2
                      key={key}
                      categoryKey={key}
                      categoryName={systemCategory.categoryName}
                      categoryDescription={systemCategory.categoryDescription}
                      products={systemCategory.products}
                      t_catalog={tCat}
                      showPrices={showPrices}
                      onToggle={(code) => toggleProduct(key, code)}
                      currentLocale={currentLocale}
                    />
                  );
                }

                return null;
              })}

            </>
          }

          {
            currentVersion.id === ALL_VERSIONS.SaltoHack.id && <>
              {Object.entries(selectedProducts).map(([key, cat]) => (
                <CategorySectionSaltoHack
                  key={key}
                  categoryKey={key}
                  categoryName={cat.categoryName}
                  categoryDescription={cat.categoryDescription}
                  products={cat.products}
                  t_catalog={tCat}
                  showPrices={showPrices}
                  onToggle={(code) => toggleProduct(key, code)}
                  currentLocale={currentLocale}
                />
              ))}
            </>
          }

          {
            currentVersion.id === ALL_VERSIONS.artes.id && <>
              {Object.entries(selectedProducts).map(([key, cat]) => (
                <CategorySectionArtes
                  key={key}
                  categoryKey={key}
                  categoryName={cat.categoryName}
                  categoryDescription={cat.categoryDescription}
                  products={cat.products}
                  t_catalog={tCat}
                  showPrices={showPrices}
                  onToggle={(code: string) => toggleProduct(key, code)}
                  currentLocale={currentLocale}
                />
              ))}
            </>
          }

        </div>
      </div>
    </div>
  );
};
