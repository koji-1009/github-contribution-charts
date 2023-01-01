import React from "react";
import "./App.css";
import { TokenField } from "./TokenField";
import CssBaseline from "@mui/material/CssBaseline";

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
