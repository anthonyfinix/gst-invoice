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
import { useHistory } from 'react-router-dom';

function ProductTable({ items, deleteItem, columns, toggleDialog, setSelectedInvoice }) {
    const history = useHistory();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const selected = React.useRef(null);

    const handleMenuClose = () => setAnchorEl(null);
    if (!items || !columns) return <CircularProgress />;
    if (items.length < 0 || columns.length < 0) return <CircularProgress />;
    let rows = [...items];
    const handleDelete = (id) => {
        deleteItem(id)
    }
    const openOptionsMenu = (e, client) => {
        setAnchorEl(e.currentTarget);
        selected.current = client
    }
    const handleEditClick = () => {
        setSelectedInvoice(selected.current)
        selected.current = '';
        handleMenuClose();
        history.push(`/app/NewInvoice`);
    }
    return (
        <React.Fragment>
            <TableContainer style={{ height: "100%" }}>
                <Table stickyHeader aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => <TableCell key={column}>{column}</TableCell>)}
                            <TableCell key="delete"></TableCell>
                            <TableCell key="options"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (<Row
                            row={row}
                            key={row._id}
                            columns={columns}
                            handleDelete={handleDelete}
                            openOptionsMenu={openOptionsMenu}
                        />))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Menu open={!!anchorEl} anchorEl={anchorEl} onClose={handleMenuClose}>
                {!!selected.current && selected.current.draft ? <MenuItem onClick={handleEditClick}>Edit</MenuItem> : null}
                <MenuItem>Options</MenuItem>
            </Menu>
        </React.Fragment>
    )
}

export default ProductTable;