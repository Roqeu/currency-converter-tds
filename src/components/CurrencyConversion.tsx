import NumberDisplay from "./NumberDisplay.tsx";
import {useConvertedValue} from "../store/currencyDataStore.ts";

export default function CurrencyConversion() {
  const convertedValue = useConvertedValue();

  return(
    <NumberDisplay inputType={"Source"} value={convertedValue} handleChange={()=>{}} isReadOnly={true} />
  )
}