import './App.css'
import {Alert, Card, CardContent, CircularProgress, Grid, Modal} from "@mui/material";
import CurrencyDropdown from "./components/CurrencyDropdown.tsx";
import {useEffect} from "react";
import {getCurrencies} from "./service/appService.ts";
import type {CurrencyOptions} from "./interfaces/ApiInterfaces.ts";
import ConvertButton from "./components/ConvertButton.tsx";
import CurrencyInput from './components/CurrencyInput.tsx';
import CurrencyConversion from "./components/CurrencyConversion.tsx";
import {intialLoad} from "./util/globalStrings.ts";
import {useCurrencyDataActions, useCurrencyList} from "./store/currencyDataStore.ts";
import {useAlertError, useApiStatusActions, useIsInitialLoad} from "./store/apiStatusStore.ts";

function App() {
  // const [currencyList, setCurrencyList] = useState<CurrencyOptions[]>([]);
  const { setCurrencyList } = useCurrencyDataActions();
  const { setSuccessfulApiCall, setFailedApiCall, setAppLoading } = useApiStatusActions();
  const currencyList: CurrencyOptions[] = useCurrencyList();
  const alertError = useAlertError();
  const isInitialLoad = useIsInitialLoad();

  useEffect(() => {
    setAppLoading(intialLoad)
    getCurrencies()
      .then((res: CurrencyOptions[]) => {
        setCurrencyList(res)
        setSuccessfulApiCall()
      })
      .catch((err) => {
        setFailedApiCall(err.message)
      })
  },[])

  return (
    <>
      <Modal
        open={isInitialLoad}
        aria-label={"app loading"}
        sx={{display:'flex',alignItems:'center',justifyContent:'center'}}
      >
        <CircularProgress/>
      </Modal>
      {(alertError!=='')&&<Alert severity="error"><>{alertError}</></Alert>}
      <Card>
          <CardContent>
              <Grid container columnSpacing={2} rowSpacing={2} sx={{justifyContent: "center", alignItems: "center"}}>
                  <Grid size={6}>
                      <CurrencyDropdown
                        currencyType='Source'
                        options={currencyList}
                      />
                  </Grid>
                  <Grid size={6}>
                      <CurrencyDropdown
                        currencyType='Converted'
                        options={currencyList}
                      />
                  </Grid>
                  <Grid size={6}>
                      <CurrencyInput/>
                  </Grid>
                  <Grid size={6}>
                      <CurrencyConversion/>
                  </Grid>
                  <Grid size={4}>
                      <ConvertButton/>
                  </Grid>
              </Grid>
          </CardContent>
      </Card>
    </>
  )
}

export default App
