import { useState } from "react";
import {
  Box,
  FormControl,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  Typography,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";

export function TokenField() {
  const [token, setToken] = useState(localStorage.getItem("token") ?? "");

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Typography>Personal Access Token</Typography>
        </Grid>
        <Grid item xs={8}>
          <FormControl variant="standard">
            <Input
              type="standard"
              value={token}
              onChange={(e) => {
                setToken(e.target.value);
              }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => {
                      localStorage.setItem("token", token);
                    }}
                    edge="end"
                  >
                    <SaveIcon />
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
}
