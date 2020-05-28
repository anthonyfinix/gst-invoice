import React from 'react';
import { Redirect, Route } from 'react-router-dom';

export default function PrivateRoute({ component: Component, ...props }) {
    if (props.userDetails) {
        return <Route {...props} render={(props) => <Component {...props} />} />
    } else {
        return <Route {...props} render={(props) => <Redirect to={'/login'} />} />
    }
}