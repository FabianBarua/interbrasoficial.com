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
    <div className=" flex flex-wrap justify-center gap-2 bg-gradient-to-br from-[#350060] to-[#44007b] p-5 text-white relative overflow-hidden">
      {products.map((product) => (
        <div
          key={product.code}
          className="relative w-full bg-red-400 mb-2"
          id="catalogSection"
        >

          <img
            src={'/pdf/1.png'}
            className=" w-full h-auto absolute top-0 left-0 z-40 opacity-100"
          />

          <img
            src={'/pdf/2.png'}
            className=" w-full h-auto absolute top-0 left-0 z-30 opacity-100"
          />

          <div className=" absolute  bottom-[450px] left-[30px] w-[730px] h-[850px] z-20 flex justify-center items-center">
            <img src={product.photo} alt=""  className=" w-full h-auto "/>
          </div>

          <div className=" absolute  top-[1200px] right-1/2 translate-x-1/2 text-7xl text-left   px-32  w-full z-40">
            
            <div className=" font-bold flex  justify-center items-center gap-7 ">
            <span className=" flex justify-center items-center gap-2 text-interbrasGreen-200  px-12 p-3 bg-purple-800 rounded-3xl shadow-2xl">
              <img src="/brazilFLAG.png" alt="" className=" size-16" />
                <span>110V</span>
            </span>

            <p>
              {
                product.originalName
              }
            </p>
            </div>
          </div>

          <div className=" absolute  top-[630px] right-[140px] text-5xl text-center z-40">
            <span className=" text-[25px] font-bold tracking-[3px]">Aproveite com</span>
            <p className=" relative ">
               <span className=" text-[150px] font-black tracking-tighter leading-[110px]">
                {
                  Math.floor(
                    (Number(product.price) - Number(product.promotion?.data?.data.fixedPrice)) /
                    Number(product.price) * 100
                  )
                }
                %</span> <span className=" text-[30px] mb-4 font-bold absolute top-4">OFF</span>
            </p>
          </div>

          <div className=" absolute  top-[795px] left-[925px] text-5xl  z-40">
            <span className=" text-[25px] font-bold tracking-[1px]">De ${
                showPrices ? formatPriceUSD(Number(product.price)) : "??,??"
              }</span>
            <p className=" text-[43px] font-bold">
              Por ${
                showPrices ? formatPriceUSD(Number(product.promotion?.data?.data.fixedPrice)) : "??,??"
              }
            </p>
          </div>
          
{/* 
          <img
            src={'/pdf/3.png'}
            className=" w-full h-auto absolute top-0 left-0 z-20 opacity-100"
          />
*/}
          <img
            src={'/pdf/4.png'}
            className=" w-full h-auto absolute top-0 left-0 z-10 opacity-100"
          />
          <img
            src="/pdf/0.png"
            className=" w-full h-auto opacity-20"
          />
        </div>
      ))}
    </div>
  );
};
