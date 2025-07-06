import './App.css'
import {Alert, Card, CardContent, CircularProgress, Grid, Modal} from "@mui/material";
import CurrencyDropdown from "./components/CurrencyDropdown.tsx";
import {useEffect, useState} from "react";
import {convertValue, getCurrencies} from "./service/appService.ts";
import type {CurrencyOptions, LoadingState} from "./interfaces/ApiInterfaces.ts";
import type {CurrencyTypes} from "./interfaces/PropInterfaces.ts";
import ConvertButton from "./components/ConvertButton.tsx";
import CurrencyInput from './components/CurrencyInput.tsx';
import CurrencyConversion from "./components/CurrencyConversion.tsx";

function App() {
  const [currencyList, setCurrencyList] = useState<CurrencyOptions[]>([]);
  const [sourceCurrency, setSourceCurrency] = useState<string>('');
  const [convertedCurrency, setConvertedCurrency] = useState<string>('');
  const [sourceValue, setSourceValue] = useState<number>(0);
  const [convertedValue, setConvertedValue] = useState<number>(0);
  const [appLoading, setAppLoading] = useState<LoadingState>('');
  const [showError, setShowError] = useState<boolean>(false);
  const [alertError, setAlertError] = useState<string>('');

  useEffect(() => {
    setAppLoading("INITIAL_LOAD")
    getCurrencies()
      .then((res: CurrencyOptions[]) => {
        setCurrencyList(res)
        setAppLoading("")
        setAlertError("")
      })
      .catch(() => {
        setAlertError("Something went wrong fetching currency list.\nPlease check thst you have provided a valid API_KEY and the CurrencyBeacon is live.")
      })
  },[])

  useEffect(() => {
    console.log(convertedValue)
  },[convertedValue])

  function handleChange(chosenCurrency: string, currencyType: CurrencyTypes) {
    if(currencyType==='Source') setSourceCurrency(chosenCurrency)
    else setConvertedCurrency(chosenCurrency)
  }

  function convertCurrency() {
    if(convertedCurrency!==""&&sourceCurrency!=="") {
      setShowError(false)
      setAppLoading("CURRENCY_CONVERSION")
      convertValue(sourceCurrency, convertedCurrency, sourceValue)
        .then((res: number) => {
          setConvertedValue(res);
          setAppLoading("")
          setAlertError("")
        })
        .catch((err: Error) => {
          console.log(err)
          setAppLoading("")
        })
    } else {
      setShowError(true)
    }

  }

  return (
    <>
      <Modal open={appLoading==="INITIAL_LOAD"} aria-label={"app loading"}><CircularProgress/></Modal>
      {(alertError!=='')&&<Alert severity="error"><>{alertError}</></Alert>}
      <Card>
          <CardContent>
              <Grid container columnSpacing={2} rowSpacing={2} sx={{justifyContent: "center", alignItems: "center"}}>
                  <Grid size={6}>
                      <CurrencyDropdown
                        currencyType='Source'
                        options={currencyList}
                        handleChange={handleChange}
                        isError={showError&&sourceCurrency===""}
                      />
                  </Grid>
                  <Grid size={6}>
                      <CurrencyDropdown
                        currencyType='Converted'
                        options={currencyList}
                        handleChange={handleChange}
                        isError={showError&&convertedCurrency===""}
                      />
                  </Grid>
                  <Grid size={6}>
                      <CurrencyInput handleChange={setSourceValue}/>
                  </Grid>
                  <Grid size={6}>
                      <CurrencyConversion convertedValue={convertedValue}/>
                  </Grid>
                  <Grid size={4}>
                      <ConvertButton
                        startConversion={convertCurrency}
                        loading={appLoading==='CURRENCY_CONVERSION'}
                      />
                  </Grid>
              </Grid>
          </CardContent>
      </Card>
    </>
  )
}

export default App
