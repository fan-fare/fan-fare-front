import { create } from "zustand";

type State = {
  userName: string;
  loggedIn: boolean;
  accessToken: string;
};

type Action = {
  setUserName: (userName: string) => void;
  setLoggedIn: (loggedIn: boolean) => void;
  setAccessToken: (accessToken: string) => void;
};

const initialState: State = {
  userName: "빵빠레",
  loggedIn: false,
  accessToken: "",
};

export const useUserStore = create<State & Action>((set) => ({
  ...initialState,
  setUserName: (userName: string) => set((state) => ({ ...state, userName })),
  setLoggedIn: (loggedIn: boolean) => set((state) => ({ ...state, loggedIn })),
  setAccessToken: (accessToken: string) =>
    set((state) => ({ ...state, accessToken })),
}));
