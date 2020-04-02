import './App.css';
import 'typeface-roboto';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Drawer, Container, Typography, Paper } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Clients from './clients/client';
import Invoices from './invoices/invoice';
import Products from './products/product';
import NewInvoice from './invoices/newInvoice';



class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      toggleDrawer: false
    }
    this.toggleDrawer = this.toggleDrawer.bind(this)
  }
  toggleDrawer() {
    this.setState({ toggleDrawer: !this.state.toggleDrawer });
  };
  render() {
    return (
      <Paper elevation={0} className="App">
        <Router>
          <AppBar position='static'>
            <Toolbar>
              <IconButton onClick={this.toggleDrawer}>
                <MenuIcon />
              </IconButton>
              <Typography variant="h6">
                GST INVOICE
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer open={this.state.toggleDrawer} onClose={this.toggleDrawer}>
            <List component="nav" aria-label="main mailbox folders" style={{ width: 300 }}>
              <Link onClick={this.toggleDrawer} className="list-group-item" to="/">
                <ListItem button>
                  <ListItemText primary="Clients" />
                </ListItem>
              </Link>
              <Link onClick={this.toggleDrawer} className="list-group-item" to="/invoices">
                <ListItem button>
                  <ListItemText primary="Invoice" />
                </ListItem>
              </Link>
              <Link onClick={this.toggleDrawer} className="list-group-item" to="/products">
                <ListItem button>
                  <ListItemText primary="Products" />
                </ListItem>
              </Link>
            </List>
          </Drawer>
          <Container maxWidth="md">
            <Route exact path="/" component={Clients} />
            <Route exact path="/invoices" component={Invoices} />
            <Route exact path="/products" component={Products} />
            <Route exact path="/invoices/new/:id" component={NewInvoice} />
          </Container>
        </Router>
      </Paper>
    );
  }
}

export default App;