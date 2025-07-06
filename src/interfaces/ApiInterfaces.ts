export interface CurrencyOptions {
  currencyName: string;
  currencyCode: string;
}

export interface CurrencyResponsePayload {
  id: number;
  name: string;
  short_code: string;
  code: string;
  precision: number;
  subunit: string;
  symbol: string;
  symbol_first: boolean;
  decimal_mark: string;
  thousand_separator: string;
}

export type LoadingState = "CURRENCY_CONVERSION"|"INITIAL_LOAD"|"";