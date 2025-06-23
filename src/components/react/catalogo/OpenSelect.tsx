import { Button, Listbox, ListboxItem } from "@heroui/react"
import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react";

interface OpenSelectProps {
    title: string;
    options: { key: string, label: string }[];
    selectedKeys: Set<string>;
    setSelectedKeys: React.Dispatch<React.SetStateAction<Set<string>>>
}

export const OpenSelect =
    (
        {
            title,
            options,
            selectedKeys,
            setSelectedKeys,
        }: OpenSelectProps
    ) => {

        const [selectCategoryOpen, setSelectCategoryOpen] = useState(false);

        const openSelect = () => {
            setSelectCategoryOpen(true);

            const closeSelect = (e: MouseEvent) => {
                if (!document.getElementById(`selectCategory`)?.contains(e.target as Node)) {
                    setSelectCategoryOpen(false);
                }
            }

            document.addEventListener('click', (e) => {
                closeSelect(e);
                document.removeEventListener('click', closeSelect);
            });

        }

        return (
            <>

                <div className="flex flex-col gap-2 relative lg:max-w-52 z-40  flex-shrink w-full">
                    <div className=" flex flex-col justify-center items-center gap-2">
                        <Button
                            variant="bordered"
                            className=" w-full"
                            onPress={openSelect}
                        >
                            {title}
                        </Button>
                    </div>

                    <AnimatePresence initial={false}>
                        {
                            selectCategoryOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    id={`selectCategory`} className="  w-full max-w-56 border-small px-1 py-2 z-40 rounded-small border-default-200 dark:border-default-100 absolute top-full mt-2  bg-background">
                                    {/* @ts-ignore */}
                                    <Listbox
                                        disallowEmptySelection
                                        aria-label="Multiple selection example"
                                        selectedKeys={selectedKeys}
                                        selectionMode="multiple"
                                        variant="flat"
                                        onSelectionChange={(keys: any) => setSelectedKeys(new Set(keys))}
                                    >
                                        <>
                                            {
                                                options.map((
                                                    category: { key: string, label: string }
                                                ) => (
                                                    <ListboxItem
                                                        aria-label={category.label}
                                                        key={category.key}
                                                        textValue={category.key}>
                                                        {category.label}
                                                    </ListboxItem>
                                                ))
                                            }
                                        </>
                                    </Listbox>
                                </motion.div>
                            )
                        }
                    </AnimatePresence>
                </div>
            </>
        )
    }