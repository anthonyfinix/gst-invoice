import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

export default function Actions(props) {
    return (
        <Toolbar className="main-toolbar">
            <Typography variant="h6" className="main-title">
                Create New Invoice
        </Typography>
            <Button  className="ml-auto" variant="contained" size="small">Cancel</Button>
            <Button className="ml-2" disabled={!props.invoiceState.state} variant="contained" color="primary" size="small" onClick={props.saveInvoice}>Save Draft</Button>
            <Button className="ml-2" variant="contained" color="primary" size="small">Send</Button>
        </Toolbar>

    )
}