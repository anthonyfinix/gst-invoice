import React from 'react';
import getProducts from '../../api/getProducts';

export const ProductContext = React.createContext();
function ProductProvider(props) {
    const [items, setProducts] = React.useState(null);
    React.useEffect(() => {
        getProducts()
            .then(response => setProducts(response))
    }, [])

    return (
        <ProductContext.Provider value={{ items }}>
            {props.children}
        </ProductContext.Provider>
    )
}
export default ProductProvider;