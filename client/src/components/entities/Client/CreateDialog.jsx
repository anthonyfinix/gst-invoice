import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import { ClientContext } from './clientContext';

function CreateDialog() {
    const { dialogState, toggleDialog, addClient, updateClients } = React.useContext(ClientContext);
    const [response, setResponse] = React.useState("");
    const handleClose = () => setResponse("");
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const handleNameChange = (e) => setName(e.target.value)
    const handleEmailChange = (e) => setEmail(e.target.value)
    const handleAddClient = () => {
        addClient({ name, email })
            .then((response) => {
                if (response.error) return setResponse(response.error)
                toggleDialog()
                setName('')
                setEmail('')
                updateClients()
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
                <DialogTitle>Add New Client</DialogTitle>
                <DialogContent>
                    <form action="">
                        <TextField
                            type="text"
                            fullWidth size="small"
                            label="Client Name"
                            variant="outlined"
                            margin="normal"
                            value={name}
                            onChange={handleNameChange}
                            autoComplete="off"
                            name="clientName"
                        />
                        <TextField
                            type="email"
                            fullWidth size="small"
                            label="Client Email Address"
                            variant="outlined"
                            margin="normal"
                            value={email}
                            onChange={handleEmailChange}
                            autoComplete="off"
                            name="clientEmail"
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={toggleDialog} color="primary">Cancel</Button>
                    <Button onClick={handleAddClient} color="primary" autoFocus>Add Client</Button>
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