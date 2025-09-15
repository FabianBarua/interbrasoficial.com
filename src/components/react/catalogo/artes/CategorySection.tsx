import type { ProductData } from "../types";
import { ComponentsIcons } from "./icons";
import { useV2Store } from "../store/v2.store";
import { ImageUploader } from "../components/ImageUploader";

type ComponentsIconsKey = keyof typeof ComponentsIcons;

const formatPriceUSD = (price: Number) => {
  return price.toFixed(2).toString().replace(".", ",");
};

interface Props {
  categoryKey: string;
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
  currentLocale,
}: Props) => {
  // catalogSection

  return (
    <div className="justify-center gap-2 bg-gradient-to-br from-[#350060] to-[#44007b] p-5 text-white relative overflow-hidden">
      {products.map((product) => (
        <div
          key={product.code}
          className="relative w-full   mb-2"
          id="catalogSection"
        >
          <img
            src={'/pdf/no-stock-02.png'}
            className=" w-full h-auto absolute top-0 left-0 z-40 opacity-100"
          />
          
          <div className=" absolute top-[450px] left-1/2 -translate-x-1/2 z-50  text-center max-w-[70%]  w-full flex justify-center items-center p-2 rounded-md gap-10">

            {
              product.volt && <>
              <span className=" bg-interbrasGreen-950 px-5 py-2 rounded-[30px] font-bold text-6xl">{product.volt}</span>
                <div className=" w-px border h-[50px]"></div>
              </>

              
            }

            <p className={` text-[90px]  leading-[95px] text-balance ${product.volt ? 'text-left' : ' text-center' } `}>
              {product.originalName}
            </p>
          </div>

          <img 
            src={product.photo}
            className=" absolute  bottom-[320px] left-0 z-30 w-full h-auto scale-75"
          />
            
          <img
            src="/pdf/no-stock-01.png"
            className=" w-full h-auto"
          />

        </div>
      ))}
    </div>
  );
};
