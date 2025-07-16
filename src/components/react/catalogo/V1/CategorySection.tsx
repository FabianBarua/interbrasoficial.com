import { DefaultList, TriciclosList } from "./list";
import type { ProductData } from "../types";
import { ImageUploader } from "../components/ImageUploader";

interface Props {
  categoryKey: string;
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

  return (
    <>
      <section
        id="catalogSection"
        className="flex bg-interbrasGreen-500 text-white"
      >
        <div className="mx-8 my-16 flex flex-col">
          <h2 className="text-3xl font-bold">{categoryName}</h2>
          <h2 className="text-lg mt-2 max-w-80 leading-5">{categoryDescription}</h2>
          <h3 className="text-base max-w-80 mt-3 leading-5 text-white/70">
            {products[0].info.review}
          </h3>

          {products[0].registered && (
            <div className="w-full mt-10 bg-interbrasGreen-600 rounded-xl py-10">
              <img
                className="max-w-72 w-full rounded-3xl object-contain mx-auto z-10"
                src={products[0].photo || ""}
                alt=""
              />
              <h3 className="max-w-44 text-center mx-auto font-bold text-xl mt-3">
                {products[0].originalName}
              </h3>
            </div>
          )}
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
      <ImageUploader/>
    </>
  );
};
