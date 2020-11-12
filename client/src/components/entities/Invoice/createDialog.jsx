import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { InvoiceContext } from './invoiceContext';

function CreateDialog() {
    const { dialogState, toggleDialog, addInvoice, updateInvoices } = React.useContext(InvoiceContext);
    const [recipient, setRecipient] = React.useState('');
    const handleRecipientChange = (e) => setRecipient(e.target.value)
    const handleAddInvoice = () => addInvoice({ recipient }).then(toggleDialog()).then(updateInvoices());
    return (
        <Dialog
            open={dialogState}
            onClose={toggleDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle>Add New Invoice</DialogTitle>
            <DialogContent>
                    <form action="">
                        <TextField
                            type="text"
                            fullWidth size="small"
                            label="Recipient"
                            variant="outlined"
                            margin="normal"
                            value={recipient}
                            onChange={handleRecipientChange}
                            autoComplete="off"
                            name="recipient"
                        />
                    </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={toggleDialog} color="primary">Close</Button>
                <Button onClick={handleAddInvoice} color="primary" autoFocus>Agree</Button>
            </DialogActions>
        </Dialog>
    )
}

export default CreateDialog;