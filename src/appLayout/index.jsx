import React, { useState, useEffect, useContext } from 'react';
import Box from '@material-ui/core/Box';
import Clients from './clients';
import Invoices from './invoices/';
import Products from './products/';
import NewInvoice from './invoices/new';
import MainHeader from './header';
import Sidebar from './sidebar';
import Dashboard from './dashboard';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { AppContext } from '../App';

export default (props) => {
    const { appDetails: { windowDimensions } } = useContext(AppContext);
    const [drawerState, setDrawerState] = useState((windowDimensions.state === 'sm' ? false : true));
    const [forcedDrawerState, setforcedDrawerState] = useState(false);
    const toggleDrawerState = () => {
        setDrawerState(!drawerState)
    }
    useEffect(() => {
        windowDimensions.state === 'md' && forcedDrawerState === false ? setDrawerState(false) : setDrawerState(true)
    }, [windowDimensions.state])
    

    const handleHeaderToggleDrawerClick = () => {
        setDrawerState(!drawerState)
        setforcedDrawerState(!forcedDrawerState)
    }

    return (
        <Box className="App">
            <Router>
                <MainHeader {...props} toggleDrawer={handleHeaderToggleDrawerClick} />
                <Box display="flex">
                    <div>
                        <Sidebar
                            {...props}
                            toggleDrawerState={toggleDrawerState}
                            drawerState={drawerState}
                            windowState={windowDimensions.state}
                        />
                    </div>
                    <div style={{ width: "100%" }}>
                        <Route exact path={`${props.match.path}/`} component={Dashboard} />
                        <Route exact path={`${props.match.path}/clients`} component={Clients} />
                        <Route exact path={`${props.match.path}/invoices`} component={Invoices} />
                        <Route exact path={`${props.match.path}/products`} component={Products} />
                        <Route exact path={`${props.match.path}/invoice/new/:id?`} component={NewInvoice} />
                    </div>
                </Box>
            </Router>
        </Box>
    )
}