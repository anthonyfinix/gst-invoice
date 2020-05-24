import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import './header.css';

export default (props) => {
    return (
        <AppBar position='static' className="main-header">
            <Toolbar className="toolbar">
                <IconButton onClick={props.toggleDrawer}>
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6">
                    GST INVOICE
                    </Typography>
            </Toolbar>
        </AppBar>
    )
}