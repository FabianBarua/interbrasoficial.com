import { useState, useEffect } from "react";
import { useCatalogStore } from "./store/useCatalogStore";
import type { CustomSection, ProductData } from "./types";
import { ComponentsIcons } from "./V2_2/icons";

interface Props {
    t_catalog: (key: string) => string;
}

const AVAILABLE_ICONS = Object.keys(ComponentsIcons);

export const CustomSectionManager = ({ t_catalog }: Props) => {
    const {
        customSections,
        addCustomSection,
        deleteCustomSection,
        updateCustomSection,
        groupedData,
        editingSectionId,
        setEditingSection
    } = useCatalogStore();

    // Modal control
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("general");

    // Form State
    const [sectionName, setSectionName] = useState("");
    const [sectionColor, setSectionColor] = useState("#22c55e");
    const [sectionIcon, setSectionIcon] = useState("start");

    // Products State
    const [selectedCodes, setSelectedCodes] = useState<string[]>([]);
    const [customProducts, setCustomProducts] = useState<ProductData[]>([]);

    // Search & Add Product State
    const [searchTerm, setSearchTerm] = useState("");

    // Ad-Hoc Product State
    const [adhocName, setAdhocName] = useState("");
    const [adhocPrice, setAdhocPrice] = useState("");
    const [adhocPhoto, setAdhocPhoto] = useState("");
    const [adhocDescription, setAdhocDescription] = useState("");
    const [editingProductCode, setEditingProductCode] = useState<string | null>(null);

    // Sync external editing state with local modal state
    useEffect(() => {
        if (editingSectionId) {
            const section = customSections.find(s => s.id === editingSectionId);
            if (section) {
                setSectionName(section.name);
                setSectionColor(section.color);
                setSectionIcon(section.icon);
                setSelectedCodes(section.productCodes || []);
                setCustomProducts(section.customProducts || []);
                setIsOpen(true);
            }
        }
    }, [editingSectionId, customSections]);

    // Handle Modal Close
    const handleClose = () => {
        setIsOpen(false);
        setTimeout(() => {
            setEditingSection(null);
            resetForm();
        }, 200);
    };

    const resetForm = () => {
        setSectionName("");
        setSectionColor("#22c55e");
        setSectionIcon("start");
        setSelectedCodes([]);
        setCustomProducts([]);
        setSearchTerm("");
        setAdhocName("");
        setAdhocPrice("");
        setAdhocPhoto("");
        setAdhocDescription("");
        setEditingProductCode(null);
        setActiveTab("general");
    };

    const handleSave = () => {
        if (!sectionName) return;

        if (editingSectionId) {
            // Update
            updateCustomSection(editingSectionId, {
                name: sectionName,
                color: sectionColor,
                icon: sectionIcon,
                productCodes: selectedCodes,
                customProducts: customProducts
            });
        } else {
            // Create
            const newSection: CustomSection = {
                id: crypto.randomUUID(),
                name: sectionName,
                color: sectionColor,
                icon: sectionIcon,
                productCodes: selectedCodes,
                customProducts: customProducts,
                order: Date.now(),
            };
            addCustomSection(newSection);
        }
        handleClose();
    };

    const handleDeleteSection = () => {
        if (editingSectionId) {
            deleteCustomSection(editingSectionId);
            handleClose();
        }
    };

    // Product Selection Logic
    const allProducts = Object.values(groupedData).flatMap(cat => cat.products);
    const filteredProducts = allProducts.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.code.toLowerCase().includes(searchTerm.toLowerCase())
    ).slice(0, 20);

    const toggleProductSelection = (code: string) => {
        if (selectedCodes.includes(code)) {
            setSelectedCodes(prev => prev.filter(c => c !== code));
        } else {
            setSelectedCodes(prev => [...prev, code]);
        }
    };

    // Ad-Hoc Product Logic
    const addAdhocProduct = () => {
        if (!adhocName) return;

        if (editingProductCode) {
            // Update existing product
            setCustomProducts(prev => prev.map(p => 
                p.code === editingProductCode 
                    ? {
                        ...p,
                        name: adhocName,
                        price: adhocPrice || "0",
                        photo: adhocPhoto || undefined,
                        originalName: adhocName,
                        info: { ...p.info, specs: adhocDescription }
                    }
                    : p
            ));
            setEditingProductCode(null);
        } else {
            // Create new product
            const newProduct: ProductData = {
                code: `cust-${Date.now()}`,
                name: adhocName,
                price: adhocPrice || "0",
                productCode: null,
                promotion: null,
                color: "",
                show: true,
                showInCatalog: true,
                productPerBox: 1,
                volt: null,
                registered: true, // Needs to be true to show photo/specs
                originalName: adhocName,
                info: { review: "", included: null, specs: adhocDescription },
                photo: adhocPhoto || undefined
            };
            setCustomProducts([...customProducts, newProduct]);
        }

        setAdhocName("");
        setAdhocPrice("");
        setAdhocPhoto("");
        setAdhocDescription("");
    };

    const editAdhocProduct = (product: ProductData) => {
        setEditingProductCode(product.code);
        setAdhocName(product.name);
        setAdhocPrice(product.price);
        setAdhocPhoto(product.photo || "");
        setAdhocDescription(product.info?.specs || "");
    };

    const cancelEditProduct = () => {
        setEditingProductCode(null);
        setAdhocName("");
        setAdhocPrice("");
        setAdhocPhoto("");
        setAdhocDescription("");
    };

    const removeAdhocProduct = (code: string) => {
        setCustomProducts(prev => prev.filter(p => p.code !== code));
        if (editingProductCode === code) {
            cancelEditProduct();
        }
    };

    const IconSelector = () => (
        <div className="flex gap-2 flex-wrap max-h-40 overflow-y-auto p-2 border rounded-md">
            {AVAILABLE_ICONS.map(icon => {
                const IconComp = ComponentsIcons[icon as keyof typeof ComponentsIcons];
                return (
                    <button
                        key={icon}
                        onClick={() => setSectionIcon(icon)}
                        className={`p-2 rounded-md transition-colors ${sectionIcon === icon ? 'bg-primary text-white' : 'hover:bg-gray-100'}`}
                        title={icon}
                    >
                        <IconComp className="size-6" />
                    </button>
                )
            })}
        </div>
    );

    return (
        <>
            <button 
                onClick={() => { setEditingSection(null); setIsOpen(true); }} 
                className="bg-interbrasGreen-500 text-white px-4 py-1 rounded-md hover:bg-interbrasGreen-600 transition text-sm flex items-center gap-2"
            >
                <span>+</span> Crear Sección
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={handleClose}>
                    <div 
                        className="bg-white rounded-lg shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="flex justify-between items-center p-5 border-b">
                            <h2 className="text-xl font-bold">
                                {editingSectionId ? "Editar Sección" : "Crear Sección Personalizada"}
                            </h2>
                            <button 
                                onClick={handleClose}
                                className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
                            >
                                ×
                            </button>
                        </div>

                        {/* Tabs */}
                        <div className="flex border-b">
                            <button
                                onClick={() => setActiveTab("general")}
                                className={`px-6 py-3 text-sm font-medium transition ${activeTab === "general" ? "border-b-2 border-interbrasGreen-500 text-interbrasGreen-500" : "text-gray-600 hover:text-gray-800"}`}
                            >
                                General
                            </button>
                            <button
                                onClick={() => setActiveTab("products")}
                                className={`px-6 py-3 text-sm font-medium transition ${activeTab === "products" ? "border-b-2 border-interbrasGreen-500 text-interbrasGreen-500" : "text-gray-600 hover:text-gray-800"}`}
                            >
                                Productos Catálogo
                            </button>
                            <button
                                onClick={() => setActiveTab("custom")}
                                className={`px-6 py-3 text-sm font-medium transition ${activeTab === "custom" ? "border-b-2 border-interbrasGreen-500 text-interbrasGreen-500" : "text-gray-600 hover:text-gray-800"}`}
                            >
                                Productos Adicionales
                            </button>
                        </div>

                        {/* Body */}
                        <div className="flex-1 overflow-y-auto p-5">
                            {activeTab === "general" && (
                                <div className="flex flex-col gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Nombre</label>
                                        <input
                                            type="text"
                                            placeholder="Mis Favoritos"
                                            value={sectionName}
                                            onChange={(e) => setSectionName(e.target.value)}
                                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-interbrasGreen-500"
                                        />
                                    </div>
                                    
                                    <div className="flex gap-4">
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Color</label>
                                            <input
                                                type="color"
                                                value={sectionColor}
                                                onChange={(e) => setSectionColor(e.target.value)}
                                                className="w-24 h-10 border rounded-md cursor-pointer"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <label className="block text-sm font-medium mb-2">Icono</label>
                                            <IconSelector />
                                        </div>
                                    </div>

                                    {editingSectionId && (
                                        <div className="mt-4 pt-4 border-t">
                                            <button
                                                onClick={handleDeleteSection}
                                                className="w-full px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition"
                                            >
                                                Eliminar Sección Permanentemente
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}

                            {activeTab === "products" && (
                                <div className="flex flex-col gap-4">
                                    <input
                                        type="text"
                                        placeholder="Buscar productos..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-interbrasGreen-500"
                                    />
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-60 overflow-y-auto">
                                        {filteredProducts.map(product => (
                                            <div
                                                key={product.code}
                                                className={`p-2 border rounded-md flex items-center justify-between cursor-pointer transition-colors ${selectedCodes.includes(product.code) ? 'border-interbrasGreen-500 bg-interbrasGreen-50' : 'hover:border-gray-400'}`}
                                                onClick={() => toggleProductSelection(product.code)}
                                            >
                                                <div className="flex items-center gap-2 overflow-hidden">
                                                    {product.photo && <img src={product.photo} className="w-10 h-10 object-contain" alt="" />}
                                                    <div className="min-w-0">
                                                        <p className="text-sm font-medium truncate">{product.name}</p>
                                                        <p className="text-xs text-gray-500">{product.code}</p>
                                                    </div>
                                                </div>
                                                <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${selectedCodes.includes(product.code) ? 'bg-interbrasGreen-500 border-interbrasGreen-500' : 'border-gray-300'}`}>
                                                    {selectedCodes.includes(product.code) && <span className="text-white text-xs">✓</span>}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <p className="text-sm text-gray-500">Seleccionados: {selectedCodes.length}</p>
                                </div>
                            )}

                            {activeTab === "custom" && (
                                <div className="flex flex-col gap-4">
                                    <div className="flex flex-col gap-2 border p-3 rounded-lg bg-gray-50">
                                        <h4 className="font-medium text-sm text-gray-700">
                                            {editingProductCode ? "Editar Producto" : "Nuevo Producto"}
                                        </h4>
                                        <div className="flex gap-2">
                                            <div className="flex-1">
                                                <label className="block text-xs text-gray-600 mb-1">Nombre</label>
                                                <input
                                                    type="text"
                                                    value={adhocName}
                                                    onChange={(e) => setAdhocName(e.target.value)}
                                                    className="w-full px-2 py-1 border rounded text-sm focus:outline-none focus:ring-1 focus:ring-interbrasGreen-500"
                                                />
                                            </div>
                                            <div className="w-24">
                                                <label className="block text-xs text-gray-600 mb-1">Precio</label>
                                                <input
                                                    type="text"
                                                    value={adhocPrice}
                                                    onChange={(e) => setAdhocPrice(e.target.value)}
                                                    className="w-full px-2 py-1 border rounded text-sm focus:outline-none focus:ring-1 focus:ring-interbrasGreen-500"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-xs text-gray-600 mb-1">URL de Foto</label>
                                            <input
                                                type="text"
                                                placeholder="https://..."
                                                value={adhocPhoto}
                                                onChange={(e) => setAdhocPhoto(e.target.value)}
                                                className="w-full px-2 py-1 border rounded text-sm focus:outline-none focus:ring-1 focus:ring-interbrasGreen-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs text-gray-600 mb-1">Descripción / Specs</label>
                                            <textarea
                                                value={adhocDescription}
                                                onChange={(e) => setAdhocDescription(e.target.value)}
                                                rows={2}
                                                className="w-full px-2 py-1 border rounded text-sm focus:outline-none focus:ring-1 focus:ring-interbrasGreen-500"
                                            />
                                        </div>
                                        <div className="flex gap-2 justify-end">
                                            {editingProductCode && (
                                                <button 
                                                    onClick={cancelEditProduct}
                                                    className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
                                                >
                                                    Cancelar
                                                </button>
                                            )}
                                            <button 
                                                onClick={addAdhocProduct}
                                                className="px-3 py-1 text-sm bg-interbrasGreen-500 text-white rounded hover:bg-interbrasGreen-600 transition"
                                            >
                                                {editingProductCode ? "Guardar cambios" : "Agregar a la lista"}
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-2 max-h-60 overflow-y-auto">
                                        {customProducts.length === 0 && <p className="text-gray-400 text-sm italic">No hay productos personalizados agregados.</p>}
                                        {customProducts.map(p => (
                                            <div 
                                                key={p.code} 
                                                className={`flex justify-between items-center p-2 border rounded-md ${editingProductCode === p.code ? 'bg-blue-50 border-blue-300' : 'bg-white'}`}
                                            >
                                                <div className="flex gap-2 items-center overflow-hidden">
                                                    {p.photo && <img src={p.photo} className="w-8 h-8 object-contain rounded" alt="" />}
                                                    <div className="min-w-0">
                                                        <p className="font-medium truncate text-sm">{p.name}</p>
                                                        <p className="text-xs text-gray-500">USD {p.price}</p>
                                                    </div>
                                                </div>
                                                <div className="flex gap-1">
                                                    <button
                                                        onClick={() => editAdhocProduct(p)}
                                                        className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                                                        title="Editar producto"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                        </svg>
                                                    </button>
                                                    <button
                                                        onClick={() => removeAdhocProduct(p.code)}
                                                        className="p-1 text-red-600 hover:bg-red-50 rounded"
                                                        title="Eliminar producto"
                                                    >
                                                        ✕
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="flex justify-end gap-2 p-5 border-t">
                            <button
                                onClick={handleClose}
                                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleSave}
                                className="px-4 py-2 bg-interbrasGreen-500 text-white rounded-md hover:bg-interbrasGreen-600 transition"
                            >
                                {editingSectionId ? "Guardar Cambios" : "Crear Sección"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
