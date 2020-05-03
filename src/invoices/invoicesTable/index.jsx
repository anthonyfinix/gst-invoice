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
    MoreVertIcon
} from '../../utils/mui';

const getRows = (props) => {
    let rows = props.invoices.map((invoice,i) => {
        return (
            <TableRow key={i}>
                <TableCell component="th" scope="row">
                    {invoice.client.name}
                </TableCell>
                <TableCell component="th" scope="row">
                    {new Date(invoice.created).toLocaleDateString()}
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
                            <TableCell>Name</TableCell>
                            <TableCell>Created</TableCell>
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