import React from "react";
import Box from "@material-ui/core/Box";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import AppProvider from "./contexts/appContext";
import Welcome from "./components/welcome";
import Main from "./components/main";
import Register from "./components/register";
import Login from "./components/login";
import ProtectedRoute from '../src/components/protectedRoute';
import UserProvider from "./contexts/userContext";
function App() {
  return (
    <Box className="App" display="flex" flexDirection="column">
      <Router>
        <AppProvider>
          <UserProvider>
            <Switch>
              <Route exact path="/" component={Welcome} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <ProtectedRoute path="/app" component={Main} />
            </Switch>
          </UserProvider>
        </AppProvider>
      </Router>
    </Box>
  );
}

export default App;
