import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Contributions } from "./components/Contributions";
import { TopAppBar } from "./components/TopAppBar";
import { styled, CssBaseline } from "@mui/material";

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

const RootBody = styled("div")(({ theme }) => ({
  padding: theme.spacing(2),
}));

export default App;
