import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { UserContext } from '../../contexts/userContext';
function ProtectedRoute({ component: Component, ...props }) {
    let { user } = React.useContext(UserContext);
    return <Route {...props} render={(props) => !!user ? <Component {...props} /> : <Redirect to="/login" />} />
}
export default ProtectedRoute;