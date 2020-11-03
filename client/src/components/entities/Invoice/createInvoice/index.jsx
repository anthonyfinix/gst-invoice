import React from 'react';
import './createInvoice.css';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import TexField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ProductItem from './productItem';
import Sidebar from './sidebar';
import NoProductItem from './noProductItem';
import getProductGrandTotal from './getProductGrandTotal';
import { useHistory } from 'react-router-dom';

function CreateInvoice() {
    const history = useHistory();
    const [grandTotal, setGrandTotal] = React.useState(0);
    const [productName, setProductName] = React.useState('');
    const [productQty, setProductQty] = React.useState('');
    const [productPrice, setProductPrice] = React.useState('');
    const [products, setProducts] = React.useState([]);
    const addProduct = () => {
        let product = { name: productName, qty: productQty, price: productPrice }
        if ((productName !== '') || (productQty !== '') || (productPrice !== '')) {
            let items = [...products];
            items.push({ name: productName, qty: productQty, price: productPrice })
            setProducts(items)
            setGrandTotal(getProductGrandTotal(items));
        }
        setProductName('')
        setProductQty('')
        setProductPrice('')
    }
    const handleViewAllInvoice = ()=>{
        history.push('/app');
    }
    const handleProductChangeName = (e) => setProductName(e.target.value);
    const handleProductQtyChange = (e) => setProductQty(e.target.value);
    const handleProductPriceChange = (e) => setProductPrice(e.target.value);
    return (
        <Box id="new-invoice-wrapper" display="flex" height="100%">
            <Box id="new-invoice-content" flexGrow={1} display="flex" flexDirection="column" justifyContent="space-between">
                <Box p={2}>
                    <Box display="flex" justifyContent="space-between">
                        <Typography variant="h6">Create Invoice</Typography>
                        <Button variant="contained" color="primary" onClick={handleViewAllInvoice}>View All Invoices</Button>
                    </Box>
                    <Typography variant="body2" style={{marginBottom:10}} >Create New Invoice</Typography>
                    <FormControl size="small" variant="outlined">
                        <OutlinedInput startAdornment={<InputAdornment position="end" style={{ marginRight: 5 }}>to</InputAdornment>} />
                    </FormControl>
                </Box>
                <Box style={{ height: 400, overflowY: "scroll", marginBottom: "auto" }}>
                    {
                        !!products.length ? (
                            <>
                                <Box display="flex" justifyContent="space-between" px={2} pb={1}>
                                    <div style={{flexGrow:1,flexBasis:0}}>
                                        <Typography variant="caption">Name</Typography>
                                    </div>
                                    <div style={{flexGrow:1,flexBasis:0}}>
                                        <Typography variant="caption">Quantity</Typography>
                                    </div>
                                    <div style={{flexGrow:1,flexBasis:0}}>
                                        <Typography variant="caption">Price</Typography>
                                    </div>
                                    <div style={{flexGrow:1,flexBasis:0}}>
                                        <Typography variant="caption">Total</Typography>
                                    </div>
                                </Box>
                                {products.map((product, i) => <ProductItem key={i} product={product} />)}
                            </>
                        ) : <NoProductItem />
                    }
                </Box>
                <Box display="flex" alignItems="center" p={2}>
                    <TexField size="small" style={{marginRight:15}} value={productName} onChange={handleProductChangeName} label="Add Product" variant="outlined" />
                    <TexField size="small" style={{marginRight:15}} value={productQty} onChange={handleProductQtyChange} type="number" label="Qty" variant="outlined" />
                    <TexField size="small" style={{marginRight:15}} value={productPrice} onChange={handleProductPriceChange} type="number" label="Price" variant="outlined" />
                    <Button style={{marginLeft:"auto"}} variant="contained" onClick={addProduct} color="primary">Add</Button>
                </Box>
            </Box>
            <Sidebar total={grandTotal} />
        </Box>
    )
}
export default CreateInvoice;