import React from 'react';
import {
    Dialog,
    DialogTitle,
    Card,
    CardContent,
    TextField,
    DialogActions,
    Button,
    Grid
} from '@material-ui/core'

export default (props) => {
    return (
        <Dialog open={props.dialogToggle} onClose={props.toggleDialog}>
            <Card>
                <DialogTitle>Add New Product</DialogTitle>
                <CardContent>
                    <Grid container direction="column">
                        <Grid item>
                            <TextField required={true}  value={props.newItem.name} onChange={props.newItemValueChange} label="Name" inputProps={{ name: 'name' }} variant="outlined"></TextField>
                        </Grid>
                        <Grid item>
                            <TextField required={true} type="number" value={props.newItem.price} onChange={props.newItemValueChange} label="Price" inputProps={{ name: 'price' }} variant="outlined"></TextField>
                        </Grid>
                        <Grid item>
                            <TextField required={true}  value={props.newItem.sku} onChange={props.newItemValueChange} label="SKU" inputProps={{ name: 'sku' }} variant="outlined"></TextField>
                        </Grid>
                        <Grid item>
                            <TextField required={true} type="number" value={props.newItem.taxRate} onChange={props.newItemValueChange} label="Tax Rate" inputProps={{ name: 'taxRate' }} variant="outlined"></TextField>
                        </Grid>
                        <Grid item>
                            <TextField required={true}  value={props.newItem.description} onChange={props.newItemValueChange} label="Description" inputProps={{ name: 'description' }} variant="outlined"></TextField>
                        </Grid>
                    </Grid>
                </CardContent>
                <DialogActions>
                    <Button color="primary" onClick={props.toggleDialog}>Close</Button>
                    <Button color="primary" onClick={props.addNewItem}>Add</Button>
                </DialogActions>
            </Card>
        </Dialog>
    )
}