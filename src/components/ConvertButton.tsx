import type {ConvertButtonInterface} from "../interfaces/PropInterfaces.ts";
import {Button} from "@mui/material";

export default function ConvertButton({
                                        startConversion,
                                        loading
                                      }: ConvertButtonInterface) {

  return (
    <Button
      variant="contained"
      onClick={startConversion}
      loading={loading}
      aria-label={(loading)?"fetching converted currency data":"convert provided value"}
    >
      Convert
    </Button>
  )
}