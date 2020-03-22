import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Clients from './clients/client';
import Invoices from './invoices/invoice';
import Products from './products/product';

function App() {
  return (
    <div className="App container-fluid">
      <Router>
        <main className="App-header row">
          <div className="sidebar col-md-3 p-3">
            <h3>Sidebar</h3>
            <ul className="list-group">
              <Link className="list-group-item" to="/">Clients</Link>
              <Link className="list-group-item" to="/invoices">Invoice</Link>
              <Link className="list-group-item" to="/products">Products</Link>
            </ul>
          </div>
          <div className="main col-md-9 p-3">
            <Route exact path="/" component={Clients} />
            <Route exact path="/invoices" component={Invoices} />
            <Route exact path="/products" component={Products} />
          </div>
        </main>
      </Router>
    </div>
  );
}

export default App;