import React from 'react';
import './actions.css';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';

export default function Actions(props) {
    return (
        <Toolbar className="actionToolbar px-0">
            <Typography variant="h5" className="main-title">
                Clients
            </Typography>
            <Button
            style={{marginLeft: 'auto'}}
                variant="contained"
                color="primary"
                endIcon={<Icon>add</Icon>}
                size="small"
                onClick={props.handleAddNewBtnClick}
            >
                Add new
            </Button>
        </Toolbar>
    )
}