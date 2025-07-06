import type {CurrencyConversionInterface} from "../interfaces/PropInterfaces.ts";
import NumberDisplay from "./NumberDisplay.tsx";

export default function CurrencyConversion({
                                             convertedValue
                                            }: CurrencyConversionInterface) {

  return(
    <NumberDisplay inputType={"Source"} value={convertedValue} handleChange={()=>{}} isReadOnly={true} />
  )
}