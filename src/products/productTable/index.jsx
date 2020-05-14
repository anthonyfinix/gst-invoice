import React, { useState } from 'react';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';

export default (props) => {
    const [selectedEl, setSelectedEl] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState({});

    const getRowOptionsDialog = () => {
        return <Menu
            anchorEl={selectedEl}
            keepMounted
            open={Boolean(selectedEl)}
            onClose={handleTableRowOptionsClose}
        >
            <MenuItem onClick={() => handleProdutEditClick()}>Edit</MenuItem>
            <MenuItem onClick={() => handleProductDeleteClick()}>Delete</MenuItem>
        </Menu>
    }
    const handleProdutEditClick = () => {
        props.editProduct(selectedProduct);
        handleTableRowOptionsClose();
    }
    const handleProductDeleteClick = () => {
        props.deleteItem(selectedEl.getAttribute('data-productid'))
        handleTableRowOptionsClose()
    }
    const handleTableRowOptionsClose = () => {
        setSelectedEl(null)
    }
    const getColumns = () => {
        return (
            <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>SKU</TableCell>
                <TableCell>Tax Rate</TableCell>
                <TableCell>Description</TableCell>
                <TableCell></TableCell>
            </TableRow>
        )
    }
    const handleTableRowOptionsClick = (e, i, product) => {
        let elm = e.currentTarget;
        setSelectedEl(elm);
        setSelectedProduct(product);
    }

    const getRows = (products) => {
        return products.map((product, i) => {
            return <TableRow key={i}>
                <TableCell component="th" scope="row">
                    {product.name}
                </TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.sku}</TableCell>
                <TableCell>{product.taxRate}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell align="right">
                    <IconButton size="small" data-productid={product._id} onClick={(e) => handleTableRowOptionsClick(e, i, product)}>
                        <MoreVertIcon fontSize="inherit" />
                    </IconButton>
                </TableCell>
            </TableRow>
        })
    }
    return (
        <React.Fragment>
            <TableContainer component={Paper} elevation={0}>
                <Table aria-label="simple table">
                    <TableHead>
                        {getColumns()}
                    </TableHead>
                    <TableBody>
                        {getRows(props.products)}
                    </TableBody>
                </Table>
            </TableContainer>
            {getRowOptionsDialog()}
        </React.Fragment>
    )
}