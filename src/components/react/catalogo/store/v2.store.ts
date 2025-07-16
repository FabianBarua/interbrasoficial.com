import { create } from "zustand";

export interface v2State {
  iconUrl: string | null;
}

export const v2State: v2State = {
  iconUrl: null,
};

export interface v2Actions {
  setIconUrl: (url: string | null) => void;
}

export const v2Actions = (set: any): v2Actions => ({
    setIconUrl: (url) => set({ iconUrl: url })
});

export const useV2Store = create<v2State & v2Actions>((set) => ({
  ...v2State,
  ...v2Actions(set),
}));
