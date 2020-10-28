import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import ProductHeader from './header';
import ProductTable from './table';
import { AppContext } from '../../contexts/appContext';
import product from '../../contexts';
function Product() {
    const { currentProduct } = React.useContext(AppContext);
    const {items} = React.useContext(product.contexts[currentProduct.context])
    return (
        <Box id="product-main-wrapper" px={2}>
            <ProductHeader />
            <Typography variant="body2">Product Listing</Typography>
            {!!items ? <ProductTable products={items} /> : null}
        </Box>
    )
}

export default React.memo(Product)