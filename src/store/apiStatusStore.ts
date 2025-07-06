import { create } from "zustand";
import type {LoadingState} from "../interfaces/ApiInterfaces.ts";
import {conversionLoad, intialLoad} from "../util/globalStrings.ts";

interface ApiStatusState {
  appLoading: LoadingState;
  alertError: string;
}
const useApiStatusStore = create((set) => ({
  appLoading: '',
  alertError: '',
  actions: {
    setAppLoading: (newAppLoadignStatus: string) =>
      set((state: ApiStatusState) => ({appLoading: newAppLoadignStatus})),
    setSuccessfulApiCall: () =>
      set((state: ApiStatusState) => ({appLoading: "", alertError: ""})),
    setFailedApiCall: (errorMessage: string) =>
      set((state: ApiStatusState) => ({appLoading: "", alertError: errorMessage})),
  },
}))

export const useIsInitialLoad = () => useApiStatusStore((state) => state.appLoading===intialLoad);
export const useIsConvertLoading = () => useApiStatusStore((state) => state.appLoading===conversionLoad);
export const useAlertError = () => useApiStatusStore((state) => state.alertError);

// 🎉 one selector for all our actions
export const useApiStatusActions = () =>
  useApiStatusStore((state) => state.actions)