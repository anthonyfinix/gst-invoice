import React from 'react';
import { Link, useLocation } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import SidebarToggleBtn from './sidebarToggleBtn';
import UserAvatar from './userAvatar';

import './header.css'
import { AppContext } from '../../contexts/appContext';
import { UserContext } from '../../contexts/userContext';

export default function Header() {
    const location = useLocation();
    const { appConfiguration } = React.useContext(AppContext)
    const { user } = React.useContext(UserContext)

    const AppBtn = () => <Button component={Link} to="/app" variant="outlined" style={{ marginLeft: "auto", marginRight: "10px", color: "white" }} size="small">APP</Button>
    const LoginBtn = () => <Button component={Link} to="/login" variant="outlined" style={{ marginLeft: "auto", marginRight: "10px", color: "white" }} size="small">Login</Button>
    const RegisterBtn = () => <Button component={Link} to="/register" variant="outlined" style={{ marginLeft: "auto", marginRight: "10px", color: "white" }} size="small">Register</Button>

    return (
        <AppBar id="main-header" position="static">
            <Toolbar>
                {location.pathname.includes('/app') ? <SidebarToggleBtn /> : null}
                <Button component={Link} to="/" style={{ fontWeight: "bold", color: "white" }} >{appConfiguration.name}</Button>
                <Box style={{ marginLeft: "auto" }}>
                    {!!user ? location.pathname.includes('/app') ? null : <AppBtn /> : <LoginBtn />}
                    {!!user ? <UserAvatar /> : <RegisterBtn />}

                </Box>
            </Toolbar>
        </AppBar>
    )
}