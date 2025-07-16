import { useImageUpload } from "../hooks/useImageUpload";

interface ImageUploaderProps {
  className?: string;
}

export const ImageUploader = ({ className = "" }: ImageUploaderProps) => {
  const { customImage, inputRef, handleImageAction, handleChange } = useImageUpload();

  return (
    <div className={`w-full flex flex-col items-center justify-center ${className}`}>
      <input 
        type="file" 
        hidden
        accept="image/*"
        onChange={handleChange}
        ref={inputRef}
      />
      
      <button
        data-hide={true}
        className="text-sm px-4 py-3 text-nowrap bg-interbrasGreen-600 text-white hover:bg-interbrasGreen-700 transition-colors w-full font-medium"
        onClick={handleImageAction}
        aria-label={customImage ? "Borrar imagen personalizada" : "Subir imagen personalizada para la categoría"}
      >
        {customImage ? "🗑️ Borrar Imagen" : "📁 Subir Imagen"}
      </button>
      
      {customImage && (

          <img
            id="catalogSection"
            src={customImage}
            alt="Imagen personalizada"
            className="w-full h-auto"
          />

      )}
    </div>
  );
};
