import { DefaultList, TriciclosList } from "./list";
import type { ProductData } from "../types";
import { ComponentsIcons } from "./icons";
import { useV2Store } from "../store/v2.store";
import { LetterGlitch } from "./LetterGlitch";

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
      className="flex flex-col gap-4 bg-gradient-to-br  bg-[#350060] p-5 text-white relative overflow-hidden"
    >

      <LetterGlitch
        glitchSpeed={50}
        centerVignette={true}
        outerVignette={true}
        smooth={true}
        glitchColors={["#3b006a", "#44007b", "#00ad004d"]}
      />

      {/* Minimal code background */}
      <div className="absolute inset-0 opacity-3 font-mono text-xs leading-4 select-none pointer-events-none">
        <div className="absolute top-[24px] right-16 text-[#01ad00] ">
          {`$ init --catalog`}<br/>
          {`> loading products...`}<br/>
          {`> success`}
        </div>
        <div className="absolute top-[80px] right-10  text-purple-400">
          {`// catalog.render()`}<br/>
          {`// version: ${Date.now()}`}
        </div>
      </div>

      <div className="text-left flex relative z-1 justify-between mr-52 border border-purple-900 bg-[#00ad003f] p-2 pl-5 backdrop-blur-sm">

        <div className="my-auto">
          <h2 className="text-2xl font-medium font-mono text-white">
            <span className="text-[#01ad00]">{'>'}</span> {categoryName}
          </h2>
          <p className="max-w-screen-sm leading-5 mt-1 line-clamp-2 text-purple-200/55 font-mono font-light text-sm">
            <span className="">//</span> {categoryDescription}
          </p>
        </div>

        <div className="size-20  bg-gradient-to-br bg-[#44007b]  flex justify-center items-center fill-white border border-purple-500/30 shadow-md relative overflow-hidden">
          <div className="absolute inset-0 "></div>
          {IconComponent && <IconComponent className="size-10 relative z-10" />}
        </div>

      </div>

      <div className="flex gap-5 relative z-10">
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
      <img
        className="max-w-[1360px] opacity-90 w-full mx-auto object-cover doublemask"
        src={'/pdf/saltohack.png'}
        alt="Catalog Icon"
      />
    </section>
    </>
  );
};
