import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import ProductHeader from './header';
import ProductTable from './table'
function Product({ context, ...props }) {
    const { items,title,toggleDialog } = React.useContext(context)
    return (
        <Box id="product-main-wrapper" px={2}>
            <ProductHeader title={title} toggleDialog={toggleDialog}  />
            <Typography variant="body2">Listing</Typography>
            {!!items ? <ProductTable products={items} /> : null}
        </Box>
    )
}

export default React.memo(Product)