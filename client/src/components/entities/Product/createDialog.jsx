import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { ProductContext } from './productContext';
import Snackbar from '@material-ui/core/Snackbar';

function CreateDialog() {
    const { dialogState, toggleDialog, addProduct, updateProducts } = React.useContext(ProductContext);
    const [response, setResponse] = React.useState("");
    const handleClose = () => setResponse("");
    const [name, setName] = React.useState('');
    const [price, setPrice] = React.useState('');
    const handleNameChange = (e) => setName(e.target.value);
    const handlePriceChange = (e) => setPrice(e.target.value);
    const handleAddProduct = () => {
        addProduct({ name, price })
            .then((response) => {
                if(response.error) return setResponse(response.error)
                toggleDialog()
                setName('');
                setPrice('');
                updateProducts()
            })
    }
    return (
        <React.Fragment>
            <Dialog
                open={dialogState}
                onClose={toggleDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle>Add New Product</DialogTitle>
                <DialogContent>
                    <form action="">
                        <TextField
                            type="text"
                            fullWidth size="small"
                            label="Product Name"
                            variant="outlined"
                            margin="normal"
                            value={name}
                            onChange={handleNameChange}
                            autoComplete="off"
                            name="name"
                        />
                        <TextField
                            type="number"
                            fullWidth size="small"
                            label="Products Price"
                            variant="outlined"
                            margin="normal"
                            value={price}
                            onChange={handlePriceChange}
                            autoComplete="off"
                            name="price"
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={toggleDialog} color="primary">Close</Button>
                    <Button onClick={handleAddProduct} color="primary" autoFocus>Add</Button>
                </DialogActions>
            </Dialog>

<Snackbar
    anchorOrigin={{ vertical: 'bottom', horizontal: 'center', }}
    open={!!response}
    onClose={handleClose}
    message={response}
/>
        </React.Fragment>
    )
}

export default CreateDialog;