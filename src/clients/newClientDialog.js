import React from 'react';
import {
    Dialog,
    DialogTitle,
    Card,
    CardContent,
    TextField,
    DialogActions,
    Button,
    Grid,
} from '@material-ui/core'

export default (props) => {
    return (
        <Dialog open={props.dialogToggle} onClose={props.toggleDialog}>
            <Card>
                <DialogTitle>Add New Client</DialogTitle>
                <CardContent>
                    <Grid container direction="column">
                        <Grid item>
                            <TextField required={true} className="pb-3" value={props.newItem.name} onChange={props.newItemValueChange} inputProps={{ name: 'name' }} label="Client Name" variant="outlined" />
                        </Grid>
                        <Grid item>
                            <TextField required={true} className="pb-3" value={props.newItem.company} onChange={props.newItemValueChange} inputProps={{ name: 'company' }} label="Company Name" variant="outlined" />
                        </Grid>
                        <Grid item>
                            <TextField required={true} className="pb-3" value={props.newItem.address} onChange={props.newItemValueChange} inputProps={{ name: 'address' }} label="Address" variant="outlined" />
                        </Grid>
                        <Grid item>
                            <TextField required={true} className="pb-3" type="number" value={props.newItem.contactNumber} onChange={props.newItemValueChange} inputProps={{ name: 'contactNumber' }} label="Contact Number" variant="outlined" />
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