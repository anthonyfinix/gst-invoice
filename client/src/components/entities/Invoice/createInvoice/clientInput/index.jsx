import TextField from '@material-ui/core/TextField';
import React from 'react';
import Popper from '@material-ui/core/Popper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import getSearchClients from '../../../Client/api/getSearchClients';
import ClientList from './clientList';

function ClientInput({ setRecipient }) {
    const [searchedClients, setSearchedClients] = React.useState([])
    const [recipientName, setRecipientName] = React.useState('');
    const [recipientEmail, setRecipientEmail] = React.useState('');
    const handleRecipientNameChange = (e) => setRecipientName(e.target.value);
    const handleRecipientEmailChange = (e) => setRecipientEmail(e.target.value);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        getSearchClients(event.target.value)
            .then(response => setSearchedClients(response))
    };
    const handleSearchedItemClick = (client) => {
        setRecipient({ name: client.name, email: client.email });
        setRecipientName(client.name)
        setRecipientEmail(client.email)
        handleClose()
    }

    return (
        <React.Fragment>
            <TextField
                name="RecipientName"
                variant="outlined"
                size="small"
                value={recipientName}
                onChange={handleRecipientNameChange}
                onKeyUp={handleClick}
                style={{ marginRight: 15 }}
                label="Recipient Name" />

            <TextField
                name="RecipientEmail"
                variant="outlined"
                size="small"
                value={recipientEmail}
                onChange={handleRecipientEmailChange}
                label="Email" />

            <ClickAwayListener onClickAway={handleClose}>
                <Popper placement="bottom-start" open={!!anchorEl} anchorEl={anchorEl} transition>
                    {({ TransitionProps }) => <ClientList setRecipient={handleSearchedItemClick} searchedClients={searchedClients} transition={TransitionProps} />}
                </Popper>
            </ClickAwayListener>

        </React.Fragment>
    )
}

export default ClientInput;