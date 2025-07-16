import { useEffect, useState } from "react";

export function useCoverData() {
  const [cover] = useState<string | null>(null);

  useEffect(() => {
    const handler = (e: Event) => ((e as CustomEvent).detail.coverDataUrl);
    window.addEventListener("coverDataUrlUpdated", handler);
    return () => window.removeEventListener("coverDataUrlUpdated", handler);
  }, []);

  return cover;
}
