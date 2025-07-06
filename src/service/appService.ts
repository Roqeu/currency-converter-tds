import type {CurrencyOptions, CurrencyResponsePayload} from "../interfaces/ApiInterfaces.ts";

const baseUrl = 'https://api.currencybeacon.com/v1/'

// core fetch function
async function callCurrencyBeacon(endpoint: string): Promise<any> {
    const res = await fetch(baseUrl + endpoint, {
        method: 'GET',
        headers: {
            "Authorization": `Bearer ${import.meta.env.VITE_CURRENCY_BEACON_KEY}`
        }
    })
    const parsedResponse = await res.json()
    const parsedStatusCode = handleStatusCodes(parsedResponse.meta.code)
    if(parsedStatusCode!=="") throw new Error(parsedStatusCode);
    return parsedResponse.response
}
// get currencies
export async function getCurrencies(): Promise<CurrencyOptions[]> {
    return new Promise((resolve, reject) => {
        callCurrencyBeacon('currencies')
          .then(res => {
            if(res == undefined) reject();
            resolve(res.map((currency: CurrencyResponsePayload) => {return {currencyName: currency.name, currencyCode: currency.short_code}}))
        })
        .catch(reject);
    })
}
// convert value
export async function convertValue(sourceCurrency: string, destinationCurrency: string, value: number): Promise<number> {
    const endpoint = `convert?from=${sourceCurrency}&to=${destinationCurrency}&amount=${value}`;
    return new Promise((resolve, reject) => {
        callCurrencyBeacon(endpoint)
          .then(res => {
            if(res == undefined) reject();
            resolve(res.value)
          })
          .catch(reject);
    })
}

function handleStatusCodes(statusCode: number) {
    if(statusCode == 200) return '';
    if(statusCode == 401) return 'Authorization error, please make sure you have provided a valid CurrencyBeacon API_Key in the .env file';
    if(statusCode == 501 || statusCode == 503) return 'CurrencyBeacon is unavailable, please check their main site for details and try again later';
    return 'Unkown API error'
}