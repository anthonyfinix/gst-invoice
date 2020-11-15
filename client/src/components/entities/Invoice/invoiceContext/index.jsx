import React from 'react';
import getInvoices from '../api/getInvoices';
import addInvoice from '../api/addInvoice';
import deleteInvoice from '../api/deleteInvoice';
import getSearchInvoices from '../api/getSearchInvoices';

export const InvoiceContext = React.createContext();
function InvoiceProvider(props) {
    let title = "Invoice"
    let [dialogState, setDialogState] = React.useState(false);
    const toggleDialog = () => setDialogState(!dialogState)
    const [invoices, setInvoices] = React.useState(null);
    const addItem = (newInvoice)=>{addInvoice(newInvoice).then(()=>updateInvoices())}
    const [columns] = React.useState(['recipient','products','total','draft','issued on','invoice no']);
    const updateInvoices = () => getInvoices().then(response => setInvoices(response))
    const searchInvoices = (query) => getSearchInvoices(query).then(response => setInvoices(response))
    const handleItemDelete = (id) => deleteInvoice(id).then(() => updateInvoices());
    React.useEffect(() => { updateInvoices() }, [])

    return (
        <InvoiceContext.Provider value={{
            items: invoices,
            title,
            columns,
            dialogState,
            toggleDialog,
            addItem,
            updateItems:updateInvoices,
            searchItems: searchInvoices,
            deleteItem: handleItemDelete
        }}>
            {props.children}
        </InvoiceContext.Provider>
    )
}
export default InvoiceProvider;