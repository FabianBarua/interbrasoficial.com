import { DefaultList, TriciclosList } from "./list";
import type { ProductData } from "../types";
import { ComponentsIcons } from "./icons";
import { useV2Store } from "../store/v2.store";
import { ImageUploader } from "../components/ImageUploader";

type ComponentsIconsKey = keyof typeof ComponentsIcons;

interface Props {
  categoryKey: string
  categoryName: string;
  categoryDescription: string;
  products: ProductData[];
  t_catalog: (key: string) => string;
  showPrices: boolean;
  onToggle: (code: string) => void;
  currentLocale: string;
}

export const CategorySection = ({
  categoryKey,
  categoryName,
  categoryDescription,
  products,
  t_catalog,
  showPrices,
  onToggle,
  currentLocale
}: Props) => {
  const IconComponent = ComponentsIcons[categoryKey as ComponentsIconsKey];
  const iconUrl = useV2Store((state) => state.iconUrl);
  

  return (
    <>
    <section
      id="catalogSection"
      className="flex flex-col gap-8 bg-gray-900 p-5 text-white relative overflow-hidden"
    >
      {/* Minimal code background */}
      <div className="absolute inset-0 opacity-5 font-mono text-xs leading-4 select-none pointer-events-none">
        <div className="absolute top-10 right-16 text-green-400">
          {`$ init --catalog`}<br/>
          {`> loading products...`}<br/>
          {`> success`}
        </div>
        <div className="absolute top-24 right-10 text-purple-400">
          {`// catalog.render()`}<br/>
          {`// version: ${Date.now()}`}
        </div>
      </div>

      <div className="text-left flex relative z-10">
        <div className="size-16 bg-purple-700 rounded-xl flex justify-center items-center mr-4 fill-white border border-purple-600">
          {IconComponent && <IconComponent className="size-8 relative z-10" />}
        </div>
        <div className="my-auto">
          <h2 className="text-xl font-medium font-mono text-white">
            <span className="text-green-400">{'>'}</span> {categoryName}
          </h2>
          <p className="max-w-screen-sm leading-5 mt-1 line-clamp-2 text-purple-300 font-mono text-sm">
            <span className="text-cyan-400">//</span> {categoryDescription}
          </p>
        </div>
      </div>

      <div className="flex gap-4 relative z-10">
        {categoryKey === "triciclos" ? (
          <TriciclosList
            products={products}
            t_catalog={t_catalog}
            showPrices={showPrices}
            onToggle={onToggle}
            category={categoryKey}
          />
        ) : (
          <DefaultList
            products={products}
            t_catalog={t_catalog}
            showPrices={showPrices}
            onToggle={onToggle}
            category={categoryKey}
          />
        )}
      </div>
    </section>
    </>
  );
};
