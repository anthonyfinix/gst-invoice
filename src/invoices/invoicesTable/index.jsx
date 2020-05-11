import React from 'react';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import Chip from '@material-ui/core/Chip';
import './invoiceTable.css'

const getStatus = (status) => {
    switch (status) {
        case 0:
            return <Chip label="Not Paid" />
        case 1:
            return <Chip label="Paid" />
        case 2:
            return <Chip label="Viewed" />
        case 3:
            return <Chip label="Sent" />
        case 4:
            return <Chip label="Draft" />
        default:
            break;
    }
}

const getRows = (props) => {
    let rows = props.invoices.map((invoice, i) => {
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
                    {new Date(invoice.dueDate).toLocaleDateString()}
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
            <TableContainer className="table-container" component={Paper} elevation={0}>
                <Table stickyHeader aria-label="simple table">
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