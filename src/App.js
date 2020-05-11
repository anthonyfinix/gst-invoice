import './App.css';
import 'typeface-roboto';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Clients from './clients';
import Invoices from './invoices/';
import Products from './products/product';
import NewInvoice from './invoices/new';
import MainHeader from './header';
import Sidebar from './sidebar';
import { mediamatch } from "./utils/media.match";

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
    }
    this.toggleDrawer = this.toggleDrawer.bind(this);
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
  }
  render() {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box className="App">
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
        </Box>
      </ThemeProvider>
    );
  }
}

export default App;