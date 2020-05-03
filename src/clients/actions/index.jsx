import React from 'react';
import './actions.css'
import { Button, Icon, Toolbar, Typography } from '../../utils/mui';

export default function Actions(props) {
    return (
        <Toolbar className="actionToolbar">
            <Typography variant="h5" className="main-title">
                Clients
            </Typography>
            <Button
            style={{marginLeft: 'auto'}}
                variant="contained"
                color="primary"
                endIcon={<Icon>add</Icon>}
                size="small"
                onClick={props.addNewItem}
            >
                Add new
            </Button>
        </Toolbar>
    )
}