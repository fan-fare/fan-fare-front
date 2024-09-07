import { create } from "zustand";

const errorTimeout = 3000;

type State = {
  status: number;
  message: string;
  code: string;
};

type Action = {
  setError: (status: number, message: string, code: string) => void;
};

const initialState: State = {
  status: 0,
  message: "",
  code: "",
};

export const useErrorStore = create<State & Action>((set) => ({
  ...initialState,
  // 1s after reset
  setError: (status: number, message: string, code: string) => {
    set((state) => ({ ...state, status, message, code }));
    setTimeout(() => {
      set((state) => ({ ...state, status: 0, message: "", code: "" }));
    }, errorTimeout);
  },
}));
