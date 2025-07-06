import NumberDisplay from "./NumberDisplay.tsx";
import {useCurrencyDataActions} from "../store/currencyDataStore.ts";

export default function CurrencyInput() {

  const { setSourceValue } = useCurrencyDataActions();

  return(
    <NumberDisplay inputType={"Source"} value={0} handleChange={setSourceValue} isReadOnly={false} />
  )
}