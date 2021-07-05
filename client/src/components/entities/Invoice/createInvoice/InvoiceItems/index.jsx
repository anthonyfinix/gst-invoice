import React from  'react';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import './productItem.css'

function ProductItem({product}){
    return(
        <Box id="productItem" display="flex" justifyContent="space-between" flexBasis="25%" px={2}>
            <div style={{flexGrow:1,flexBasis:0}}>
                <TextField variant="filled" size="small" value={product.name} />
            </div>
            <div style={{flexGrow:1,flexBasis:0}}>
                <TextField variant="filled" size="small" value={product.qty} />
            </div>
            <div style={{flexGrow:1,flexBasis:0}}>
                <TextField variant="filled" size="small" value={product.price} />
            </div>
            <div style={{flexGrow:1,flexBasis:0}}>
                <TextField variant="filled" size="small" value={product.qty * product.price} />
            </div>
        </Box>
    )
}
export default ProductItem;