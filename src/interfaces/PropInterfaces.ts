import type {CurrencyOptions} from "./ApiInterfaces.ts";
import {convertedCurrencyType, sourceCurrencyType} from "../util/globalStrings.ts";

export type CurrencyTypes = sourceCurrencyType|convertedCurrencyType;
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