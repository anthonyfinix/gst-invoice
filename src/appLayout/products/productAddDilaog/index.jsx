import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
export default (props) => {
    const [productDetails, setProductDetails] = useState({
        name: { value: '', error: '' },
        price: { value: '', error: '' },
        sku: { value: '', error: '' },
        description: { value: '', error: '' },
        taxRate: { value: '', error: '' }
    });
    const handleValueChange = (e) => {
        let value = e.target.value;
        let name = e.currentTarget.getAttribute('name');
        let product = productDetails;
        switch (name) {
            case 'name':
                product[name].error = checkProductName(value);
                break;
            case 'price':
                product[name].error = checkPrice(value);
                break;
            case 'sku':
                product[name].error = checkSku(value);
                break;
            case 'description':
                product[name].error = checkDescription(value);
                break;
            case 'taxRate':
                product[name].error = checkTaxRate(value)
                break;
            default:
                break;
        }
        product[name].value = value;
        setProductDetails({ ...product });
    }
    const handleAddProductClick = () => {
        let productValues = {};
        Object.keys(productDetails).forEach(productKey => {
            productValues[productKey] = productDetails[productKey].value;
        })
        props.handleAddProduct(productValues);
    }
    const checkProductName = (value) => {
        // check  empty
        // if (!/\b.+\b/.test(value)) {
        //     return 'Client name should not be empty'
        // } else {
        //     return ''
        // }
        return '';
    }
    const checkPrice = (value) => {
        // if (!/^.+$/.test(value)) {
        //     return 'Client name should not be empty'
        // } else {
        //     return ''
        // }
        return '';
    }
    const checkSku = (value) => {
        // if (!/^.+$/.test(value)) {
        //     return 'Client name should not be empty'
        // } else if (!/\b\w+@\w+\.\w{1,4}\b/.test(value)) {
        //     return 'enter a valid email address'
        // } else {
        //     return ''
        // }
        return '';
    }
    const checkDescription = (value) => {
        // if (!/^.+$/.test(value)) {
        //     return 'Client name should not be empty'
        // } else if (!/\b\d\d\d\d\d\d\d\d\d\d\b/.test(value)) {
        //     return 'needs to be more a 10 Digit Number'
        // } else {
        //     return ''
        // }
        return '';
    }
    const checkTaxRate = (value) => {
        // if (!/^.+$/.test(value)) {
        //     return 'Client name should not be empty'
        // } else {
        //     return ''
        // }
        return '';
    }
    return (
        <Dialog open={props.dialogToggle} onClose={props.toggleDialog}>
            <DialogTitle className="pb-0">Add New Product</DialogTitle>
            <Typography variant="caption" gutterBottom className="px-4">
                Update products's details
                </Typography>
            <Box p={2}>
                <form autoComplete="off">
                    <TextField
                        size="small"
                        required={true}
                        helperText={productDetails.name.error}
                        error={!!productDetails.name.error}
                        onChange={handleValueChange}
                        inputProps={{ name: 'name' }}
                        className="pb-3"
                        autoComplete="off"
                        value={productDetails.name.value}
                        style={{ width: "100%" }}
                        label="Product Name"
                        variant="outlined" />
                    <Box display="flex">
                        <TextField
                            size="small"
                            type="number"
                            required={true}
                            helperText={productDetails.price.error}
                            error={!!productDetails.price.error}
                            onChange={handleValueChange}
                            inputProps={{ name: 'price' }}
                            className="pb-3 mr-3"
                            autoComplete="off"
                            value={productDetails.price.value}
                            style={{ width: "100%" }}
                            label="Product Price"
                            variant="outlined" />
                        <TextField
                            size="small"
                            required={true}
                            helperText={productDetails.sku.error}
                            error={!!productDetails.sku.error}
                            onChange={handleValueChange}
                            inputProps={{ name: 'sku' }}
                            className="pb-3"
                            autoComplete="off"
                            value={productDetails.sku.value}
                            style={{ width: "100%" }}
                            label="Product SKU code"
                            variant="outlined" />
                    </Box>
                    <TextField
                        size="small"
                        required={true}
                        typ="number"
                        helperText={productDetails.taxRate.error}
                        error={!!productDetails.taxRate.error}
                        onChange={handleValueChange}
                        inputProps={{ name: 'taxRate' }}
                        className="pb-3"
                        autoComplete="off"
                        value={productDetails.taxRate.value}
                        style={{ width: "100%" }}
                        label="Product Tax Rate"
                        variant="outlined" />
                    <TextField
                        size="small"
                        required={true}
                        helperText={productDetails.description.error}
                        error={!!productDetails.description.error}
                        onChange={handleValueChange}
                        inputProps={{ name: 'description' }}
                        className="pb-3"
                        autoComplete="off"
                        value={productDetails.description.value}
                        style={{ width: "100%" }}
                        label="Product Description"
                        variant="outlined" />
                </form>
            </Box>
            <DialogActions>
                <Button color="primary" onClick={props.toggleDialog}>Close</Button>
                <Button color="primary" variant="contained" onClick={handleAddProductClick}>Add</Button>
            </DialogActions>
        </Dialog>
    )
}