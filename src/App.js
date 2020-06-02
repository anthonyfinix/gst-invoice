import "./App.css";
import "typeface-roboto";
import React, { useState, useEffect, createContext } from "react";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Snackbar from "@material-ui/core/Snackbar";
import Welcome from "./welcome";
import { getlocalStorageToken } from "./utils/getLocalStrorageToken";
import Loading from "./utils/welcomeLoadingScreen";
import { getSingleUserDetails } from "./api";
import getWindowDimensionsAndState from "./utils/useWindowDimensions";

export const AppContext = createContext();

const theme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

export default function App(props) {
  const [loaded, setloaded] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  }, [notification]);

  if (getlocalStorageToken()) {
    getSingleUserDetails(getlocalStorageToken()).then((response) => {
      setloaded(true);
    });
  }else if(!loaded){
    setloaded(true)
  }

  // if (getlocalStorageToken() || !loaded) {
  //   console.log("checking local Storage");
  //   getSingleUserDetails(getlocalStorageToken()).then((response) => {
  //     setNotification(response);

  // if (user) {
  //   // setNotification(user.error)
  //   setNotification("hai");
  //   return null;
  // } else {
  //   setUserDetails({ ...user });
  // }
  //   });
  // }

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
        setNotification,
      }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {loaded ? (
          <Welcome userDetails={userDetails} setUser={setUser} />
        ) : (
          <Loading />
        )}
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          // key={`${vertical},${horizontal}`}
          open={!!notification}
          // onClose={handleClose}
          message={notification}
        />
      </ThemeProvider>
    </AppContext.Provider>
  );
}
