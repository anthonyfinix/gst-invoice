import React from 'react';
import getInvoices from '../../api/invoice/getInvoices';
import addInvoice from '../../api/invoice/addInvoice';
import getSearchInvoices from '../../api/invoice/getSearchInvoices';

export const InvoiceContext = React.createContext();
function InvoiceProvider(props) {
    let title = "Invoice"
    let [dialogState, setDialogState] = React.useState(false);
    const toggleDialog = () => setDialogState(!dialogState)
    const [invoices, setInvoices] = React.useState(null);
    const updateInvoices = () => getInvoices().then(response => setInvoices(response))
    const searchInvoices = (query) => getSearchInvoices(query).then(response => setInvoices(response))
    React.useEffect(() => { updateInvoices() }, [])

    return (
        <InvoiceContext.Provider value={{
            items:invoices,
            title,
            dialogState,
            toggleDialog,
            addInvoice,
            updateInvoices,
            searchItems:searchInvoices
        }}>
            {props.children}
        </InvoiceContext.Provider>
    )
}
export default InvoiceProvider;