import React from 'react';
import './createInvoice.css';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ProductItem from './productItem';
import Sidebar from './sidebar';
import NoProductItem from './noProductItem';
import getProductGrandTotal from './getProductGrandTotal';
import { useHistory } from 'react-router-dom';
import createPdf from '../../../../util/pdfMake';
import { InvoiceContext } from '../invoiceContext';
import ClientInput from './clientInput';
import ProductAdd from './productAdd';

function CreateInvoice() {
    const contextData = React.useContext(InvoiceContext)
    const history = useHistory();
    const [searchedClients, setSearchedClients] = React.useState([])
    const [recipientName, setRecipientName] = React.useState('');
    const [recipientEmail, setRecipientEmail] = React.useState('');
    const [grandTotal, setGrandTotal] = React.useState(0);
    const [products, setProducts] = React.useState([]);
    const setClient = (client)=>{
        setRecipientName(client.name)
        setRecipientEmail(client.email)
    }
    const addInvoiceItem = ({name,qty,price}) => {
        if ((name !== '') || (qty !== '') || (price !== '')) {
            let items = [...products];
            items.push({ name, qty, price })
            setProducts(items)
            setGrandTotal(getProductGrandTotal(items));
        }
    }
    const handlePreview = () => {
        let previewData = {
            recipient: { name: recipientName, email: recipientEmail },
            products: products,
            grandTotal: grandTotal,
            invoiceDate: Date.now()
        }
        createPdf('invoice', previewData);
    }
    const handleDraft = () => {
        contextData.addItem({
            recipient: {
                name: recipientName,
                email: recipientEmail
            },
            products,
            total: grandTotal,
            draft: true
        })
        handleViewAllInvoice()
    }
    const handleSent = () => {
        contextData.addItem({
            recipient: {
                name: recipientName,
                email: recipientEmail
            },
            products,
            total: grandTotal,
            draft: false
        })
        handleViewAllInvoice()
    }
    const handleViewAllInvoice = () => {
        history.push('/app');
    }
    const handleRecipientNameChange = (e) => setRecipientName(e.target.value);
    const handleRecipientEmailChange = (e) => setRecipientEmail(e.target.value);
    return (
        <Box id="new-invoice-wrapper" display="flex" height="100%">
            <Box id="new-invoice-content" flexGrow={1} display="flex" flexDirection="column" justifyContent="space-between">
                <Box p={2}>
                    <Box display="flex" justifyContent="space-between">
                        <Typography variant="h6">Create Invoice</Typography>
                        <Button variant="contained" color="primary" onClick={handleViewAllInvoice}>View All Invoices</Button>
                    </Box>
                    <Typography variant="body2" style={{ marginBottom: 10 }} >Create New Invoice</Typography>
                    <ClientInput
                        searchedClients={searchedClients}
                        recipientName={recipientName}
                        handleRecipientNameChange={handleRecipientNameChange}
                        recipientEmail={recipientEmail}
                        handleRecipientEmailChange={handleRecipientEmailChange} 
                        setSearchedClients={setSearchedClients}
                        setClient={setClient}
                    />
                </Box>
                <Box style={{ height: 400, overflowY: "scroll", marginBottom: "auto" }}>
                    {
                        !!products.length ? (
                            <>
                                <Box display="flex" justifyContent="space-between" px={2} pb={1}>
                                    <div style={{ flexGrow: 1, flexBasis: 0 }}>
                                        <Typography variant="caption">Name</Typography>
                                    </div>
                                    <div style={{ flexGrow: 1, flexBasis: 0 }}>
                                        <Typography variant="caption">Quantity</Typography>
                                    </div>
                                    <div style={{ flexGrow: 1, flexBasis: 0 }}>
                                        <Typography variant="caption">Price</Typography>
                                    </div>
                                    <div style={{ flexGrow: 1, flexBasis: 0 }}>
                                        <Typography variant="caption">Total</Typography>
                                    </div>
                                </Box>
                                {products.map((product, i) => <ProductItem key={i} product={product} />)}
                            </>
                        ) : <NoProductItem />
                    }
                </Box>
                <ProductAdd addProduct={addInvoiceItem}/>
            </Box>
            <Sidebar handlePreview={handlePreview} handleDraft={handleDraft} handleSent={handleSent} total={grandTotal} />
        </Box>
    )
}
export default CreateInvoice;