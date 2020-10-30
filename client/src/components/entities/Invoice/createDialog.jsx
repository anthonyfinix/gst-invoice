import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { InvoiceContext } from '../../../contexts/invoiceContext';

function CreateDialog() {
    const { dialogState, toggleDialog } = React.useContext(InvoiceContext);
    const [name,setName] = React.useState('');
    const handleNameChange = (e)=>{
        setName(e.target.value)
    }
    return (
        <Dialog
            open={dialogState}
            onClose={toggleDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle>Add New Invoice</DialogTitle>
            <DialogContent>
                <DialogContentText>
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
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={toggleDialog} color="primary">Close</Button>
                <Button color="primary" autoFocus>Agree</Button>
            </DialogActions>
        </Dialog>
    )
}

export default CreateDialog;