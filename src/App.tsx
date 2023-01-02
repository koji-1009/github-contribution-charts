import React from "react";
import "./App.css";
import { TokenField } from "./components/TokenField";
import CssBaseline from "@mui/material/CssBaseline";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Contributions } from "./components/Contributions";

function App() {
  return (
    <div className="App">
      <React.Fragment>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <CssBaseline />
          <Contributions />
          <TokenField />
        </LocalizationProvider>
      </React.Fragment>
    </div>
  );
}

export default App;
