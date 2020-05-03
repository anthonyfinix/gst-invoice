import React, { Component } from 'react';
import { AppBar, Toolbar, Typography, IconButton, MenuIcon } from '../utils/mui';
import './header.css'

export default class MainHeader extends Component {
    constructor(props) {
        super(props);
        this.toggleDrawers = this.toggleDrawers.bind(this)
    }
    toggleDrawers(){
        this.props.toggleDrawer();
    }
    render() {
        return (
            <AppBar position='static' className="main-header">
                <Toolbar className="toolbar">
                    <IconButton onClick={this.toggleDrawers}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6">
                        GST INVOICE
                    </Typography>
                </Toolbar>
            </AppBar>
        )
    }
}