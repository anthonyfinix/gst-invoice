import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { AppContext } from "../App";

export default function PrivateRoute({ component: Component, ...props }) {
  const {
    appDetails: { user },
  } = useContext(AppContext);

  if (user.name) {
    return <Route {...props} render={(props) => <Component {...props} />} />;
  } else {
    return <Route {...props} render={(props) => <Redirect to={"/login"} />} />;
  }
}
