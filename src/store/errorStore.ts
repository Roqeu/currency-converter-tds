import { create } from "zustand";
import type {LoadingState} from "../interfaces/ApiInterfaces.ts";

interface ErrorState {
  showError: LoadingState;
}
const useApiStatusStore = create((set) => ({
  showError: false,
  actions: {
    setHideErrors: () =>
      set((state: ErrorState) => ({showError: false})),
    setShowErrors: () =>
      set((state: ErrorState) => ({showError: true})),
  },
}))

export const useShowErrors = () => useApiStatusStore((state) => state.showError);

// 🎉 one selector for all our actions
export const useErrorStoreActions = () =>
  useApiStatusStore((state) => state.actions)