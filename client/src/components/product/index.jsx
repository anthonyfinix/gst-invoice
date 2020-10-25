import Box from '@material-ui/core/Box';
import React from 'react';
function Product() {
    return (
        <Box px={3}>
            <h1>Product</h1>
        </Box>
    )
}

export default React.memo(Product)