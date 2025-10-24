import type { GroupedByCategory } from "./types";
import { Input } from "@heroui/react";
import React, { useEffect } from "react";
import { OpenSelect } from "./OpenSelect";
import { useDebouncedCallback } from 'use-debounce';
import {Checkbox} from "@heroui/react";
import { useCatalogStore } from "./store/useCatalogStore";

const categories = (grouped: GroupedByCategory) => {
    return Object.keys(grouped).map((category) => {
        return {
            key: category,
            label: grouped[category].categoryName,
        };
    });
}

const all_voltages = (grouped: GroupedByCategory) => {
    const voltages = new Set<string>();
    Object.keys(grouped).map((category) => {
        return grouped[category].products.map((product: { volt: any; }) => {
            if (!voltages.has(product.volt || 'null')) {
                voltages.add(product.volt || 'null');
            }
        });
    })
    return voltages;
}

export const Filters = () => {

    const { groupedData, setSelectedProducts, setShowPrices, showWithoutStock, setShowOnlyPromotion, showOnlyPromotion, setShowWithoutStock, setShowCommingSoon, showCommingSoon } = useCatalogStore();

    const [selectedKeys, setSelectedKeys] = React.useState(new Set(
        Object.keys(groupedData)
    ));
    const [voltagesSelected, setVoltagesSelected] = React.useState(
        new Set(all_voltages(groupedData))
    )
    const [search, setSearch] = React.useState('');

    const debounced = useDebouncedCallback(
        // function
        (value: string) => {
            setSearch(value);
        },
        // delay in ms
        100
    );

    useEffect(() => {
        filter();
        console.log('effect');
    }, [selectedKeys, voltagesSelected, search, showOnlyPromotion, showWithoutStock]);


    if (!groupedData) {
        return null;
    }

    const filter = () => {

        // by showWithoutStock
        const selectedWithoutStock = Object.keys(groupedData).reduce((acc: GroupedByCategory, category) => {
            const products = groupedData[category].products.filter((product) => {
                return product.show || showWithoutStock
            });
            if (products.length > 0) {
                acc[category] = {
                    ...groupedData[category],
                    products,
                };
            }
            return acc;
        }, {});

        // by voltage
        const selectedByVoltage = Object.keys(selectedWithoutStock).reduce((acc: GroupedByCategory, category) => {
            const products = selectedWithoutStock[category].products.filter((product) => {
                return voltagesSelected.has(product.volt || 'null');
            });
            if (products.length > 0) {
                acc[category] = {
                    ...groupedData[category],
                    products,
                };
            }
            return acc;
        }, {});

        // by promotion
        const selectedByPromotion = Object.keys(selectedByVoltage).reduce((acc: GroupedByCategory, category) => {
            const products = selectedByVoltage[category].products.filter((product) => {
                if (showOnlyPromotion) {
                    return product.promotion && product.promotion.type;
                }
                return true; 
            });
            if (products.length > 0) {
                acc[category] = {
                    ...selectedByVoltage[category],
                    products,
                };
            }
            return acc;
        }, {});

        console.log('selectedByPromotion', selectedByPromotion);

        // by category
        const selectedByCategory = Object.keys(selectedByPromotion).reduce((acc: GroupedByCategory, category) => {
            if (selectedKeys.has(category)) {
                acc[category] = selectedByPromotion[category];
            }
            return acc;
        }, {});

        if (!search) {
            setSelectedProducts(selectedByCategory);
            return;
        }

        const searchFiltered = Object.keys(selectedByCategory).reduce((acc: GroupedByCategory, category) => {
            const products = selectedByCategory[category].products.filter((product) => {
                return product.originalName.toLowerCase().includes(search?.toLowerCase()) || product.code === search?.toLowerCase();
            });
            if (products.length > 0) {
                acc[category] = {
                    ...selectedByCategory[category],
                    products,
                };
            }
            return acc;
        }, {});

        console.log('searchFiltered', searchFiltered);
        setSelectedProducts(searchFiltered);
    }

    const changeViewPrice = (e: React.ChangeEvent<HTMLInputElement>) => {

        const checked = e.target.checked;
        setShowPrices(checked);
    }

    const changeOnlyPromo = (e: React.ChangeEvent<HTMLInputElement>) => {
        const checked = e.target.checked;
        setShowOnlyPromotion(checked);
    }


    return (
        <>

            <div className=" flex flex-col lg:flex-row   relative  gap-2 z-10 ">

                <div className=" w-full flex flex-shrink gap-2 items-center">
                    <Input
                        label="Buscar"
                        labelPlacement={'outside-left'}
                        placeholder="Nombre del producto"
                        type="text"
                        className=" w-full flex-shrink lg:flex hidden"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            debounced(e.target.value)
                        }
                        classNames={
                            {
                                input: "w-full",
                                label: "text-gray-500",
                                inputWrapper: "w-full flex-shrink bg",
                                mainWrapper: "w-full flex-shrink",
                            }
                        }
                    />
                <Checkbox defaultSelected onChange={ changeViewPrice }> Precio </Checkbox>
                <Checkbox className=" text-nowrap" onChange={ changeOnlyPromo }> Solo promo </Checkbox>
                <Checkbox className=" text-nowrap" checked={showWithoutStock} onChange={(e) => {
                    const checked = e.target.checked;
                    setShowWithoutStock(checked);
                }}> Mostrar sin stock </Checkbox>
                <Checkbox className=" text-nowrap" checked={showCommingSoon} onChange={(e) => {
                    const checked = e.target.checked;
                    setShowCommingSoon(checked);
                }}> CommingSoon </Checkbox>
                </div>

                <div className=" flex gap-2 w-full items-center justify-center lg:justify-end">
                    <OpenSelect
                        title="Categorías"
                        options={categories(groupedData)}
                        selectedKeys={selectedKeys}
                        setSelectedKeys={setSelectedKeys}
                    />

                    <OpenSelect
                        title="Voltaje"
                        options={
                            Array.from(all_voltages(groupedData)).map((voltage) => {
                                return {
                                    key: voltage || 'null',
                                    label: voltage === 'null' ? 'Sin voltaje' : voltage,
                                }
                            })
                        }

                        selectedKeys={voltagesSelected}
                        setSelectedKeys={setVoltagesSelected}
                    /> 
                </div>



            </div>



        </>

    );
}