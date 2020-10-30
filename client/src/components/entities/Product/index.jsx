import React from 'react';
import ProductProvider, { ProductContext } from '../../../contexts/productContext';
import CreateDialog from './createDialog';
import EntityView from '../../entityView'

function Product() {
    return (
        <ProductProvider>
            <EntityView context={ProductContext} />
            <CreateDialog/>
        </ProductProvider>
    )
}

export default Product