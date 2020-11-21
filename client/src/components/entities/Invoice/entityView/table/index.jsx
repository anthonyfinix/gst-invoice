import React from 'react';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import CircularProgress from '@material-ui/core/CircularProgress'
import Row from './row';

function ProductTable({ items, deleteItem, columns, ...props }) {
    if(!items || !columns) return <CircularProgress/>;
    if(items.length < 0 || columns.length < 0) return <CircularProgress/>;
    let rows = [...items];
    const handleDelete = (id) => {
        deleteItem(id)
    }
    return (
        <TableContainer style={{ height:"100%" }}>
            <Table stickyHeader aria-label="simple table">
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