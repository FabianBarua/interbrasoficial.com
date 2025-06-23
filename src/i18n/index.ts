import portugueseGlobal from "@/i18n/locales/pt/global.json";
import spanishGlobal from "@/i18n/locales/es/global.json";

import spanishProducts from "@/i18n/locales/es/products.json";
import portugueseProducts from "@/i18n/locales/pt/products.json";

import spanishCatalog from "@/i18n/locales/es/catalog.json";
import portugueseCatalog from "@/i18n/locales/pt/catalog.json";


const LANG = {
  PORTUGUESE: "pt",
  SPANISH: "es",
};

export const getI18NCatalog = ({
  currentLocale = "es",
}: {
  currentLocale: string | undefined;
}) => {
  if (currentLocale === LANG.PORTUGUESE)
    return { ...spanishCatalog, ...portugueseCatalog };
  if (currentLocale === LANG.SPANISH)
    return { ...portugueseCatalog, ...spanishCatalog };
  return spanishCatalog;
}


export const getI18NGlobal = ({
  currentLocale = "es",
}: {
  currentLocale: string | undefined;
}) => {
  if (currentLocale === LANG.PORTUGUESE)
    return { ...spanishGlobal, ...portugueseGlobal };
  if (currentLocale === LANG.SPANISH)
    return { ...portugueseGlobal, ...spanishGlobal };
  return spanishGlobal;
};

export const getI18NProducts = ({
  currentLocale = "es",
}: {
  currentLocale: string | undefined;
}) => {
  if (currentLocale === LANG.PORTUGUESE)
    return { ...spanishProducts, ...portugueseProducts };
  if (currentLocale === LANG.SPANISH)
    return { ...portugueseProducts, ...spanishProducts };
  return spanishProducts;
};

export const getValueFromKey = (key: string, obj: any) => {
  let value = "no-translated";
  try {
    value =  key.split(".").reduce((o, i) => o[i], obj);
  } catch (error) {
    console.error("Error getting value from key", key);
  }
  return value;

};
