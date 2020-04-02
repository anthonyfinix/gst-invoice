import React from 'react';
import { Paper, Box, Grid, TextField, IconButton, List, ListItem, ListItemText } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

const getOptions = (products, handleOptionClick,index) => {
    let options = products.map((product, i) => {
        return (
            <ListItem onClick={(e) => handleOptionClick(e, index,product)} key={i} button>
                <ListItemText primary={product.name} />
            </ListItem>
        )
    })
    return options;
}

const ProductInputRow = (props) => {
    return (
        <Paper variant="outlined">
            <Box p={1}>
                <Grid container spacing={1} direction="row" justify="flex-start" alignItems="center">
                    <Grid item>
                        <TextField value={props.product.name} autoComplete='off' onChange={props.handleProductRowValueChange} inputProps={{ name: 'name', index: props.index }} required={true} variant="outlined" label="Product name" size="small" />
                    </Grid>
                    <Grid item xs={2}>
                        <TextField value={props.product.price} autoComplete='off' type="number" onChange={props.handleProductRowValueChange} inputProps={{ name: 'price', index: props.index }} required={true} variant="outlined" label="Price" size="small" />
                    </Grid>
                    <Grid item xs={2}>
                        <TextField value={props.product.taxRate} autoComplete='off' type="number" onChange={props.handleProductRowValueChange} inputProps={{ name: 'taxRate', index: props.index }} required={true} variant="outlined" label="Tax" size="small" />
                    </Grid>
                    <Grid item xs={2}>
                        <TextField value={props.product.discount} autoComplete='off' type="number" onChange={props.handleProductRowValueChange} inputProps={{ name: 'discount', index: props.index }} variant="outlined" label="Discount" size="small" />
                    </Grid>
                    <Grid item>
                        <IconButton onClick={(e) => props.removeProduct(props.index, e)} aria-label="delete">
                            <DeleteIcon />
                        </IconButton>
                    </Grid>
                </Grid>
                <List component="nav" aria-label="secondary mailbox folders">
                    {getOptions(props.product.searchedProduct, props.handleOptionClick,props.index)}
                </List>
            </Box>
        </Paper>
    )
}

export default ProductInputRow;