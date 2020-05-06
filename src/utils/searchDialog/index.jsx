import React, { useState } from 'react';
import Popover from '@material-ui/core/Popover';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import { getAllClients, partialSearchClientName } from '../../api';

export default (props) => {

    const [searchTerm, setSearchTerm] = useState('');
    const [clients, setClients] = useState([]);
    const handleSearchTermValueChange = (e) => {
        let value = e.target.value;
        if (value === '') {
            getAllClients().then((clients) => setClients(clients))
        } else {
            partialSearchClientName(value).then((clients) => setClients(clients))
        }
        setSearchTerm(value);
    }
    const handleClientSelect = (selectedClient)=>{
        props.getSelectedClient(selectedClient)
        props.handleClose();
    }
    const getClientList = () => {
        let newClients = clients.map((client, i) => {
            return (
                <ListItem key={i} button onClick={()=>handleClientSelect(client)}>
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
                onClose={props.handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <Box p={2}>
                    <TextField variant="outlined" size="small" onChange={handleSearchTermValueChange} value={searchTerm} autoComplete="off" inputProps={{ name: 'search' }} label="Search" />
                    <List component="nav">
                        {getClientList()}
                    </List>
                </Box>
            </Popover>
        </React.Fragment>
    )
}