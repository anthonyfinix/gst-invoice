import React from 'react';
import Box from '@material-ui/core/Box';
import MenuItem from '@material-ui/core/MenuItem';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import './productSearch.css'

export default (props) => {

    const getItems = () => {
        return props.products.map((product, i) => {
            return <MenuItem key={i} onClick={()=>{props.handleSearchProductSelect(product)}}>
                {product.name}
            </MenuItem>
        })
    }
    
    return (
        <ClickAwayListener onClickAway={props.closeProductSearchDialog}>
        <Box className="product-search-result-dialog">
            {getItems()}
        </Box>
        </ClickAwayListener>
    )
}