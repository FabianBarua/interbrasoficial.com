import { useVersionStore } from "../store/useVersionStore";

export const useVersionManager = () => {
  const { currentVersion, updateVersion, resetVersion } = useVersionStore();
  
  return {
    currentVersion,
    updateVersion,
    resetVersion
  };
};
