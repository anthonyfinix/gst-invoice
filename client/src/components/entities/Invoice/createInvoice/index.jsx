import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import TexField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import React from 'react';
import Sidebar from './sidebar';
import './createInvoice.css';
function CreateInvoice() {
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
            console.log(items)
            setProducts(items)
        }
        setProductName('')
        setProductQty('')
        setProductPrice('')
    }
    const handleProductChangeName = (e) => setProductName(e.target.value);
    const handleProductQtyChange = (e) => setProductQty(e.target.value);
    const handleProductPriceChange = (e) => setProductPrice(e.target.value);
    return (
        <Box id="new-invoice-wrapper" display="flex" height="100%">
            <Box id="new-invoice-content" flexGrow={1} display="flex" flexDirection="column" justifyContent="space-between">
                <Box p={2}>
                    <Typography variant="h6">Create Invoice</Typography>
                    <Typography variant="body2" gutterBottom >Description on creating invoice</Typography>
                    <FormControl variant="outlined">
                        <OutlinedInput startAdornment={<InputAdornment position="end" style={{ marginRight: 5 }}>to</InputAdornment>} />
                    </FormControl>
                </Box>
                <Box style={{ maxHeight: 400, overflowY: "scroll", marginBottom: "auto" }}>
                    {
                        products.map((product, i) => {
                            return (
                                <Box display='flex' justifyContent='space-between'>
                                    {product.name}
                                    {/* <ListItem key={i} >
                                        <ListItemText primary={product.name} secondary={`Qty ${product.qty}`} />
                                        <Box mr={4}>
                                            <Typography variant="body2" style={{ fontWeight: "bold" }}>Price</Typography>
                                            <Typography variant="body2" >{product.price}</Typography>
                                        </Box>
                                        <Box>
                                            <Typography variant="body2" style={{ fontWeight: "bold" }}>Total</Typography>
                                            <Typography variant="body2" >{product.qty * product.price}</Typography>
                                        </Box>
                                    </ListItem> */}
                                </Box>
                            )
                        })
                    }
                </Box>
                <Box display="flex" justifyContent="space-between" alignItems="center" p={2}>
                    <TexField value={productName} onChange={handleProductChangeName} label="Add Product" variant="outlined" />
                    <TexField value={productQty} onChange={handleProductQtyChange} type="number" label="Qty" variant="outlined" />
                    <TexField value={productPrice} onChange={handleProductPriceChange} type="number" label="Price" variant="outlined" />
                    <Button variant="contained" onClick={addProduct} color="primary">Add</Button>
                </Box>
            </Box>
            <Sidebar total={grandTotal} />
        </Box>
    )
}
export default CreateInvoice;