import React, { useState } from 'react';
import Popover from '@material-ui/core/Popover';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import CancelIcon from '@material-ui/icons/Cancel';
import Divider from '@material-ui/core/Divider';
import { getAllClients, partialSearchClientName } from '../../api';

export default (props) => {

    const [searchTerm, setSearchTerm] = useState('');
    const [clients, setClients] = useState([]);
    const handleSearchTermValueChange = (e) => {
        let value = e.target.value;
        if (/[^A-Za-z0-9]/.test(value) || value === '') {
            getAllClients().then((clients) => setClients(clients))
        } else {
            partialSearchClientName(value).then((clients) => setClients(clients))
        }
        setSearchTerm(value);
    }
    const handleClientSelect = (selectedClient) => {
        props.getSelectedClient(selectedClient)
        props.handleClose();
    }
    const getClientList = () => {
        let newClients = clients.map((client, i) => {
            return (
                <ListItem key={i} button onClick={() => handleClientSelect(client)}>
                    <ListItemText primary={client.name} />
                </ListItem >
            )
        })
        return newClients;
    }
    return (
        <React.Fragment>
            <Popover
                open={!!props.el}
                anchorEl={props.el}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                disableRestoreFocus={true}
            >
                <Box p={2}>
                    <Box display="flex" alignItems="center">
                        <TextField
                            variant="outlined"
                            size="small"
                            onChange={handleSearchTermValueChange}
                            value={searchTerm}
                            autoComplete="off"
                            InputProps={{
                                name: 'search',
                                endAdornment: <InputAdornment position="end"><SearchIcon /></InputAdornment>
                            }}
                            label="Search" />
                        <Divider orientation="vertical" />
                        <IconButton onClick={props.handleClose}>
                            <CancelIcon />
                        </IconButton>

                    </Box>
                    <List component="nav">
                        {getClientList()}
                    </List>
                </Box>
            </Popover>
        </React.Fragment>
    )
}