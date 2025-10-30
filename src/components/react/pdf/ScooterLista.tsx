import { useState, useEffect } from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import type { ScooterProduct } from "./ScooterTypes"

export const ScooterLista = (
   
) => {

      const [Productos, setProductos] = useState<ScooterProduct[]>([])
    
      useEffect(() => {
        fetch('https://panel-scooter.interbrasoficial.com/api/productos.php')
          .then(response => response.json())
          .then(data => setProductos(data.data))
          .catch(error => console.error('Error fetching scooters:', error));
      }, []);

    return (
        <ul className=" w-full bg-white flex flex-col gap-3 px-5">
            {
                Productos.map((prod) => (
                    <li id="product" className=" bg-interbrasGreen-500 p-5 rounded-3xl flex flex-col gap-4">
                        <div className=" flex justify-between">
                            <h2 className=" text-2xl text-white">{prod.nombre}</h2>
                            <div className=" text-interbrasGreen-500 bg-white flex justify-center items-center px-5 text-xl  rounded-tl-xl rounded-br-xl rounded-sm tracking-tighter">$<strong>{prod.precio.split(".")[0]}</strong>,{prod.precio.split(".")[1]}</div>
                        </div>
                        <hr className=" border-white" />
                        <div className=" flex w-full gap-2 ">
                            <PhotoProvider>
                                {
                                    prod.fotos.slice(0, 3).map((foto) => (
                                        <div className=" bg-white rounded-3xl overflow-hidden flex-1 flex items-center justify-center min-h-[150px]">
                                            <PhotoView src={foto}>
                                                <img src={foto} className=" w-full h-full object-contain p-2 cursor-pointer" alt={prod.nombre} />
                                            </PhotoView>
                                        </div>
                                    ))
                                }
                            </PhotoProvider>
                            {
                                prod.fotos.length < 3 && Array.from({ length: 3 - prod.fotos.length }).map(() => (
                                    <div className=" bg-white rounded-3xl overflow-hidden flex-1 flex items-center justify-center min-h-[150px]">
                                        <svg className="w-16 h-16 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                                            <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd"></path>
                                        </svg>
                                    </div>
                                ))
                            }
                            <div  className=" flex-1 rounded-3xl bg-slate-50" >
                                <ul className=" p-2 flex flex-col gap-2 h-full justify-center">
                                    {
                                        Object.values(prod.caracteristicas).filter(Boolean).map((carac) => (
                                            <li className=" flex justify-between bg-gray-100 border p-1 rounded-3xl px-4">
                                                <span className=" text-interbrasGreen-500 ">{carac!.label}</span>
                                                <span className=" text-gray-700">{carac!.value}</span>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </div>
                    </li>
                ))
            }
        </ul>
    )
}