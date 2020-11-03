import React from  'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import './productItem.css'

function ProductItem({product,...props}){
    return(
        <Box id="productItem" display="flex" justifyContent="space-between" flexBasis="25%" px={2}>
            <div style={{flexGrow:1,flexBasis:0}}>
                <Typography variant="subtitle1">{product.name}</Typography>
            </div>
            <div style={{flexGrow:1,flexBasis:0}}>
                <Typography variant="subtitle1">{product.qty}</Typography>
            </div>
            <div style={{flexGrow:1,flexBasis:0}}>
                <Typography variant="subtitle1">{product.price}</Typography>
            </div>
            <div style={{flexGrow:1,flexBasis:0}}>
                <Typography variant="subtitle1">{product.qty * product.price}</Typography>
            </div>
        </Box>
    )
}
export default ProductItem;