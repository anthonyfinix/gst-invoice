import React from 'react';
import getInvoices from '../api/getInvoices';
import addInvoice from '../api/addInvoice';
import deleteInvoice from '../api/deleteInvoice';
import getSearchInvoices from '../api/getSearchInvoices';
import updateInvoice from '../api/updateInvoice';

export const InvoiceContext = React.createContext();
function InvoiceProvider(props) {
    let title = "Invoice"
    let [dialogState, setDialogState] = React.useState(false);
    const [selectedInvoice, setSelectedInvoice] = React.useState(null);
    const toggleDialog = () => setDialogState(!dialogState)
    const [invoices, setInvoices] = React.useState(null);
    const [columns] = React.useState(['invoiceNo', 'issuedOn', 'recipient', 'products', 'total', 'draft']);
    const updateInvoiceList = () => getInvoices().then(response => setInvoices(response))
    const searchInvoices = (query) => getSearchInvoices(query).then(response => setInvoices(response))
    const handleItemDelete = (id) => deleteInvoice(id).then(() => updateInvoiceList());
    React.useEffect(() => { updateInvoiceList() }, [])
    console.log(selectedInvoice)

    return (
        <InvoiceContext.Provider value={{
            items: invoices,
            title,
            columns,
            dialogState,
            toggleDialog,
            addItem: addInvoice,
            updateItems: updateInvoiceList,
            searchItems: searchInvoices,
            getSearchedItems: getSearchInvoices,
            deleteItem: handleItemDelete,
            selectedInvoice,
            setSelectedInvoice,
            updateInvoice
        }}>
            {props.children}
        </InvoiceContext.Provider>
    )
}
export default InvoiceProvider;