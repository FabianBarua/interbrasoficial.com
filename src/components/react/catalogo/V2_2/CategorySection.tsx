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
}

export const CategorySection = ({
  categoryKey,
  categoryName,
  categoryDescription,
  products,
  t_catalog,
  showPrices,
  onToggle,
}: Props) => {
  const IconComponent = ComponentsIcons[categoryKey as ComponentsIconsKey];
  const iconUrl = useV2Store((state) => state.iconUrl);
  

  return (
    <>
    <section
      id="catalogSection"
      className="flex flex-col gap-10 bg-interbrasGreen-500 p-5  text-white relative overflow-hidden"
    >

      
      <div className="text-left flex relative">
        <div className="size-24 bg-interbrasGreen-200 rounded-3xl flex justify-center items-center mr-5 fill-interbrasGreen-500 border border-white">
          {IconComponent && <IconComponent className="size-12" />}
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
        />
      ) : (
        <DefaultList
          products={products}
          t_catalog={t_catalog}
          showPrices={showPrices}
          onToggle={onToggle}
        />
      )}

    </section>
    <ImageUploader />
    </>
  );
};
