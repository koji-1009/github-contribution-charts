import React from "react";
import "./App.css";
import { TokenField } from "./components/TokenField";
import CssBaseline from "@mui/material/CssBaseline";
import { AppBar } from "@mui/material";

function App() {
  return (
    <div className="App">
      <React.Fragment>
        <CssBaseline />
        <TokenField />

      </React.Fragment>
    </div>
  );
}

export default App;
