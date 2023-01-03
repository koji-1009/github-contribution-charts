import { useState } from "react";
import { ContributionResult } from "./ContributionResult";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

export function Contributions() {
  const [username, setUsername] = useState(
    localStorage.getItem("username") ?? ""
  );
  const [to, setTo] = useState(new Date(2022, 1, 1));

  return (
    <Box>
      <FormControl sx={{ m: 1, width: "12ch" }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-username">
          GitHub username
        </InputLabel>
        <OutlinedInput
          id="outlined-adornment-username"
          label="GitHub username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                onClick={() => {
                  localStorage.setItem("username", username);
                }}
                edge="end"
              >
                <EditIcon />
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
      <DatePicker
        views={["year", "month"]}
        label="Year and Month"
        minDate={new Date(2000, 1, 1)}
        maxDate={new Date()}
        value={to}
        onChange={(newValue: Date | null) => {
          if (newValue) {
            setTo(newValue);
          }
        }}
        renderInput={(params) => <TextField {...params} helperText={null} />}
      />
      <ContributionResult username={username} to={to} />
    </Box>
  );
}
