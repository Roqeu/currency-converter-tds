import { create } from "zustand";
import type {CurrencyOptions} from "../interfaces/ApiInterfaces.ts";
import type {CurrencyTypes} from "../interfaces/PropInterfaces.ts";

interface CurrencyDataState {
  currencyList: CurrencyOptions[];
  sourceCurrencyData: {
    sourceCurrencyCode: string;
    sourceCurrencyValue: number;
  };
  convertedCurrencyData: {
    convertedCurrencyCode: string;
    convertedCurrencyValue: number;
  }
}
const useCurrencyDataStore = create((set) => ({
  currencyList: [],
  sourceCurrencyData: {
    sourceCurrencyCode: '',
    sourceCurrencyValue: 0
  },
  convertedCurrencyData: {
    convertedCurrencyCode: '',
    convertedCurrencyValue: 0
  },
  actions: {
    setCurrency: (newSourceCurrency: string, currencyType: CurrencyTypes) => set((state: CurrencyDataState) => {
      if(currencyType==='Source') return ({...state, sourceCurrencyData: {...state.sourceCurrencyData, sourceCurrencyCode: newSourceCurrency}})
      else return ({...state, convertedCurrencyData: {...state.convertedCurrencyData, convertedCurrencyCode: newSourceCurrency}})
    }),
    setConvertedCurrency: (newConvertedCurrency: string) =>
      set((state: CurrencyDataState) => ({convertedCurrencyData: {...state.convertedCurrencyData, convertedCurrencyCode: newConvertedCurrency}})),
    setSourceValue: (newSourceValue: number) =>
      set((state: CurrencyDataState) => ({sourceCurrencyData: {...state.sourceCurrencyData, sourceCurrencyValue: newSourceValue}})),
    setConvertedValue: (newConvertedValue: number) =>
      set((state: CurrencyDataState) => ({convertedCurrencyData: {...state.convertedCurrencyData, convertedCurrencyValue: newConvertedValue}})),
    setCurrencyList: (newCurrencyList: CurrencyOptions[]) => set({currencyList: newCurrencyList}),
  },
}))

export const useCurrencyList: () => CurrencyOptions[] = () => useCurrencyDataStore((state) => state.currencyList);
export const useSourceCurrency = () => useCurrencyDataStore((state) => state.sourceCurrencyData.sourceCurrencyCode);
export const useSourceValue = () => useCurrencyDataStore((state) => state.sourceCurrencyData.sourceCurrencyValue);
export const useConvertedCurrency = () => useCurrencyDataStore((state) => state.convertedCurrencyData.convertedCurrencyCode);
export const useConvertedValue = () => useCurrencyDataStore((state) => state.convertedCurrencyData.convertedCurrencyValue);
export const useHasSelectedValue = (currencyType: CurrencyTypes) => useCurrencyDataStore((state) => (currencyType==='Source')?state.sourceCurrencyData.sourceCurrencyValue!=='':state.convertedCurrencyData.convertedCurrencyValue!=='');
// 🎉 one selector for all our actions
export const useCurrencyDataActions = () =>
  useCurrencyDataStore((state) => state.actions)