import type {CurrencyOptions} from "./ApiInterfaces.ts";

export type CurrencyTypes = 'Source'|'Converted';
export interface CurrencyDropDownInterface {
    currencyType: CurrencyTypes;
    options: CurrencyOptions[];
}

export interface NumberDisplayInterface {
    inputType: CurrencyTypes;
    value: number;
    handleChange?: (value: number) => void;
    isReadOnly: boolean;
}