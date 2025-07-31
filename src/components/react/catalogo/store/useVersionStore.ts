import { create } from "zustand";

// ESTO SIRVE PARA CONTROLAR LA VERSION DEL ESTILO DE CATALOGOS, EJEMPLO, V1, V2, VERSION PROMO, ETC.

export const ALL_VERSIONS = {
  V1: {
    id: "V1",
    name: "V1",
    description: "Versión 1 del catálogo"
  },
  V2_2: {
    id: "V2_2",
    name: "V2",
    description: "Versión 2 del catálogo"
  },
  SaltoHack: {
    id: "SaltoHack",
    name: "SaltoHack",
    description: "Versión especial para Saltos Liquida Tudo - Temática Hacker"
  }
 }

 interface Version {
  id: string;
  name: string;
  description: string;
 }

interface VersionState {
  currentVersion: Version;
}

interface VersionActions {
  updateVersion: (version: Version) => void;
  resetVersion: () => void;
}

export const useVersionStore = create<VersionState & VersionActions>((set) => ({
  currentVersion: ALL_VERSIONS.V2_2,
  updateVersion: (version: Version) => set({ currentVersion: version }),
  resetVersion: () => set({ currentVersion: ALL_VERSIONS.V2_2 })
}));


export const useCurrentVersion = () => {
  const { currentVersion, updateVersion } = useVersionStore();
  return {
    currentVersion,
    updateVersion
  };
};