import type { GroupedByCategory } from "../types";

export function useToggleProduct(
  data: GroupedByCategory,
  setData: (d: GroupedByCategory) => void,
  selected: GroupedByCategory,
  setSelected: (d: GroupedByCategory) => void
) {
  const toggle = (category: string, code: string) => {
    const toggleIn = (d: GroupedByCategory) => {
      const p = d[category]?.products.find(p => p.code === code);
      if (p) p.showInCatalog = !p.showInCatalog;
    };

    const newData: GroupedByCategory = { ...data };
    toggleIn(newData);
    setData(newData);

    const newSelected: GroupedByCategory = { ...selected };
    toggleIn(newSelected);
    setSelected(newSelected);
  };

  return toggle;
}
