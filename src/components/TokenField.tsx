import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";

export function TokenField() {
  const [token, setToken] = useState(localStorage.getItem("token") ?? "");

  return (
    <Box>
      <p>
        Personal Access Token
        <input
          type="text"
          value={token}
          onChange={(e) => {
            setToken(e.target.value);
          }}
        />
      </p>
      <TextField></TextField>
      <Button
        variant="outlined"
        onClick={() => {
          localStorage.setItem("token", token);
        }}
      >
        Save
      </Button>
    </Box>
  );
}
