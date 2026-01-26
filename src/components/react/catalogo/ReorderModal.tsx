import { Reorder, motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useCatalogStore } from "./store/useCatalogStore";

export const ReorderModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { selectedProducts, reorderCategories, displayOrder, customSections } = useCatalogStore();
  const [order, setOrder] = useState(displayOrder);

  // Sync state if modal opens with new order logic externally? 
  // Ideally useEffect on displayOrder or key, but usually modal unmounts.
  // Re-initializing state on every render if isOpen toggles is better handled by parent or effect.
  // For simplicity, we assume generic re-render. Ideally use useEffect.
  useEffect(() => {
    setOrder(displayOrder);
  }, [displayOrder, isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    reorderCategories(order);
    onClose();
  };

  const getName = (key: string) => {
    if (selectedProducts[key]) return selectedProducts[key].categoryName;
    const custom = customSections.find(s => s.id === key);
    return custom ? `${custom.name} (Custom)` : key;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white w-full max-w-md rounded-xl p-6 shadow-lg relative max-h-[80vh] overflow-y-auto">
        <h2 className="text-lg font-semibold mb-4">Reordenar Categorías</h2>

        <Reorder.Group axis="y" values={order} onReorder={setOrder} className="flex flex-col gap-2">
          {order.map((key) => (
            <Reorder.Item
              key={key}
              value={key}
              className="bg-gray-100 px-4 py-2 rounded-md cursor-move text-sm"
            >
              <motion.div>
                {getName(key)}
              </motion.div>
            </Reorder.Item>
          ))}
        </Reorder.Group>

        <div className="flex justify-end gap-2 mt-6">
          <button onClick={onClose} className="text-sm text-gray-600 hover:underline">Cancelar</button>
          <button onClick={handleSave} className="bg-black text-white text-sm px-4 py-2 rounded-md">Guardar</button>
        </div>
      </div>
    </div>
  );
};
