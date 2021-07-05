import React from 'react';
import './createInvoice.css';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ProductItem from './InvoiceItems';
import Sidebar from './sidebar';
import NoProductItem from './noInvoiceItem';
import InvoiceInput from './invoiceInput';
import getProductGrandTotal from './getProductGrandTotal';
import { useHistory } from 'react-router-dom';
import createPdf from '../../../../util/pdfMake';
import { InvoiceContext } from '../invoiceContext';
import ClientInput from './clientInput';
import Snackbar from '@material-ui/core/Snackbar';
import RowHeader from './InvoiceItemRowHeader';

function CreateInvoice() {
    const [response, setResponse] = React.useState("");
    const [grandTotal, setGrandTotal] = React.useState(0);
    const [products, setProducts] = React.useState([]);
    const recipient = React.useRef({});
    const contextData = React.useContext(InvoiceContext);
    const history = useHistory();
    React.useEffect(() => {
        if (!!contextData.selectedInvoice) {
            recipient.current = { ...contextData.selectedInvoice.recipient }
            setProducts(contextData.selectedInvoice.products);
            setGrandTotal(contextData.selectedInvoice.total)
        }
    }, [])
    const handleClose = () => setResponse("");
    const setRecipient = ({ name, email }) => recipient.current = { name, email };
    const addInvoiceItem = ({ name, qty, price }) => {
        if ((name !== '') || (qty !== '') || (price !== '')) {
            let items = [...products];
            let itemAdded = false;
            items = items.map(item => {
                if (name === item.name) {
                    item.qty = item.qty + qty;
                    itemAdded = true;
                };
                return item;
            });
            if (!itemAdded) items.push({ name, qty, price });
            setProducts(items)
            setGrandTotal(getProductGrandTotal(items));
        }
    }
    const handlePreview = () => {
        let previewData = {
            recipient: {
                name: recipient.current.name,
                email: recipient.current.email,
            },
            products: products,
            grandTotal: grandTotal,
            invoiceDate: Date.now()
        }
        console.log(previewData)
        // createPdf('invoice', previewData);
    }
    const handleDraft = () => {
        let newInvoice = {
            recipient: {
                name: recipient.current.name,
                email: recipient.current.email,
            },
            products,
            total: grandTotal,
            draft: true
        }
        if (!!contextData.selectedInvoice) {
            newInvoice._id = contextData.selectedInvoice._id;
            console.log(newInvoice)
            contextData.updateInvoice(newInvoice).then((response) => {
                console.log(response)
                if (response.error) return setResponse(response.error);
                contextData.updateItems()
                handleViewAllInvoice()
            })
        } else {
            console.log(newInvoice)
            contextData.addItem(newInvoice).then((response) => {
                console.log(response)
                if (response.error) return setResponse(response.error);
                contextData.updateItems()
                handleViewAllInvoice()
            })
        }
        handleViewAllInvoice()
    }
    const handleSent = () => {
        let newInvoice = {
            recipient: {
                name: recipient.current.name,
                email: recipient.current.email,
            },
            products,
            total: grandTotal,
            draft: false
        }
        if (!!contextData.selectedInvoice) {
            newInvoice._id = contextData.selectedInvoice._id;
            contextData.updateInvoice(newInvoice).then((response) => {
                if (response.error) return setResponse(response.error);
                contextData.updateItems()
                handleViewAllInvoice()
            })
        } else {
            contextData.addItem(newInvoice).then((response) => {
                if (response.error) return setResponse(response.error);
                contextData.updateItems()
                handleViewAllInvoice()
            })
        }
    }
    const handleViewAllInvoice = () => {
        contextData.setSelectedInvoice(null);
        history.push('/app');
    }

    return (
        <Box id="new-invoice-wrapper" display="flex" height="100%">
            <Box id="new-invoice-content" flexGrow={1} display="flex" flexDirection="column" justifyContent="space-between">
                <Box p={2}>
                    <Box display="flex" justifyContent="space-between">
                        <Typography variant="h6">Create Invoice</Typography>
                        <Button variant="contained" color="primary" onClick={handleViewAllInvoice}>View All Invoices</Button>
                    </Box>
                    <Typography variant="body2" style={{ marginBottom: 10 }} >Create New Invoice</Typography>
                    <ClientInput existingData={contextData.selectedInvoice} setRecipient={setRecipient} />
                </Box>
                <Box style={{ height: 400, overflowY: "scroll", marginBottom: "auto" }}>
                    {
                        !!products.length ? (
                            <>
                                <RowHeader />
                                {products.map((product, i) => <ProductItem key={i} product={product} />)}
                            </>
                        ) : <NoProductItem />
                    }
                </Box>
                <InvoiceInput addInvoiceItem={addInvoiceItem} />
            </Box>
            <Sidebar handlePreview={handlePreview} handleDraft={handleDraft} handleSent={handleSent} total={grandTotal} />
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center', }}
                open={!!response}
                onClose={handleClose}
                message={response}
            />
        </Box>
    )
}
export default CreateInvoice;