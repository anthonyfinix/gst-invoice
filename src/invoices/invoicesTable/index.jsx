import React from 'react';
import {
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Paper,
    IconButton,
    Menu,
    MenuItem,
    MoreVertIcon,
    Chip
} from '../../utils/mui';

const getStatus = (status)=>{
    switch(status){
        case 0:
            return <Chip label="Not Paid"/> 
        case 1:
            return <Chip label="Paid"/> 
        case 2:
            return <Chip label="Draft"/>
    }
}

const getRows = (props) => {
    let rows = props.invoices.map((invoice,i) => {
        return (
            <TableRow key={i}>
                <TableCell component="th" scope="row">
                    {getStatus(invoice.status)}
                </TableCell>
                <TableCell component="th" scope="row">
                    {invoice.client.name}
                </TableCell>
                <TableCell component="th" scope="row">
                    {new Date(invoice.created).toLocaleDateString()}
                </TableCell>
                <TableCell component="th" scope="row">
                    Due Date
                </TableCell>
                <TableCell component="th" scope="row">
                    {invoice.total}
                </TableCell>
            </TableRow>
        )
    })
    return rows;
}
export default function InvoicesTable(props) {
    return (
        <React.Fragment>
            <TableContainer component={Paper} elevation={0}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Status</TableCell>
                            <TableCell>Client Name</TableCell>
                            <TableCell>Created</TableCell>
                            <TableCell>Due Dated</TableCell>
                            <TableCell>Total</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {getRows(props)}
                    </TableBody>
                </Table>
            </TableContainer>
        </React.Fragment>
    )
}