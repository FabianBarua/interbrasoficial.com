import type { ProductData } from "../types";

interface Props {
  products: ProductData[];
  categoryKey?: string;
}

const formatPriceUSD = (price: Number) => {
  return price.toFixed(2).toString().replace(".", ",");
};


export const CategorySection = ({
categoryKey,
products
}: Props) => {

  console.log("CategorySection", categoryKey);

  return (
  <>

  {
    products.map((product) => (
      <div key={product.code} id="catalogSection" className="relative  bg-black min-h-4 w-[2160px] h-[2700px] ">
        <img src="/pdf/1.png" alt="1" className=" absolute z-[1] w-full h-full top-0 left-0" />
        {/* <img src="/pdf/2.png" alt="1" className=" absolute z-[2] w-full h-full top-0 left-0" /> */}
        {/* <img src="/pdf/4.png" alt="1" className=" absolute z-[3] w-full h-full top-0 left-0" /> */}
        {/* <img src={product.photo} alt="1" className=" absolute z-[4]" /> */}
        <div className=" w-[1480px] h-[1580px] top-[540px] left-[50px]  absolute z-[4]  flex justify-center items-center ">
           <img src={product.photo} alt="1" className=" w-full h-full  object-contain"
              style={
                {
                  padding: "200px",
                }
              }
           />
        </div>
        <img src="/pdf/5.png" alt="1" className=" absolute z-[5] w-full h-full top-0 left-0" />
        <img src="/pdf/5.png" alt="1" className=" absolute z-[6] w-full h-full top-0 left-0 opacity-50" />
        <div className="w-[1580px] h-[300px] bottom-[450px] left-[300px]  absolute z-[4]   "
          style={{
            bottom: product.originalName.length > 20 ? "550px" : "450px",
          }}
        >
          <h1 className=" text-white text-[160px] leading-[150px] font-bold pt-[50px] text-center text-balance">
              {product.originalName}
          </h1>
          <div className=" flex justify-center gap-10">
            <p  className=" text-center text-[50px] bg-white/90 text-interbrasGreen-500 font-bold backdrop-blur-xl rounded-full w-fit px-10 mt-10  border-[5px]">
              COD: {product.code}
            </p>
<p
  className={`
    text-center text-[50px] flex justify-center items-center gap-2 
    font-bold backdrop-blur-xl rounded-full w-fit px-10 mt-10 
    border-[5px] bg-white/90 
    ${
      product.volt === "110V"
        ? "text-green-600 border-green-200"
        : product.volt === "220V"
        ? "text-red-600 border-red-600"
        : product.volt === "Bivolt"
        ? "text-yellow-500 border-yellow-500"
        : "text-interbrasGreen-500 border-interbrasGreen-500"
    }
  `}
>
  {product.volt === "110V" ? (
    <img
      src="https://em-content.zobj.net/source/apple/419/flag-brazil_1f1e7-1f1f7.png"
      className="inline size-20"
      alt="Brasil"
    />
  ) : product.volt === "220V" ? (
    <img
      src="https://em-content.zobj.net/source/apple/419/flag-paraguay_1f1f5-1f1fe.png"
      className="inline size-20"
      alt="Paraguay"
    />
  ) : product.volt === "Bivolt" ? (
    <img
      src="https://em-content.zobj.net/source/apple/419/high-voltage_26a1.png"
      className="inline size-16"
      alt="Bivolt"
    />
  ) : (
    ""
  )}
    {" - "} {product.volt}
</p>


          </div>
        </div>

        <img src="/pdf/7.png" alt="1" className=" absolute z-[7] w-full h-full top-0 left-0" />
        <img src="/pdf/8.png" alt="1" className=" absolute z-[8] w-full h-full top-0 -left-[5px]" />
        <div className="w-[600px] h-[280px]  top-[950px] right-[180px]  absolute z-[9]   ">
          <h2 className="  ml-20 text-interbrasGreen-500 font-extrabold text-[200px]">
              {Math.round((100 - ((product.promotion.data?.data.fixedPrice ?? 0) * 100) / Number(product.price))) + "%"}
          </h2>
        </div>
        <div className="w-[600px] h-[140px]  top-[1218px] right-[180px]  absolute z-[9]   ">
          <h2 className=" ml-[190px] text-black font-bold text-[44px] ">
            {formatPriceUSD(Number(product.price)) || ""}
          </h2>
          <h2 className=" ml-[310px] text-white font-bold text-[70px] leading-[70px] ">
            {formatPriceUSD(Number(product.promotion.data?.data.fixedPrice)) || ""}
          </h2>
        </div>

        <img src="/pdf/9-SUPERPONER.png" alt="1" className=" absolute z-[9] w-full h-full top-0 left-0" style={{
          // apply superposition filter
          mixBlendMode: 'multiply',
        }} />

      </div>
    ))
  }



  </>
  );
};
