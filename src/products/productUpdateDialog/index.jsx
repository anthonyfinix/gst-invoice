import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

export default (props) => {
    return (
        <Dialog open={props.dialogToggle} onClose={props.toggleDialog}>
            <DialogTitle className="pb-0">Update Product</DialogTitle>
            <Box p={2}>
                <TextField
                    size="small"
                    required={true}
                    className="pb-3"
                    value={props.newItem.name}
                    onChange={props.newItemValueChange}
                    label="Name"
                    inputProps={{ name: 'name' }}
                    style={{ width: "100%" }}
                    variant="outlined" />

                <Box display="flex">
                    <TextField
                        size="small"
                        className="pb-3"
                        required={true}
                        type="number"
                        value={props.newItem.price}
                        onChange={props.newItemValueChange}
                        label="Price"
                        inputProps={{ name: 'price' }}
                        style={{ width: "100%" }}
                        variant="outlined" />
                    <TextField
                        size="small"
                        className="pb-3"
                        required={true}
                        value={props.newItem.sku}
                        onChange={props.newItemValueChange}
                        label="SKU"
                        inputProps={{ name: 'sku' }}
                        style={{ width: "100%" }}
                        variant="outlined" />

                </Box>
                <TextField
                    size="small"
                    required={true}
                    className="pb-3"
                    type="number"
                    value={props.newItem.taxRate}
                    onChange={props.newItemValueChange} label="Tax Rate"
                    inputProps={{ name: 'taxRate' }}
                    style={{ width: "100%" }}
                    variant="outlined" />
                <TextField
                    size="small"
                    className="pb-3"
                    required={true}
                    value={props.newItem.description}
                    onChange={props.newItemValueChange}
                    label="Description"
                    inputProps={{ name: 'description' }}
                    style={{ width: "100%" }}
                    variant="outlined" />
                <DialogActions>
                    <Button color="primary" onClick={props.toggleDialog}>Close</Button>
                    <Button color="primary" variant="contained" onClick={props.handleUpdateProduct}>Update</Button>
                </DialogActions>
            </Box>
        </Dialog>
    )
}