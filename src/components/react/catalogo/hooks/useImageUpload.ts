import { useState, useRef, useCallback } from "react";

interface UseImageUploadReturn {
  customImage: string | null;
  inputRef: React.RefObject<HTMLInputElement>;
  handleImageAction: () => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  clearImage: () => void;
  setCustomImage: React.Dispatch<React.SetStateAction<string | null>>;
}

export const useImageUpload = ({
  categoryKey,
  currentLocale
}: { categoryKey: string; currentLocale: string }): UseImageUploadReturn => {
  const [customImage, setCustomImage] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleImageAction = useCallback(() => {
    if (customImage) {
      // Si ya hay una imagen, la borramos
      setCustomImage(null);
      localStorage.removeItem(`${categoryKey}_${currentLocale}`);
    } else {
      // Si no hay imagen, abrimos el selector de archivos
      if (inputRef.current) {
        inputRef.current.click();
      }
    }
  }, [customImage]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validar tipo de archivo
      if (!file.type.startsWith('image/')) {
        alert('Por favor, selecciona solo archivos de imagen');
        return;
      }
      
      // Validar tamaño (máximo 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('El archivo es demasiado grande. Máximo 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setCustomImage(reader.result as string);
        localStorage.setItem(`${categoryKey}_${currentLocale}`, reader.result as string);
      };
      reader.readAsDataURL(file);
    }
    // Limpiar el input para permitir seleccionar el mismo archivo otra vez
    e.target.value = '';
  }, []);

  const clearImage = useCallback(() => {
    setCustomImage(null);
    localStorage.removeItem(`${categoryKey}_${currentLocale}`);
  }, []);

  return {
    customImage,
    inputRef,
    handleImageAction,
    handleChange,
    clearImage,
    setCustomImage
  };
};
