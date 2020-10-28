import React from 'react';
import getProducts from '../../api/getProducts';

export const InvoiceContext = React.createContext();
function InvoiceProvider(props) {
    const [items, setInvoice] = React.useState(null);
    React.useEffect(() => {
        getProducts()
            .then(response => setInvoice(response))
    }, [])

    return (
        <InvoiceContext.Provider value={{ items }}>
            {props.children}
        </InvoiceContext.Provider>
    )
}
export default InvoiceProvider;