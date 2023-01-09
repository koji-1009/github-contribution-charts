import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { CssBaseline } from "@mui/material";
import { ApolloProvider } from "@apollo/client";
import { Contributions } from "./components/Contributions";
import { TopAppBar } from "./components/TopAppBar";
import { RootBody } from "./components/RootBody";
import { client } from "./logic/github";

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <CssBaseline />
          <TopAppBar />
          <RootBody>
            <Contributions />
          </RootBody>
        </LocalizationProvider>
      </ApolloProvider>
    </>
  );
}

export default App;
