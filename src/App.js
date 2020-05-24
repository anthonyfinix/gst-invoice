import './App.css';
import 'typeface-roboto';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Welcome from './welcome';
import Login from './login';
import Register from './register';
import AppLayout from './appLayout';
// import Dashboard from './dashboard';
// import Profile from './profile';
import { mediamatch } from "./utils/media.match";
import { getlocalStorageToken, PrivateRoute } from './utils';
import { getSingleUserDetails } from './api';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
  }
})

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleDrawer: true,
      breakpoint: '',
      forcedDrawer: false,
      redirectTo: null,
      userDetails: null,
      isAuthenticated: false,
    }
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.setUser = this.setUser.bind(this);
    if (getlocalStorageToken()) {
      console.log('getting data')
      getSingleUserDetails(getlocalStorageToken()).then(user => this.setState({ isAuthenticated: true, userDetails: { ...user } }))
    }
  }
  setUser(user) {
    return new Promise((resolve, reject) => {
      this.setState({ userDetails: { ...user } })
      // this.state.userDetails = { ...user }
      return resolve(this.state.userDetails);
    })
  }

  toggleDrawer() {
    this.setState({ toggleDrawer: !this.state.toggleDrawer, forcedDrawer: !this.state.forcedDrawer });
  };

  render() {
    return (
      <Router>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Route exact path="/" render={(props) => <Welcome {...props} {...this.state} />} />
          <Route exact path="/login" render={(props) => <Login setUser={this.setUser} {...props} {...this.state} />} />
          <Route exact path="/register" render={(props) => <Register {...props} {...this.state} />} />
          <PrivateRoute path='/app' component={AppLayout} {...this.state} />
        </ThemeProvider>
      </Router>
    );
  }
}

export default App;