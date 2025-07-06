import {Button} from "@mui/material";
import {conversionLoad} from "../util/globalStrings.ts";
import {convertValue} from "../service/appService.ts";
import {useApiStatusActions, useIsConvertLoading} from "../store/apiStatusStore.ts";
import {
  useConvertedCurrency,
  useCurrencyDataActions,
  useSourceCurrency,
  useSourceValue
} from "../store/currencyDataStore.ts";
import {useErrorStoreActions} from "../store/errorStore.ts";

export default function ConvertButton() {
  const loading = useIsConvertLoading();
  const convertedCurrency = useConvertedCurrency();
  const sourceCurrency = useSourceCurrency();
  const sourceValue = useSourceValue();
  const { setSuccessfulApiCall, setFailedApiCall, setAppLoading } = useApiStatusActions();
  const { setConvertedValue } = useCurrencyDataActions();
  const { setShowErrors, setHideErrors } = useErrorStoreActions();

  function convertCurrency() {
    console.log(convertedCurrency)
    console.log(sourceCurrency)
    if(convertedCurrency!==""&&sourceCurrency!=="") {
      setHideErrors()
      setAppLoading(conversionLoad)
      convertValue(sourceCurrency, convertedCurrency, sourceValue)
        .then((res: number) => {
          console.log(res)
          setConvertedValue(res);
          setSuccessfulApiCall();
        })
        .catch((err: Error) => {
          setFailedApiCall(err.message)
        })
    } else {
      setShowErrors();
    }

  }
  return (
    <Button
      variant="contained"
      onClick={convertCurrency}
      loading={loading}
      aria-label={(loading)?"fetching converted currency data":"convert provided value"}
    >
      Convert
    </Button>
  )
}