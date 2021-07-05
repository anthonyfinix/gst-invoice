import React from 'react';
import getProducts from '../api/getProducts';
import addProduct from '../api/addProducts';
import deleteProduct from '../api/deleteProduct';
import getSearchProducts from '../api/getSearchProducts';
import updateProduct from '../api/updateProduct'

export const ProductContext = React.createContext();
function ProductProvider(props) {
    const title = "Product";
    const [dialogState, setDialogState] = React.useState(false);
    const toggleDialog = () => setDialogState(!dialogState)
    const [items, setProducts] = React.useState(null);
    const [columns] = React.useState(['name', 'price']);
    const [selectedProduct,setSelectedProduct] = React.useState(null);

    const searchProducts = (query) => getSearchProducts(query).then(response => setProducts(response))
    const updateProductList = () => getProducts().then(response => setProducts(response))
    const handleItemDelete = (id) => deleteProduct(id).then(() => updateProductList());
    React.useEffect(() => { updateProductList() }, [])

    return (
        <ProductContext.Provider value={{
            items,
            columns,
            title,
            dialogState,
            selectedProduct,
            setSelectedProduct,
            toggleDialog,
            addProduct,
            updateProductList,
            searchItems: searchProducts,
            deleteItem: handleItemDelete,
            updateItem:updateProduct
        }}>
            {props.children}
        </ProductContext.Provider>
    )
}
export default ProductProvider;