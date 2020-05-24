import React from 'react';
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker, } from '@material-ui/pickers';

export default function InvoiceSummery(props) {
    return (
        <Box display="flex" flexDirection="column">
            <TextField variant="outlined" className="mb-4" size="small" autoComplete="off" inputProps={{ name: 'invoiceNo' }} disabled={true} value={props.invoiceNo} label="Invoice Number" />
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                    className="mb-4"
                    disableToolbar
                    size="small"
                    variant="inline"
                    inputVariant="outlined"
                    label="Created Date"
                    value={props.created}
                    onChange={props.handleCreationDate}
                />
            </MuiPickersUtilsProvider>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                    disableToolbar
                    size="small"
                    variant="inline"
                    inputVariant="outlined"
                    label="Due Date"
                    value={props.dueDate}
                    onChange={props.handleDueDate}
                />
            </MuiPickersUtilsProvider>
        </Box>
    )
}