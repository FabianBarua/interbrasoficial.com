import { useMemo } from "react";
import { ImageUploader } from "../components/ImageUploader";
import { useCatalogStore } from "../store/useCatalogStore";
import { useV2Store } from "../store/v2.store";
import type { ProductData } from "../types";
import { ComponentsIcons } from "./icons";
import { TriciclosList, DefaultList } from "./list";

type ComponentsIconsKey = keyof typeof ComponentsIcons;

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

//   productCode: "",
//   price: "",
//   inDb: boolean,

const formatPriceUSD = (price: Number) => {
  return price.toFixed(2).toString().replace(".", ",");
};

const NormalPriceViewComponent = ({
  price,
  sin_stock,
  nuevo,
  t_catalog,
}: {
  price: number;
  sin_stock: boolean;
  nuevo: boolean;
  t_catalog: (key: string) => string;
}) => {
  const hasPrice = formatPriceUSD(price) !== "NaN";

  return (
    <div className="w-full flex flex-col">
      {sin_stock && (
        <div className="w-full text-sm  font-medium text-white bg-interbrasGreen-900 py-1 px-2 text-center rounded-t-xl">
          {t_catalog("arriving")}
        </div>
      )}
      <h3
        className={`
           text-white px-3 py-1 h-min text-nowrap text-center font-semibold 
           ${
             sin_stock
               ? "rounded-b-xl text-xl"
               : "rounded-br-xl rounded-tl-xl text-2xl"
           }
            ${
              nuevo
                ? "bg-gradient-to-r from-interbrasGreen-500 to-interbrasGreen-600"
                : sin_stock
                ? "bg-interbrasGreen-900"
                : "bg-interbrasGreen-500"
            }
          
        `}
      >
        {!sin_stock && hasPrice ? (
          <span>USD {formatPriceUSD(price)}</span>
        ) : nuevo ? (
          t_catalog("new")
        ) : (
          t_catalog("coming_soon")
        )}
      </h3>
    </div>
  );
};

const NoInDb = ({
  productCode,
  nuevo,
  price,
  photo,
  originalName,
  volt,
  info,
  categoryId,
  t_catalog,
}: {
  price: number;
  nuevo: boolean;
  productCode: string;
  photo: string[];
  originalName: string;
  volt: string;
  info: any;
  categoryId: string;
  t_catalog: (key: string) => string;
}) => {
  return (
    <div className="p-5 relative  justify-between flex  flex-1 flex-col rounded-3xl bg-[#f2f2f293] text-black ">
      <div className=" flex gap-5">
        <img
          className="w-52 h-44  rounded-3xl rounded-tl-[50px] p-2 object-contain mx-auto"
          src={photo[0] || ""}
          alt=""
        />
        <div className="flex-1">
          <h3 className="text-xl font-medium" >
            {t_catalog("characteristics")}
          </h3>
          <ul className="">
            {info.specs
              ?.split("\n")
              .slice(0, 7)
              .map((spec: string, i: number) => {
                return (
                  <li className="text-sm" key={i} >
                    {spec}
                  </li>
                );
              })}
          </ul>
        </div>
      </div>

      <div className="flex  mt-4 px-2 gap-3 ">
        <div className=" flex flex-col justify-center  pr-4">
          <h3
            className="text-2xl  max-w-sm font-medium line-clamp-3 leading-6"
            
          >
            {volt && (
              <span className=" font-bold" >
                {(volt === "110V" && categoryId === "aires" ? "220V" : volt) +
                  " - "}
              </span>
            )}
            {volt === "110V" && categoryId === "aires"
              ? originalName.replace("50Hz", "60Hz")
              : originalName}
          </h3>

          {
            nuevo && (
              <span className="text-sm text-center bg-interbrasGreen-500 text-white px-6 py-1 rounded-b-xl mt-1 inline-block">
                {t_catalog("new")}
              </span>
            )
          }

          {info.included && (
            <h4 className=" leading-5" >
              <strong >{t_catalog("includes")}:</strong>
              {info.included}
            </h4>
          )}
        </div>

        <div className=" flex-col ml-auto">
          <NormalPriceViewComponent
            price={price}
            sin_stock={price === 0}
            nuevo={nuevo}
            t_catalog={t_catalog}
          />
        </div>
      </div>
    </div>
  );
};
const InDb = ({
  originalName,
  photo,
  price,
  volt,
  info,
  categoryId,
  nuevo,
  t_catalog,
}: {
  originalName: string;
  price: number;
  photo: string[];
  volt: string;
  info: any;
  categoryId: string;
  nuevo: boolean;
  t_catalog: (key: string) => string;
}) => {
  return (
    <div className="p-5 relative  justify-between flex  flex-1 flex-col rounded-3xl bg-[#f2f2f293] text-black ">
      <div className=" flex gap-5">
        <img
          className="w-52 h-44  rounded-3xl rounded-tl-[50px] p-2 object-contain mx-auto"
          src={photo[0] || ""}
          alt=""
        />
        <div className="flex-1">
          <h3 className="text-xl font-medium" >
            {t_catalog("characteristics")}
          </h3>
          <ul className="">
            {info.specs
              ?.split("\n")
              .slice(0, 7)
              .map((spec: string, i: number) => {
                return (
                  <li className="text-sm" key={i} >
                    {spec}
                  </li>
                );
              })}
          </ul>
        </div>
      </div>

      <div className="flex  mt-4 px-2 gap-3 ">
        <div className=" flex flex-col justify-center  pr-4">
          <h3
            className="text-2xl  max-w-sm font-medium line-clamp-3 leading-6 text-balance"
            
          >
            {volt && (
              <span className=" font-bold" >
                {(volt === "110V" && categoryId === "aires" ? "220V" : volt) +
                  " - "}
              </span>
            )}
            {volt === "110V" && categoryId === "aires"
              ? originalName.replace("50Hz", "60Hz")
              : originalName}
          </h3>
          {
            nuevo && (
              <span className="text-sm bg-interbrasGreen-500 text-white px-2 py-1 rounded-full mt-1 inline-block">
                {t_catalog("new")}
              </span>
            )
          }

          {info.included && (
            <h4 className=" leading-5" >
              <strong >{t_catalog("includes")}:</strong>
              {info.included}
            </h4>
          )}
        </div>

        <div className=" flex-col ml-auto">
          <NormalPriceViewComponent
            price={price}
            sin_stock={price === 0}
            nuevo={nuevo}
            t_catalog={t_catalog}
          />
        </div>
      </div>
    </div>
  );
};

