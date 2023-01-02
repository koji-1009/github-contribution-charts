import React from "react";
import { TokenField } from "./components/TokenField";
import CssBaseline from "@mui/material/CssBaseline";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Contributions } from "./components/Contributions";
import { createTheme, ThemeProvider, useMediaQuery } from "@mui/material";
import { TopAppBar } from "./components/TopAppBar";

function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );

  return (
    <React.Fragment>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <TopAppBar />
          <Contributions />
          <TokenField />
        </ThemeProvider>
      </LocalizationProvider>
    </React.Fragment>
  );
}

export default App;
