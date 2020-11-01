import React from 'react';
import getProducts from '../../api/product/getProducts';
import addProduct from '../../api/product/addProducts';

export const ProductContext = React.createContext();
function ProductProvider(props) {
    const title = "Product";
    const [dialogState, setDialogState] = React.useState(false);
    const toggleDialog = () => setDialogState(!dialogState)
    const [items, setProducts] = React.useState(null);
    const updateProducts = () => getProducts().then(response => {
        setProducts(response)
    })

    React.useEffect(() => {
        updateProducts()
    }, [])

    return (
        <ProductContext.Provider value={{ items, title, dialogState, toggleDialog, addProduct, updateProducts }}>
            {props.children}
        </ProductContext.Provider>
    )
}
export default ProductProvider;