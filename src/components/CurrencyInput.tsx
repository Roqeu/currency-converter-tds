import type {CurrencyInputInterface} from "../interfaces/PropInterfaces.ts";
import NumberDisplay from "./NumberDisplay.tsx";

export default function CurrencyInput({
                                        handleChange
                                      }: CurrencyInputInterface) {

  return(
    <NumberDisplay inputType={"Source"} value={0} handleChange={handleChange} isReadOnly={false} />
  )
}