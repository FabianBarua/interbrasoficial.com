import { Reorder, motion } from "framer-motion";
import { useState } from "react";
import { useCatalogStore } from "./store/useCatalogStore";

export const ReorderModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { selectedProducts, reorderCategories } = useCatalogStore();
  const initialKeys = Object.keys(selectedProducts);
  const [order, setOrder] = useState(initialKeys);

  if (!isOpen) return null;

  const handleSave = () => {
    reorderCategories(order);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white w-full max-w-md rounded-xl p-6 shadow-lg relative">
        <h2 className="text-lg font-semibold mb-4">Reordenar Categorías</h2>

        <Reorder.Group axis="y" values={order} onReorder={setOrder} className="flex flex-col gap-2">
          {order.map((key) => (
            <Reorder.Item
              key={key}
              value={key}
              className="bg-gray-100 px-4 py-2 rounded-md cursor-move text-sm"
            >
              <motion.div>
                {selectedProducts[key]?.categoryName || key}
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
