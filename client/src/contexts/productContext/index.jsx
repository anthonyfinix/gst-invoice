import React from 'react';
import getProducts from '../../api/getProducts';
import addProduct from '../../api/addProducts';

export const ProductContext = React.createContext();
function ProductProvider(props) {
    let [dialogState, setDialogState] = React.useState(false);
    const toggleDialog = () => {
        setDialogState(!dialogState)
    }
    let title = "Product";
    const [items, setProducts] = React.useState(null);
    const updateProducts = () => {
        getProducts()
            .then(response => setProducts(response))
    }
    React.useEffect(() => updateProducts(), [])

    return (
        <ProductContext.Provider value={{ items, title, dialogState, toggleDialog, addProduct, updateProducts }}>
            {props.children}
        </ProductContext.Provider>
    )
}
export default ProductProvider;