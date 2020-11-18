import TextField from '@material-ui/core/TextField';
import React from 'react';
import Popper from '@material-ui/core/Popper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import getSearchClients from '../../../Client/api/getSearchClients';
import ClientList from './clientList';

function ClientInput({
    recipientName,
    handleRecipientNameChange,
    recipientEmail,
    handleRecipientEmailChange,
    searchedClients,
    setSearchedClients,
    setClient
}) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        getSearchClients(event.target.value)
            .then(response => setSearchedClients(response))
    };
    const handleSearchedItemClick = (client)=>{
        setClient(client)
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
                    {({ TransitionProps }) => <ClientList setClient={handleSearchedItemClick} searchedClients={searchedClients} transition={TransitionProps} />}
                </Popper>
            </ClickAwayListener>

        </React.Fragment>
    )
}

export default ClientInput;