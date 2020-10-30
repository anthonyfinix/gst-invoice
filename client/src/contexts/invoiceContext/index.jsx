import React from 'react';
import getInvoices from '../../api/invoice/getInvoices';
import addInvoice from '../../api/invoice/addInvoice';

export const InvoiceContext = React.createContext();
function InvoiceProvider(props) {
    let title = "Invoice"
    let [dialogState, setDialogState] = React.useState(false);
    const toggleDialog = () => setDialogState(!dialogState)
    const [items, setInvoice] = React.useState(null);
    const updateInvoices = () => getInvoices().then(response => setInvoice(response))
    React.useEffect(() => { updateInvoices() }, [])

    return (
        <InvoiceContext.Provider value={{ items, title, dialogState, toggleDialog, addInvoice, updateInvoices }}>
            {props.children}
        </InvoiceContext.Provider>
    )
}
export default InvoiceProvider;