import React from 'react';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import Paper from '@material-ui/core/Paper';

function ProductTable({ products, ...props }) {
    let rows = [...products]
    // let rows = [
    //     createData('Frozen yoghurt', 159, 6.0, 24),
    //     createData('Ice cream sandwich', 237, 9.0, 37),
    //     createData('Eclair', 262, 16.0, 24),
    //     createData('Cupcake', 305, 3.7, 67),
    //     createData('Gingerbread', 356, 16.0, 49),
    // ];
    // React.useEffect(() => {
    //     console.log(products)
    //     if(!!products) rows = products
    // })

    // function createData(id, name, gender, dob) {
    //     return { id, name, gender, dob };
    // }


    return (
        <TableContainer component={Paper} style={{ marginTop: 20 }}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">ID</TableCell>
                        <TableCell align="right">Gender</TableCell>
                        <TableCell align="right">Date of Birth</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.name}>
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="right">{row._id}</TableCell>
                            <TableCell align="right">{row.gender}</TableCell>
                            <TableCell align="right">{row.dob}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default ProductTable;