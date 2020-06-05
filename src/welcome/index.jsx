import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Hero from '../hero';
import Login from '../login';
import Register from '../register';
import Default from '../default';
import AppLayout from '../appLayout';
import PrivateRoute from '../utils/privateRoute';

export default (props) => {
    console.log('router component ran')
    const { setUser } = props;
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={() => <Hero {...props} />} />
                <Route exact path="/login" render={(props) => <Login {...props} setUser={setUser} />} />
                <Route exact path="/register" render={(props) => <Register {...props} />} />
                <PrivateRoute path='/app' component={AppLayout} {...props} />
                <Route exact path="*" component={Default} />
            </Switch>
        </Router>
    )
}