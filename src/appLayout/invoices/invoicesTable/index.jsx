import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import Chip from '@material-ui/core/Chip';
import './invoiceTable.css'


export default (props) => {
    const [selectedEl, setSelectedEl] = useState(null);
    const [selectedInvoice, setSelectedInvoice] = useState({});

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
                    <TableCell align="right">
                        <IconButton size="small" data-invoiceid={invoice._id} onClick={(e) => handleTableRowOptionsClick(e, i, invoice)}>
                            <MoreVertIcon fontSize="inherit" />
                        </IconButton>
                    </TableCell>
                </TableRow>
            )
        })
        return rows;
    }
    const handleTableRowOptionsClick = (e, i, invoice) => {
        let elm = e.currentTarget;
        setSelectedEl(elm);
        setSelectedInvoice(invoice);
    }
    const getRowOptionsDialog = () => {
        return <Menu
            anchorEl={selectedEl}
            keepMounted
            open={Boolean(selectedEl)}
            onClose={handleTableRowOptionsClose}
        >
            <MenuItem onClick={() => handleInvoiceEditClick()}>Edit</MenuItem>
            <MenuItem onClick={() => handleInvoiceDeleteClick()}>Delete</MenuItem>
        </Menu>
    }
    const handleInvoiceEditClick = () => {
        props.editProduct(selectedInvoice);
        handleTableRowOptionsClose();
    }
    const handleInvoiceDeleteClick = () => {
        props.handleInvoiceDelete(selectedEl.getAttribute('data-invoiceid'))
        handleTableRowOptionsClose()
    }
    const handleTableRowOptionsClose = () => {
        setSelectedEl(null)
    }

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
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {getRows(props)}
                    </TableBody>
                </Table>
            </TableContainer>
            {getRowOptionsDialog()}
        </React.Fragment>
    )
}