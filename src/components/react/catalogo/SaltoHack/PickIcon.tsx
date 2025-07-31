import React, { useRef } from "react";
import { useV2Store } from "../store/v2.store";


export const PikIcon = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const iconUrl = useV2Store((state) => state.iconUrl);
  const setIconUrl = useV2Store((state) => state.setIconUrl);

  const handleButtonClick = () => {
    if (iconUrl) {
      // Remover ícone
      setIconUrl(null);
      if (inputRef.current) inputRef.current.value = "";
    } else {
      // Selecionar ícone
      inputRef.current?.click();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setIconUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex items-center gap-2 flex-wrap pointer-events-auto flex-1">
      <button
        onClick={handleButtonClick}
        className={`${
          iconUrl
            ? "bg-red-500 hover:bg-red-600 text-white"
            : "bg-interbrasGreen-100 text-interbrasGreen-600 hover:bg-interbrasGreen-200"
        } flex-1 px-4 w-full text-nowrap py-1 rounded-md text-sm`}
      >
        {iconUrl ? "Remover Ícone" : "Adicionar Ícone"}
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleChange}
      />
    </div>
  );
};
