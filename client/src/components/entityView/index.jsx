import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import ProductHeader from './header';
import ProductTable from './table'
function Product({ context, ...props }) {
    const contextData = React.useContext(context)
    return (
        <Box id="product-main-wrapper" px={2}>
            <ProductHeader title={contextData.title} toggleDialog={contextData.toggleDialog} context={contextData} />
            <Typography variant="body2">Listing</Typography>
            {!!contextData.items ? <ProductTable products={contextData.items} /> : null}
        </Box>
    )
}

export default React.memo(Product)