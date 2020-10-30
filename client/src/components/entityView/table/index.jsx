import React from 'react';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import Paper from '@material-ui/core/Paper';

function ProductTable({ products, ...props }) {
    let columns = Object.keys(products[0])
    let rows = [...products]
    return (
        <TableContainer component={Paper} style={{ marginTop: 20 }}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {
                            columns.map((column) => {
                                return (<TableCell key={column}>{column}</TableCell>)
                            })
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row._id}>
                            {columns.map(column => {
                                return <TableCell key={row[column]} component="th" scope="row">{row[column]}</TableCell>
                            })}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default ProductTable;