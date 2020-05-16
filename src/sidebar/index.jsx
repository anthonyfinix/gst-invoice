import React from 'react';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Drawer from '@material-ui/core/Drawer';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import BusinessIcon from '@material-ui/icons/Business';
import ReceiptIcon from '@material-ui/icons/Receipt';
import StoreIcon from '@material-ui/icons/Store';
import { NavLink } from 'react-router-dom';
import './sidebar.css';


function sidebar(props) {
    if (props.windowState === ('sm' || 'md')) {
        return (
            <Drawer open={props.toggleDrawerState} onClose={props.toggleDrawer}>
                <List component="nav" aria-label="main mailbox folders" style={{ width: 300 }}>
                    <NavLink onClick={props.toggleDrawer} to="/">
                        <ListItem button>
                            <ListItemText primary="Clients" />
                        </ListItem>
                    </NavLink>
                    <NavLink onClick={props.toggleDrawer} to="/invoices">
                        <ListItem button>
                            <ListItemText primary="Invoice" />
                        </ListItem>
                    </NavLink>
                    <NavLink onClick={props.toggleDrawer} to="/products">
                        <ListItem button>
                            <ListItemText primary="Products" />
                        </ListItem>
                    </NavLink>
                </List>
            </Drawer>
        )
    } else {
        return (
            <Box boxShadow={3} className={"sidebar " + (props.toggleDrawerState ? "sidebar-opened" : "sidebar-closed")}>
                <List component="nav">
                    <NavLink to="/">
                        <ListItem button>
                            <ListItemIcon>
                                <BusinessIcon />
                            </ListItemIcon>
                            <ListItemText primary="Clients" />
                        </ListItem>
                    </NavLink>
                    <NavLink to="/invoices">
                        <ListItem button>
                            <ListItemIcon>
                                <ReceiptIcon />
                            </ListItemIcon>
                            <ListItemText primary="Invoice" />
                        </ListItem>
                    </NavLink>
                    <NavLink to="/products">
                        <ListItem button>
                            <ListItemIcon>
                                <StoreIcon />
                            </ListItemIcon>
                            <ListItemText primary="Products" />
                        </ListItem>
                    </NavLink>
                </List>
            </Box>
        )
    }
}

export default function Sidebar(props) {
    return (
        <React.Fragment>
            {sidebar(props)}
        </React.Fragment>
    )
}