import React from 'react';
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";

export default function InvoiceSummery(props) {
    return (
        <Box display="flex" flexDirection="column">
            <TextField variant="outlined" className="mb-4" size="small" autoComplete="off" inputProps={{ name: 'invoiceNo' }} disabled={true} value={props.invoiceNo} label="Invoice Number" />
            <TextField variant="outlined" className="mb-4" size="small" autoComplete="off" inputProps={{ name: 'created' }} disabled={true} value={props.created} label="Issue Date" />
            <TextField variant="outlined" className="mb-4" size="small" autoComplete="off" inputProps={{ name: 'dueDate' }} disabled={true} value={props.created} label="Due Date" />
        </Box>
    )
}