import { useState } from "react";
import { DisplayStats } from "./DisplayStats";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { Box, TextField } from "@mui/material";
import { formatISO, subYears } from "date-fns";

export function Contributions() {
  const [to, setTo] = useState(new Date(2022, 1, 1));

  return (
    <Box>
      <DesktopDatePicker
        label="Date desktop"
        value={to}
        onChange={(newValue: Date | null) => {
          if (newValue) {
            setTo(newValue);
          }
        }}
        renderInput={(params) => <TextField {...params} />}
      />
      <DisplayStats
        userName={"koji-1009"}
        from={formatISO(subYears(to, 1))}
        to={formatISO(to)}
      />
    </Box>
  );
}
