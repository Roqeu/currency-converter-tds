import type {NumberDisplayInterface} from "../interfaces/PropInterfaces.ts";
import {TextField} from "@mui/material";
import {type ChangeEvent, useEffect, useState} from "react";

export default function NumberDisplay({
                                inputType,
                                value,
                                handleChange,
                                isReadOnly
                             }: NumberDisplayInterface) {
  const [currencyValue, setCurrencyValue] = useState<number>(value)

  useEffect(() => {setCurrencyValue(value)},[value])

  function updateValue(newValue: number) {
    if(handleChange)handleChange(newValue);
    setCurrencyValue(newValue);
  }
  return (
    <TextField
      fullWidth
      id={`${inputType}-input`}
      label={`Input ${inputType} Value`}
      variant="standard"
      type={"number"}
      value={currencyValue}
      sx={{marginRight: "4em"}}
      onChange={(event: ChangeEvent<HTMLInputElement>) => {updateValue(Number(event.target.value))}}
      slotProps={{
        input: {
          readOnly: isReadOnly,
        },
      }}
    />
  )
}