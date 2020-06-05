import "./App.css";
import "typeface-roboto";
import React, { useState, createContext } from "react";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { getlocalStorageToken } from "./utils/getLocalStrorageToken";
import Loading from "./utils/welcomeLoadingScreen";
import { getSingleUserDetails } from "./api";
import getWindowDimensionsAndState from "./utils/useWindowDimensions";
import Welcome from './welcome'

export const AppContext = createContext();

const theme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

export default function App(props) {
  const [loaded, setloaded] = useState(false);
  const [userDetails, setUserDetails] = useState(null);

  console.log("app component ran");
  if (getlocalStorageToken() && userDetails === null) {
    getSingleUserDetails(getlocalStorageToken()).then((response) => {
      setUserDetails({ ...response });
      setloaded(true);
    });
  } else if (!loaded) {
    setloaded(true);
  }
  const setUser = (user) => {
    return new Promise((resolve, reject) => {
      setUserDetails({ ...user });
      return resolve(user);
    });
  };

  return (
    <AppContext.Provider
      value={{
        appDetails: {
          user: { ...userDetails },
          windowDimensions: getWindowDimensionsAndState(),
        },
        setUserDetails,
      }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {loaded ? <Welcome setUser={setUser} /> : <Loading />}
      </ThemeProvider>
    </AppContext.Provider>
  );
}
