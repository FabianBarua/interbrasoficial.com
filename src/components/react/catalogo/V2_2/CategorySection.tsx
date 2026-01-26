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
  customColor?: string;
  customIcon?: string;
}

export const CategorySection = ({
  categoryKey,
  categoryName,
  categoryDescription,
  products,
  t_catalog,
  showPrices,
  onToggle,
  currentLocale,
  customColor,
  customIcon
}: Props) => {
  const IconComponent = customIcon ? null : ComponentsIcons[categoryKey as ComponentsIconsKey];
  const iconUrl = useV2Store((state) => state.iconUrl);

  const CustomIconComp = customIcon && ComponentsIcons[customIcon as ComponentsIconsKey];

  return (
    <>
      <section
        id="catalogSection"
        className={`flex flex-col gap-10 p-5 text-white relative overflow-hidden`}
        style={{
          backgroundColor: customColor || undefined,
          // If no custom color, use the default class from before. 
          // Actually the previous code had bg-interbrasGreen-500 class.
          // We can keep the class and override with style if customColor is present.
        }}
      >
        {/* If customColor is not set, we need the default class. 
          But style overrides class, so it's fine. 
          However, to be clean, let's conditionally apply the class or just rely on style.
          The original was bg-interbrasGreen-500.
       */}
        <div className={`absolute inset-0 -z-10 ${!customColor ? 'bg-interbrasGreen-500' : ''}`} style={{ backgroundColor: customColor }} />

        <div className="text-left flex relative">
          <div className="size-24 bg-interbrasGreen-200 rounded-3xl flex justify-center items-center mr-5 fill-interbrasGreen-500 border border-white">
            {CustomIconComp && <CustomIconComp className="size-12" />}
            {IconComponent && !CustomIconComp && <IconComponent className="size-12" />}
          </div>
          <div className="my-auto">
            <h2 className="text-3xl font-bold">{categoryName}</h2>
            <p className="max-w-screen-sm leading-5 mt-2 line-clamp-2">
              {categoryDescription}
            </p>
          </div>


          {
            iconUrl && <img
              src={iconUrl}
              alt={categoryName}
              className="size-32 absolute top-0 right-5 object-contain z-10 "
            />
          }

        </div>

        {categoryKey === "triciclos" ? (
          <TriciclosList
            products={products}
            t_catalog={t_catalog}
            showPrices={showPrices}
            onToggle={onToggle}
            categoryId={categoryKey}
          />
        ) : (
          <DefaultList
            products={products}
            t_catalog={t_catalog}
            showPrices={showPrices}
            onToggle={onToggle}
            categoryId={categoryKey}
          />
        )}

      </section>
      <ImageUploader
        categoryKey={categoryKey}
        currentLocale={currentLocale}
      />
    </>
  );
};
