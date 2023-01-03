import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Contributions } from "./components/Contributions";
import { TopAppBar } from "./components/TopAppBar";
import { CssBaseline } from "@mui/material";
import { RootBody } from "./components/RootBody";

function App() {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CssBaseline />
        <TopAppBar />
        <RootBody>
          <Contributions />
        </RootBody>
      </LocalizationProvider>
    </>
  );
}

export default App;
