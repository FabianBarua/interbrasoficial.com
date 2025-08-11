import type { ProductData, promotion } from "../types";

const formatPriceUSD = (price: Number) => {
  return price.toFixed(2).toString().replace(".", ",");
};


const NormalPriceViewComponent = (price: number) => {
    return (
        <h3 className="text-xl bg-interbrasGreen-500 text-white px-3 py-1 rounded-tr-xl rounded-bl-xl h-min text-nowrap" contentEditable>
            USD {formatPriceUSD(price)}
        </h3>
    );
}

const FixedPromoPriceViewComponent = ({
  promotion,
  price
}: {
  promotion: promotion;
  price: number;
}) => {
  if (!promotion?.data?.active || !promotion.data.data.fixedPrice) return null;

  const fixedPrice = promotion.data.data.fixedPrice;
  const percentageOff = Math.round(
    ((price - fixedPrice) / price) * 100
  );
  return (
    <div className="flex flex-col items-start text-nowrap">
      <h3 className="text-base text-gray-500  text-center mx-auto " contentEditable>
        de: <span className=" line-through" contentEditable>{formatPriceUSD(price)}</span> a:
      </h3>
      <h3 className="text-sm  text-red-500 bg-red-100 border-t border-x border-red-700 px-4 py-0 rounded-t-lg shadow-md" contentEditable>
        <span className=" " contentEditable>
            USD
        </span> 
        <span className=" text-3xl mx-[2px] font-bold" contentEditable>
            {formatPriceUSD(fixedPrice).split(",")[0]}
        </span>
        <span className="" contentEditable>
            ,{formatPriceUSD(fixedPrice).split(",")[1]}
        </span>
      </h3>
      <div className=" w-full  px-2 flex justify-center items-center py-1 text-white bg-red-500 rounded-b-2xl border-t border-t-white border-b border-x border-red-900">
        <h4 className=" text-nowrap">
            {
              percentageOff
            } % OFF
        </h4>
        </div>
    </div>
  );
};