export const IsComing = ({
  categoryKey,
  categoryName,
  categoryDescription,
  products,
  t_catalog,
  showPrices,
  onToggle,
  currentLocale,
}: Props) => {
  const IconComponent = ComponentsIcons[categoryKey as ComponentsIconsKey];
  const iconUrl = useV2Store((state) => state.iconUrl);

  const { groupedData } = useCatalogStore();

  //   price: number;
  // productCode: string;
  // photo: string[];
  // originalName: string;
  // volt: string;
  // info: any;
  // categoryId: string;

  const productsData: {
      productCode: string;
      price: string;
      inDb: boolean;
      nuevo?: boolean;
      photo?: string[] | string;
      originalName?: string;
      volt?: string;
      info?: any;
      categoryId?: string;
    }[]
  =
    
  [
    {
      productCode: "itb-12000of",
      price: "250.00",
      inDb: true,
    },
    {
      productCode: "itb-12000iv",
      price: "290.00",
      inDb: true,
    },
    

    {
      productCode: "itb-18000iv",
      price: "0.00",
      inDb: true,
    },
    {
      productCode: "IN3200TV",
      price: "0.00",
      inDb: true,
    },
    {
      productCode: "IN5000TV",
      price: "0.00",
      inDb: true,
    },
            {
      productCode: "IN6500TV",
      price: "0.00",
      inDb: true,
    },

    // {
    //   productCode: "itb-24000iv",
    //   price: "550.00",
    //   inDb: true,
    // },
    {
      productCode: "65-N1",
      price: "0.00",
      inDb: true,
    },
    {
      productCode: "80-N1",
      price: "0.00",
      inDb: true,
    },
  ];

  const withGroupedData = useMemo(() => {
    const fulldata = Object.values(groupedData)
      .map((cat) => ({
        products: cat.products,
        categoryId: cat.categoryName,
        key:
          Object.keys(groupedData).find(
            (k) => groupedData[k].categoryName === cat.categoryName
          ) || "asd",
      }))
      .flat();
    console.log(fulldata);

    return productsData.map((pd) => {
      if (!pd.inDb) return pd;

      const findCategory = fulldata.find((cat) =>
        cat.products.find((p: ProductData) => p.productCode === pd.productCode)
      );

      if (!findCategory) return pd;

      const foundProduct = findCategory.products.find(
        (p: ProductData) => p.productCode === pd.productCode
      );
      if (!foundProduct) return pd;

      return {
        ...pd,
        originalName: foundProduct.originalName,
        photo: foundProduct.photo || [],
        volt: foundProduct.volt,
        info: foundProduct.info,
        categoryId: findCategory.key || "asd",
      };
    });
  }, [groupedData, productsData]);

  console.log({ withGroupedData });

  return (
    <>
      <section
        id="catalogSection"
        className="flex flex-col gap-10 bg-interbrasGreen-500 p-5  text-white relative overflow-hidden"
      >
        <div className=" flex relative text-center">
          <div className="my-auto  w-full">
            <h2 className="text-3xl font-bold">{t_catalog("coming_soon_title")}</h2>

            <p className=" text-balance max-w-sm mx-auto leading-5 mt-1">
              {t_catalog("coming_soon_description").split("\n").map((line, index) => (
                <span key={index}>
                  {line
                  }<br />
                </span>
              ))}
            </p>
          </div>
        </div>

        <div className=" grid-cols-2 grid gap-2 bg-white p-2 rounded-[40px]">
          {withGroupedData
            .map((product) =>
              product.inDb && "originalName" in product ? (
                <InDb
                  key={product.productCode}
                  originalName={product.originalName ?? ""}
                  photo={
                    Array.isArray(product.photo)
                      ? product.photo
                      : typeof product.photo === "string"
                      ? [product.photo]
                      : []
                  }
                  volt={product.volt ?? ""}
                  info={product.info}
                  price={Number(product.price) < 0 ? 0 : Number(product.price)}
                  categoryId={product.categoryId ?? ""}
                  nuevo={product.nuevo || false}
                  t_catalog={t_catalog}
                />
              ) : (
                <NoInDb
                  key={product.productCode}
                  nuevo={product.nuevo || false}
                  productCode={product.productCode}
                  price={Number(product.price) < 0 ? 0 : Number(product.price)}
                  photo={
                    Array.isArray(product.photo)
                      ? product.photo
                      : typeof product.photo === "string"
                      ? [product.photo]
                      : []
                  }
                  originalName={product.originalName ?? ""}
                  volt={product.volt ?? ""}
                  info={product.info ?? {}}
                  categoryId={product.categoryId ?? ""}
                  t_catalog={t_catalog}
                />
              )
            )}
        </div>
      </section>
      <ImageUploader categoryKey={categoryKey} currentLocale={currentLocale} />
    </>
  );
};
