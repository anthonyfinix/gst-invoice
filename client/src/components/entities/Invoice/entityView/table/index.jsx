import React from 'react';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import Paper from '@material-ui/core/Paper';
import Row from './row';

function ProductTable({ products, deleteItem, columns, ...props }) {
    let rows = [...products];
    const handleDelete = (id) => {
        deleteItem(id)
    }
    return (
        <TableContainer style={{ marginTop: 20 }}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {columns.map((column) => <TableCell key={column}>{column}</TableCell>)}
                        <TableCell key="delete"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => <Row row={row} key={row._id} columns={columns} handleDelete={handleDelete} />)}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default ProductTable;