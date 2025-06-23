export const LANGUAGES: Record<string, { code: string; name: string }> = {
  pt: {
    code: "pt",
    name: "Portugues",
  },
  es: {
    code: "es",
    name: "Español",
  },
};

export const defaultLang = "es";
export const showDefaultLang = false;

export const ui = {
  es: {
    "nav.whereWeAre": "Donde estamos",
    "nav.products": "Productos",
    downloads: "Descargas",
    whoWeAre: "Quiénes somos",
  },
  pt: {
    "nav.whereWeAre": "Onde estamos",
    "nav.products": "Produtos",
    downloads: "Downloads",
    whoWeAre: "Quem somos",
  },
} as const;

export const routes = {
  es: {
    downloads: "/descargas",
    products: "/productos",
  },
  pt: {
    downloads: "/downloads",
    products: "/produtos",
  },
};
