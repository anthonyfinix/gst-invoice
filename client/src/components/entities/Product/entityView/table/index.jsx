import React from 'react';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import CircularProgress from '@material-ui/core/CircularProgress';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Row from './row';
import { useEffect } from 'react';

function ProductTable({ items, columns, deleteItem, setSelectedProduct,toggleDialog }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const selected = React.useRef(null);

    if (!items || !columns) return <CircularProgress />;
    if (items.length < 0 || columns.length < 0) return <CircularProgress />;
    let rows = [...items];

    const handleDelete = (id) => deleteItem(id);
    const handleMenuClose = () => setAnchorEl(null);
    const openOptionsMenu = (e, row) => {
        setAnchorEl(e.currentTarget);
        selected.current = row
    };
    const handleEditClick = () => {
        setSelectedProduct(selected.current);
        selected.current = '';
        handleMenuClose();
        toggleDialog();
    }

    return (
        <React.Fragment>
            <TableContainer style={{ height: "100%" }}>
                <Table stickyHeader aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => <TableCell key={column}>{column}</TableCell>)}
                            <TableCell key="Delete"></TableCell>
                            <TableCell key="Options"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>{
                        rows.map(row =>
                            (<Row key={row._id}
                                row={row}
                                columns={columns}
                                handleDelete={handleDelete}
                                openOptionsMenu={openOptionsMenu} />))
                    }</TableBody>
                </Table>
            </TableContainer>
            <Menu open={!!anchorEl} anchorEl={anchorEl} onClose={handleMenuClose}>
                <MenuItem onClick={handleEditClick}>Edit</MenuItem>
            </Menu>
        </React.Fragment>
    )
}

export default ProductTable;