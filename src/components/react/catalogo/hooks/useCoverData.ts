import { useEffect, useState } from "react";

export function useCoverData() {
  const [cover, setCover] = useState<string | null>(null);

  useEffect(() => {
    const handler = (e: Event) => setCover((e as CustomEvent).detail.coverDataUrl);
    window.addEventListener("coverDataUrlUpdated", handler);
    return () => window.removeEventListener("coverDataUrlUpdated", handler);
  }, []);

  return cover;
}
