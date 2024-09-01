import { create } from "zustand";

type State = {
  userName: string;
  accessToken: string;
};

type Action = {
  setUserName: (userName: string) => void;
  setAccessToken: (accessToken: string) => void;
};

const initialState: State = {
  userName: "빵빠레",
  accessToken: "",
};

export const useUserStore = create<State & Action>((set) => ({
  ...initialState,
  setUserName: (userName: string) => set((state) => ({ ...state, userName })),
  setAccessToken: (accessToken: string) =>
    set((state) => ({ ...state, accessToken })),
}));
