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
            <Drawer open={props.drawerState} onClose={props.toggleDrawerState}>
                <List component="nav" aria-label="main mailbox folders" style={{ width: 300 }}>
                    <NavLink onClick={props.toggleDrawerState} to={`${props.match.path}/clients`}>
                        <ListItem button>
                            <ListItemText primary="Clients" />
                        </ListItem>
                    </NavLink>
                    <NavLink onClick={props.toggleDrawerState} to={`${props.match.path}/invoices`}>
                        <ListItem button>
                            <ListItemText primary="Invoice" />
                        </ListItem>
                    </NavLink>
                    <NavLink onClick={props.toggleDrawerState} to={`${props.match.path}/products`}>
                        <ListItem button>
                            <ListItemText primary="Products" />
                        </ListItem>
                    </NavLink>
                </List>
            </Drawer>
        )
    } else {
        return (
            <Box boxShadow={3} className={"sidebar " + (props.drawerState ? "sidebar-opened" : "sidebar-closed")}>
                <List component="nav">
                    <NavLink to={`${props.match.path}/clients`}>
                        <ListItem button>
                            <ListItemIcon>
                                <BusinessIcon />
                            </ListItemIcon>
                            <ListItemText primary="Clients" />
                        </ListItem>
                    </NavLink>
                    <NavLink to={`${props.match.path}/invoices`}>
                        <ListItem button>
                            <ListItemIcon>
                                <ReceiptIcon />
                            </ListItemIcon>
                            <ListItemText primary="Invoice" />
                        </ListItem>
                    </NavLink>
                    <NavLink to={`${props.match.path}/products`}>
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