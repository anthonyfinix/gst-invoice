import React from 'react';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import Delete from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';

function ProductTable({ products, deleteItem, columns, ...props }) {
    let rows = [...products];
    const handleDelete = (id) => {
        deleteItem(id)
    }
    const getRows = (row) => {
        return (
            <TableRow key={row._id}>
                {columns.map(column => <TableCell key={row[column]} component="th" scope="row">{row[column]}</TableCell>)}
                <TableCell key={row._id} component="th" scope="row">
                    <IconButton size="small" onClick={() => handleDelete(row._id)}><Delete /></IconButton>
                </TableCell>
            </TableRow>

        )
    }
    return (
        <TableContainer component={Paper} style={{ marginTop: 20 }}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {columns.map((column) => <TableCell key={column}>{column}</TableCell>)}
                        <TableCell key="Delete"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => getRows(row))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default ProductTable;