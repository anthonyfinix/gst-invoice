import React from 'react';
import getProducts from '../../api/getProducts';

export const InvoiceContext = React.createContext();
function InvoiceProvider(props) {
    let [dialogState, setDialogState] = React.useState(false);
    const toggleDialog = () => {
        setDialogState(!dialogState)
    }
    let title = "Invoice"
    const [items, setInvoice] = React.useState(null);
    React.useEffect(() => {
        getProducts()
            .then(response => setInvoice(response))
    }, [])

    return (
        <InvoiceContext.Provider value={{ items, title, dialogState, toggleDialog }}>
            {props.children}
        </InvoiceContext.Provider>
    )
}
export default InvoiceProvider;