import { useState } from "react";
import { DisplayStats } from "./DisplayStats";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { TextField } from "@mui/material";

export function Contributions() {
  const [from, setFrom] = useState(new Date(2014, 1, 11));

  return (
    <div>
      <DesktopDatePicker
        label="Date desktop"
        value={from}
        onChange={(newValue: Date | null) => {
          if (newValue) {
            setFrom(newValue);
          }
        }}
        renderInput={(params) => <TextField {...params} />}
      />
      <DisplayStats
        userName={"koji-1009"}
        from={"2021-01-01T00:00:00Z"}
        to={"2022-01-01T00:00:00Z"}
      />
    </div>
  );
}
