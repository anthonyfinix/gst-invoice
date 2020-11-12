import React from 'react';
import getProducts from '../api/getProducts';
import addProduct from '../api/addProducts';
import deleteProduct from '../api/deleteProduct';
import getSearchProducts from '../api/getSearchProducts';

export const ProductContext = React.createContext();
function ProductProvider(props) {
    const title = "Product";
    const [dialogState, setDialogState] = React.useState(false);
    const toggleDialog = () => setDialogState(!dialogState)
    const [items, setProducts] = React.useState(null);
    const [columns] = React.useState(['name', 'price']);

    const searchProducts = (query) => getSearchProducts(query).then(response => setProducts(response))
    const updateProducts = () => getProducts().then(response => setProducts(response))
    const handleItemDelete = (id) => deleteProduct(id).then(() => updateProducts());
    React.useEffect(() => { updateProducts() }, [])

    return (
        <ProductContext.Provider value={{
            items,
            columns,
            title,
            dialogState,
            toggleDialog,
            addProduct,
            updateProducts,
            searchItems: searchProducts,
            deleteItem: handleItemDelete
        }}>
            {props.children}
        </ProductContext.Provider>
    )
}
export default ProductProvider;