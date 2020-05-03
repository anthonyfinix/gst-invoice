import React from 'react';
import { TextField, Box } from '../../../utils/mui';

export default function InvoiceSummery(props) {
    return (
        <Box display="flex" flexDirection="column">
            <TextField variant="outlined" className="mb-4" size="small" autoComplete="off" inputProps={{ name: 'clientName' }} disabled={true} value={props.invoiceNo} label="Invoice Number" />
            <TextField variant="outlined" className="mb-4" size="small" autoComplete="off" inputProps={{ name: 'clientName' }} disabled={true} value={props.created} label="Issue Date" />
        </Box>
    )
}