interface IDefaultList {
  products: ProductData[];
  t_catalog: (key: string) => any;
  showPrices: boolean;
  onToggle: (code: string) => void;
}
export const DefaultList = ({
  products,
  t_catalog,
  showPrices,
  onToggle,
}: IDefaultList) => {

  return (
    <ul
      className={`
            flex-1 bg-white text-black  rounded-[40px] grid grid-cols-2 p-2 gap-2 relative
            [&>*:nth-child(1)]:rounded-tl-[50px] [&>*:nth-child(2)]:rounded-tr-[50px]
            `}
    >
      {products
        .sort((a, b) => {
          // sort by volt first, then by productCode
          if (a.volt && !b.volt) return -1; // a has
          if (!a.volt && b.volt) return 1; // b has volt
          if (a.volt && b.volt) {
            if (a.volt < b.volt) return -1; // a volt is less than b volt
            if (a.volt > b.volt) return 1; // a volt is greater than b volt
          }
          
          return (a.productCode || "").localeCompare(b.productCode || "");
        })
        .map((product) => {
          return (
            <li
              key={product.productCode + "-" + product.code}
              data-hide={!product.showInCatalog}
              className={`bg-[#f2f2f293] p-5 relative  justify-between flex  flex-1 flex-col rounded-3xl ${
                !product.showInCatalog ? "opacity-50" : ""
              }`}
            >

              {
                product.volt === "110V"  && <>
                  <img 
                  className=" size-8 object-contain mx-auto absolute top-5 right-5 z-10"
                  src={'/brazilFLAG.png'}
                  alt={'brazil flag'}
                />
                </>
              }

              {
                product.volt === "220V"  && <>
                  <img 
                  className=" size-8 object-contain mx-auto absolute top-5 right-5 z-10"
                  src={'/paraguayFLAG.png'}
                  alt={'paraguay flag'}
                />
                </>
              }
              
              <button
                data-eye
                type="button"
                className="absolute top-5 right-5 z-10 bg-[#f2f2f2] p-1 size-7 rounded-full text-[#7c7c7c] hover:bg-[#e0e0e0] transition-colors duration-200 hover:scale-105"
                onClick={() => onToggle(product.code)}
              >
                {product.showInCatalog ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <g
                      fill="currentColor"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    >
                      <path d="M12 8.25a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5ZM9.75 12a2.25 2.25 0 1 1 4.5 0 2.25 2.25 0 0 1-4.5 0Z" />
                      <path d="M12 3.25c-4.514 0-7.555 2.704-9.32 4.997l-.031.041c-.4.519-.767.996-1.016 1.56-.267.605-.383 1.264-.383 2.152 0 .888.116 1.547.383 2.152.25.564.617 1.042 1.016 1.56l.032.041C4.445 18.046 7.486 20.75 12 20.75c4.514 0 7.555-2.704 9.32-4.997l.031-.041c.4-.518.767-.996 1.016-1.56.267-.605.383-1.264.383-2.152 0-.888-.116-1.547-.383-2.152-.25-.564-.617-1.041-1.016-1.56l-.032-.041C19.555 5.954 16.514 3.25 12 3.25ZM3.87 9.162C5.498 7.045 8.15 4.75 12 4.75c3.85 0 6.501 2.295 8.13 4.412.44.57.696.91.865 1.292.158.358.255.795.255 1.546s-.097 1.188-.255 1.546c-.169.382-.426.722-.864 1.292C18.5 16.955 15.85 19.25 12 19.25c-3.85 0-6.501-2.295-8.13-4.412-.44-.57-.696-.91-.865-1.292-.158-.358-.255-.795-.255-1.546s.097-1.188.255-1.546c.169-.382.426-.722.864-1.292Z" />
                    </g>
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      fillRule="evenodd"
                      d="M22.295 6.31a.75.75 0 0 1 .394.986L22 7l.69.296v.001l-.002.003-.003.007-.01.024-.039.084a13.858 13.858 0 0 1-.727 1.321 15.053 15.053 0 0 1-1.846 2.394l.968.969a.75.75 0 0 1-1.06 1.06l-1.001-1a11.548 11.548 0 0 1-2.274 1.497l.934 1.435a.75.75 0 1 1-1.258.818l-1.089-1.674c-.78.255-1.623.428-2.532.49V16.5a.75.75 0 0 1-1.5 0v-1.775c-.881-.06-1.7-.225-2.46-.466l-1.074 1.65a.75.75 0 1 1-1.258-.818l.913-1.402a11.503 11.503 0 0 1-2.293-1.49l-.96.96a.75.75 0 0 1-1.061-1.06l.924-.924A15.03 15.03 0 0 1 1.514 7.72a9.524 9.524 0 0 1-.188-.388l-.01-.025-.004-.007v-.003H1.31L2 7l-.69.296a.75.75 0 0 1 1.379-.592v.002l.007.014.029.063a12.39 12.39 0 0 0 .65 1.177c.475.76 1.197 1.747 2.18 2.662.867.805 1.928 1.546 3.197 2.034A8.97 8.97 0 0 0 12 13.25a8.963 8.963 0 0 0 3.312-.619c1.262-.497 2.316-1.243 3.175-2.049a13.303 13.303 0 0 0 2.789-3.8l.028-.063.006-.013v-.001m.985-.394a.75.75 0 0 0-.984.394l.984-.394ZM2.69 6.704Z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
              <div className="flex gap-4">
                {product.registered && (
                  <>
                    <img
                      className="w-52 h-44  rounded-3xl rounded-tl-[50px] p-2 object-contain mx-auto"
                      src={product.photo || ""}
                      alt=""
                    />
                    <div className="flex-1">
                      <h3 className="text-xl font-medium" contentEditable>
                        {t_catalog("specs")}
                      </h3>
                      <ul className="">
                        {product.info.specs
                          ?.split("\n")
                          .slice(0, 7)
                          .map((spec: string, i: number) => {
                            return (
                              <li className="text-sm" key={i} contentEditable>
                                {spec}
                              </li>
                            );
                          })}
                      </ul>
                    </div>

                  </>
                )}
              </div>


              <div className="flex  mt-4 px-2 gap-3 ">

                <div className=" flex flex-col justify-center  pr-4">
                  <h3 className="text-2xl  max-w-sm font-medium line-clamp-3 leading-6" contentEditable>
                   {product.volt && <span className=" font-bold" contentEditable>{product.volt + " - "}</span>}{product.originalName}
                  </h3>
                  <div className=" flex mt-2 gap-1 font-light text-nowrap flex-wrap">
                    <span className=" px-2 bg-interbrasGreen-100 rounded-lg text-interbrasGreen-600 line-clamp" contentEditable>
                      Ref: {product.code}
                    </span>

                    <span className=" px-2 bg-interbrasGreen-100 rounded-lg text-interbrasGreen-600 line-clamp-1" contentEditable>
                      {product.productPerBox} {t_catalog("perBox")}
                    </span>
                  </div>

                  {product.info.included && (
                    <h4 className=" leading-5" contentEditable>
                      <strong contentEditable>{t_catalog("included")}:</strong>
                      {product.info.included}
                    </h4>
                  )}
                </div>

                {/* "promotion": {
                    "type": {
                        "id": 2,
                        "name": "fijo",
                        "description": "coloca el precio al nuevo precio"
                    },
                    "data": {
                        "id": 134,
                        "catalog_id": 76,
                        "type_id": 2,
                        "data": {
                            "fixedPrice": 28.3
                        },
                        "active": true
                    }
                }, */}

                  <div className=" scale-125  mt-auto ml-auto ">
                      {showPrices && !product?.promotion?.type && NormalPriceViewComponent(Number(product.price))}
                      {showPrices && product?.promotion?.type?.id === 2 && FixedPromoPriceViewComponent({
                        promotion: product.promotion,
                        price: Number(product.price),
                      })}
                    </div>
              </div>
            </li>
          );
        })}


    </ul>
  );
};

interface Joined extends ProductData {
  sizes: string[];
}

const TricicloCard = ({
  product,
  onToggle,
}: {
  product: Joined;
  onToggle: (code: string) => void;
}) => {
  return (
    <li
      className={` h-44 w-[165px] p-3 flex justify-between  relative flex-col bg-gray-50 rounded-xl border border-gray-200 ${
        !product.showInCatalog ? "opacity-50" : ""
      }`}
      data-hide={!product.showInCatalog}
    >
      <button
        data-eye
        type="button"
        className="absolute top-2 right-2 z-10"
        onClick={() => onToggle(product.code)}
      >
        {product.showInCatalog ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 12c0 .88.77 2.11 2.017 3.495C6.62 17.903 9.844 20.25 12 20.25c2.156 0 5.38-2.347 7.733-4.755C21.23 14.11 22 12.88 22 12s-.77-2.11-2.267-3.495C17.38 6.097 14.156 3.75 12 3.75c-2.156 0-5.38 2.347-7.733 4.755C3.02 9.89 2.25 11.12 2.25 12z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.98 8.223A10.477 10.477 0 002.25 12c0 .88.77 2.11 2.017 3.495C6.62 17.903 9.844 20.25 12 20.25c2.434 0 5.405-2.522 7.38-4.814M8.653 8.653a3 3 0 014.243 4.243m0 0l-4.243-4.243m4.243 4.243L3 3m15.75 8.25c0 .398-.032.79-.093 1.175m0 0l4.293 4.293m-4.293-4.293a10.455 10.455 0 01-2.316 3.32"
            />
          </svg>
        )}
      </button>
      <img
        src={product.photo}
        alt=""
        className=" h-32 object-contain relative z-10"
      />
      <p className=" text-center leading-5 text-nowrap bg-interbrasGreen-100 text-interbrasGreen-600 rounded-xl px-2 py-1" contentEditable>
        {product.originalName}
      </p>
      <span className=" absolute px-2  top-2 right-2 bg-gray-100 text-gray-400 rounded-md z-0" contentEditable>
        {product.sizes.join(" / ")}
      </span>
    </li>
  );
};

export const TriciclosList = ({
  products,
  t_catalog,
  showPrices,
  onToggle,
}: IDefaultList) => {
  const Joined: Joined[] = [];
  const Prices: { price: string; size: string }[] = [];

  products.forEach((product) => {
    const index = Joined.findIndex(
      (p) => p.originalName.split("-")[1] === product.originalName.split("-")[1]
    );

    const size = product.originalName.includes("6.5") ? "6.5" : "8";

    const priceIndex = Prices.findIndex((p) => p.size === size);
    if (priceIndex === -1) {
      Prices.push({ price: product.price, size });
    }

    if (index === -1) {
      Joined.push({ ...product, sizes: [size] });
    } else {
      Joined[index].sizes.push(size);
    }
  });

  return (
    <ul className="grid grid-cols-2 gap-4">
      {Joined.map((product) => {
        return (
          <TricicloCard key={product.code} product={product} onToggle={onToggle} />
        );
      })}
    </ul>
  );
};
