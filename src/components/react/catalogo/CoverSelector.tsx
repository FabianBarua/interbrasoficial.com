import { getI18NCatalog, getValueFromKey } from "@/i18n";
import React, { useRef, useState, useEffect } from "react";

export const CoverSelector = ({tCat} : {tCat:(k: string) => string}) => {

  const setLabel=tCat("setCover")
  const updateLabel=tCat("updateCover")
  const removeLabel=tCat("removeCover")

  const [coverDataUrl, setCoverDataUrl] = useState<string | null>(null);
  const [coverMime, setCoverMime] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const selectFile = () => {
    inputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setCoverMime(file.type);
    const reader = new FileReader();
    reader.onload = () => {
      setCoverDataUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const removeFile = () => {
    setCoverDataUrl(null);
    setCoverMime(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  useEffect(() => {
    (window as any).catalogCoverDataUrl = coverDataUrl;
    (window as any).catalogCoverMime = coverMime;

    const event = new CustomEvent("coverDataUrlUpdated", {
      detail: { coverDataUrl, coverMime },
    });

    window.dispatchEvent(event);

    return () => {
      (window as any).catalogCoverDataUrl = null;
      (window as any).catalogCoverMime = null;
      window.dispatchEvent(new CustomEvent("coverDataUrlUpdated", { detail: { coverDataUrl: null, coverMime: null } }));
    };
    
  }, [coverDataUrl, coverMime]);

  return (
    <div className="flex items-center gap-2 flex-wrap pointer-events-auto">
      <button
        onClick={selectFile}
        className="bg-interbrasGreen-100 text-interbrasGreen-600 flex-1 px-4 text-nowrap py-1 rounded-md text-sm hover:bg-interbrasGreen-200"
      >
        {coverDataUrl ? updateLabel : setLabel}
      </button>
      <button
        onClick={removeFile}
        className={`bg-red-500 hover:bg-red-600 text-white flex-1 text-nowrap px-4 py-1 rounded-md text-sm ${coverDataUrl ? '' : 'hidden'}`}
      >
        {removeLabel}
      </button>
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleChange} />
    </div>
  );
};
