import type {CurrencyDropDownInterface} from "../interfaces/PropInterfaces.ts";
import {Autocomplete, Box, TextField} from "@mui/material";
import {useCurrencyDataActions, useHasSelectedValue} from "../store/currencyDataStore.ts";
import {useShowErrors} from "../store/errorStore.ts";

export default function CurrencyDropdown({
                                            currencyType,
                                            options
                                         }: CurrencyDropDownInterface) {
    const showErrors = useShowErrors();
    const hasSelectedValue = useHasSelectedValue(currencyType);
    const isError = showErrors&&!hasSelectedValue
    const {setCurrency} = useCurrencyDataActions();

    return (
        <Autocomplete
            fullWidth
            id={`${currencyType}-dropdown-selector`}
            getOptionLabel={(option) => `${option.currencyName} (${option.currencyCode})`}
            options={options}
            onChange={(event: any, newValue: string) => {
                const val = (newValue==null)?"":newValue.currencyCode;
                setCurrency(val, currencyType);
            }}
            renderOption={(props, option) => {
              const { key, ...optionProps } = props;
              return (
                <Box
                  key={key}
                  component="li"
                  sx={{ textAlign: "left" }}
                  {...optionProps}
                >
                  {option.currencyName} ({option.currencyCode})
                </Box>
              );
            }}
            sx={{ borderColor: "red" }}
            renderInput={(params) => (
              <TextField {...params} error={isError} helperText={(isError)?"Please select a value":""} label={`Select ${currencyType.toLowerCase()} currency`} />
            )}
        />
    )
}