import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import './header.css';

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