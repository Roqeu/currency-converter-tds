import type {CurrencyOptions} from "./ApiInterfaces.ts";

export type CurrencyTypes = 'Source'|'Converted';
export interface CurrencyDropDownInterface {
    currencyType: CurrencyTypes;
    options: CurrencyOptions[];
    handleChange: (selectedValue: string, currencyType: CurrencyTypes) => void;
    isError: boolean;
}

export interface NumberDisplayInterface {
    inputType: CurrencyTypes;
    value: number;
    handleChange?: (value: number) => void;
    isReadOnly: boolean;
}

export interface CurrencyInputInterface {
    handleChange: (value: number) => void;
}

export interface CurrencyConversionInterface {
    convertedValue: number;
}

export interface ConvertButtonInterface {
    startConversion: () => void;
    loading: boolean;
}