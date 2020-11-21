import React from 'react';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import Delete from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';

function ProductTable({ items, columns, deleteItem, ...props }) {
    if(!items || !columns) return <CircularProgress/>;
    if(items.length < 0 || columns.length < 0) return <CircularProgress/>;
    let rows = [...items]
    const handleDelete = (id) => {
        deleteItem(id)
    }
    const getTableRow = (row) => {
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
        <TableContainer style={{height: "100%"}}>
            <Table stickyHeader aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {columns.map((column) => <TableCell key={column}>{column}</TableCell>)}
                        <TableCell key="Delete"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>{rows.map((row) => getTableRow(row))}</TableBody>
            </Table>
        </TableContainer>
    )
}

export default ProductTable;