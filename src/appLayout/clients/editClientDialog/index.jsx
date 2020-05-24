import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

export default (props) => {

    const [clientDetails, setClientDetails] = useState({
        _id: { value: props.client._id, error: '' },
        name: { value: props.client.name, error: '' },
        company: { value: props.client.company, error: '' },
        email: { value: props.client.email, error: '' },
        contactNumber: { value: props.client.contactNumber, error: '' },
        address: { value: props.client.address, error: '' }
    })

    const handleValueChange = (e) => {
        let value = e.target.value;
        let name = e.currentTarget.getAttribute('name');
        let client = clientDetails;
        switch (name) {
            case 'name':
                client[name].error = checkClientName(value);
                break;
            case 'company':
                client[name].error = checkCompanyName(value);
                break;
            case 'email':
                client[name].error = checkEmail(value);
                break;
            case 'contactNumber':
                client[name].error = checkContactNumber(value);
                break;
            case 'address':
                client[name].error = checkAddress(value)
                break;
            default:
                break;
        }
        client[name].value = value;
        setClientDetails({ ...client });
    }

    const checkClientName = (value) => {
        // check  empty
        if (!/\b.+\b/.test(value)) {
            return 'Client name should not be empty'
        } else {
            return ''
        }
    }
    const checkCompanyName = (value) => {
        if (!/^.+$/.test(value)) {
            return 'Client name should not be empty'
        } else {
            return ''
        }
    }
    const checkEmail = (value) => {
        if (!/^.+$/.test(value)) {
            return 'Client name should not be empty'
        } else if (!/\b\w+@\w+\.\w{1,4}\b/.test(value)) {
            return 'enter a valid email address'
        } else {
            return ''
        }
    }
    const checkContactNumber = (value) => {
        if (!/^.+$/.test(value)) {
            return 'Client name should not be empty'
        } else if (!/\b\d\d\d\d\d\d\d\d\d\d\b/.test(value)) {
            return 'needs to be more a 10 Digit Number'
        } else {
            return ''
        }
    }
    const checkAddress = (value) => {
        if (!/^.+$/.test(value)) {
            return 'Client name should not be empty'
        } else {
            return ''
        }
    }

    const handleDialogClose = () => {
        setClientDetails({
            _id: { value: '', error: '' },
            name: { value: '', error: '' },
            company: { value: '', error: '' },
            email: { value: '', error: '' },
            contactNumber: { value: '', error: '' },
            address: { value: '', error: '' }
        })
        props.EditClientDialogClose();
    }

    const handleClientUpdateCBtnlick = () => {
        props.handleClientUpdate(clientDetails)
            .then(() => { props.EditClientDialogClose() })
    }
    return (
        <Dialog open={props.dialogToggle} onClose={handleDialogClose} className="new-client-dialog">
            <Card>
                <DialogTitle className="pb-0">Edit Client</DialogTitle>
                <Typography variant="caption" gutterBottom className="px-4">
                    Edit client's details
                </Typography>
                <CardContent>
                    <form autoComplete="off">
                        <TextField
                            size="small"
                            required={true}
                            helperText={clientDetails.name.error}
                            error={!!clientDetails.name.error}
                            onChange={handleValueChange}
                            inputProps={{ name: 'name' }}
                            className="pb-3"
                            autoComplete="off"
                            value={clientDetails.name.value}
                            style={{ width: "100%" }}
                            label="Client Name"
                            variant="outlined" />

                        <TextField size="small"
                            required={true}
                            helperText={clientDetails.company.error}
                            error={!!clientDetails.company.error}
                            value={clientDetails.company.value}
                            className="pb-3"
                            autoComplete="off"
                            onChange={handleValueChange}
                            inputProps={{ name: 'company' }}
                            style={{ width: "100%" }}
                            label="Company Name"
                            variant="outlined" />

                        <Box display="flex">
                            <TextField size="small"
                                required={true}
                                helperText={clientDetails.email.error}
                                error={!!clientDetails.email.error}
                                value={clientDetails.email.value}
                                inputProps={{ name: 'email' }}
                                className="pb-3 mr-3"
                                autoComplete="off"
                                onChange={handleValueChange}
                                label="Client Email"
                                variant="outlined" />

                            <TextField
                                size="small"
                                required={true}
                                helperText={clientDetails.contactNumber.error}
                                error={!!clientDetails.contactNumber.error}
                                value={clientDetails.contactNumber.value}
                                inputProps={{ name: 'contactNumber' }}
                                className="pb-3"
                                type="number"
                                autoComplete="off"
                                onChange={handleValueChange}
                                label="Contact Number"
                                variant="outlined" />

                        </Box>

                        <TextField
                            required={true}
                            helperText={clientDetails.address.error}
                            error={!!clientDetails.address.error}
                            value={clientDetails.address.value}
                            inputProps={{ name: 'address' }}
                            className="pb-3"
                            style={{ width: "100%" }}
                            autoComplete="off"
                            onChange={handleValueChange}
                            label="Address"
                            variant="outlined" />

                    </form>
                </CardContent>
                <DialogActions>
                    <Button color="primary" onClick={handleDialogClose}>Close</Button>
                    <Button color="primary" onClick={handleClientUpdateCBtnlick} variant="contained">Update</Button>
                </DialogActions>
            </Card>
        </Dialog>
    )
}