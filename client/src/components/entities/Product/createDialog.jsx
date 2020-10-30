import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { ProductContext } from '../../../contexts/productContext';

function CreateDialog() {
    const { dialogState, toggleDialog, addProduct, updateProducts } = React.useContext(ProductContext);
    const [name, setName] = React.useState('');
    const handleNameChange = (e) => {
        setName(e.target.value)
    }
    const handleAddProduct = () => {
        addProduct({ name })
            .then(toggleDialog())
            .then(updateProducts())
    }
    return (
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
                        label="Username"
                        variant="outlined"
                        margin="normal"
                        value={name}
                        onChange={handleNameChange}
                        autoComplete="off"
                        name="username"
                    />
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={toggleDialog} color="primary">Close</Button>
                <Button onClick={handleAddProduct} color="primary" autoFocus>Add</Button>
            </DialogActions>
        </Dialog>
    )
}

export default CreateDialog;