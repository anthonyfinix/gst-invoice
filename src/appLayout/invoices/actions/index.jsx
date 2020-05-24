import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import './actions.css';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

export default function Actions() {

    useEffect(() => {
    })

    const [redirect, setredirect] = useState(false);
    const handleRedirect = () => {
        setredirect(!redirect);
    }

    if (redirect) {
        return (
            <Redirect to='invoice/new'/>
        )
    } else {
        return (
            <Toolbar className="main-toolbar">
                <Typography variant="h5" className="main-title">
                    Invoices
                </Typography>
                <Button
                    style={{ marginLeft: 'auto' }}
                    variant="contained"
                    color="primary"
                    endIcon={<Icon>add</Icon>}
                    size="small"
                    onClick={handleRedirect}
                >
                    Add new
            </Button>
            </Toolbar>
        )
    }
}