import './App.css';
import 'typeface-roboto';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Welcome from './welcome';
import Login from './login';
import Register from './register';
import Box from '@material-ui/core/Box';
import Clients from './clients';
import Invoices from './invoices/';
import Products from './products/';
import NewInvoice from './invoices/new';
import MainHeader from './header';
import Sidebar from './sidebar';
import Dashboard from './dashboard';
// import Dashboard from './dashboard';
// import Profile from './profile';
import { mediamatch } from "./utils/media.match";
import { getLocalWebToken } from './utils/auth'

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
      authFlag: false,
      userDetails: null,
      userToken: ''
    }
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.setAuthFlagTrue = this.setAuthFlagTrue.bind(this);
  }
  setAuthFlagTrue() {
    this.setState({ authFlag: true })
  }
  toggleDrawer() {
    this.setState({ toggleDrawer: !this.state.toggleDrawer, forcedDrawer: !this.state.forcedDrawer });
  };
  componentDidMount() {
    window.addEventListener("resize", () => {
      this.setState({ breakpoint: mediamatch() })
      if (this.state.breakpoint === ('md' || 'sm') && this.state.forcedDrawer === false) {
        this.setState({ toggleDrawer: false })
      } else {
        this.setState({ toggleDrawer: true })
      }
    });
    // this.setState({ userDetails: checkUserLocalData() })
    // if(!userDetails){
    //   if(getLocalWebToken){
    //     getUserDetails
    //   }
    // }
  }
  render() {
    return (
      <Router>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Route exact path="/" render={(props) => <Welcome {...props} {...this.state} />} />
          <Route exact path="/login" render={(props) => <Login setAuthFlagTrue={this.setAuthFlagTrue} {...props} {...this.state} />} />
          <Route exact path="/register" render={(props) => <Register {...props} {...this.state} />} />
          <Route exact path="/:username/" render={(props) => <Dashboard {...props} {...this.state} />} />
          {/* <Box className="App">
          <Router>
            <MainHeader toggleDrawer={this.toggleDrawer} forcedDrawer={this.forcedDrawer} />
            <Box display="flex">
            <div>
            <Sidebar toggleDrawerState={this.state.toggleDrawer} windowState={this.state.breakpoint} toggleDrawer={this.toggleDrawer} />
            </div>
            <div style={{ width: "100%" }}>
            <Route exact path="/" component={Clients} />
            <Route exact path="/invoices" component={Invoices} />
            <Route exact path="/products" component={Products} />
            <Route exact path="/invoice/new/:id?" component={NewInvoice} />
            </div>
            </Box>
            </Router>
          </Box> */}
        </ThemeProvider>
      </Router>
    );
  }
}

export default App;