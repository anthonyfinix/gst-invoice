import React from 'react';
import {
    Toolbar,
    Button,
    Typography
} from '../../../utils/mui'


export default function Actions(props) {
    return (
        <Toolbar className="main-toolbar">
            <Typography variant="h6" className="main-title">
                Create New Invoice
        </Typography>
            <Button  className="ml-auto" variant="contained" size="small">Cancel</Button>
            <Button className="ml-2" variant="contained" color="primary" size="small">Save Draft</Button>
            <Button className="ml-2" variant="contained" color="primary" size="small" onClick={props.saveInvoice}>Save</Button>
            <Button className="ml-2" variant="contained" color="primary" size="small">Export PDF</Button>
            <Button className="ml-2" variant="contained" color="primary" size="small">Save and Send</Button>
        </Toolbar>

    )
}