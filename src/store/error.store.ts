import { create } from "zustand";

type State = {
  status: number;
  message: string;
  code: string;
}

type Action = {
  setStatus: (status: number) => void;
  setMessage: (message: string) => void;
  setCode: (code: string) => void;
}

const initialState: State = {
  status: 0,
  message: '',
  code: '',
}

export const useErrorStore = create<State & Action>((set) => ({
  ...initialState,
  setStatus: (status: number) => set((state) => ({ ...state, status })),
  setMessage: (message: string) => set((state) => ({ ...state, message })),
  setCode: (code: string) => set((state) => ({ ...state, code })),
}));
