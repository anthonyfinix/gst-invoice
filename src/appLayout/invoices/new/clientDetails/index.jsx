import React, { useState } from 'react';
import SearchDialog from "../../../../utils/searchDialog";
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

export default function ClientDetails(props) {

    const [searchField, setSearchField] = useState(null)

    const handleClientFocusIn = (e) => {
        setSearchField(e.currentTarget.childNodes[1])
    }
    const handleSearchDialogClose = () => {
        setSearchField(null);
    }

    return (
        <Box>
            <TextField variant="outlined" onClick={handleClientFocusIn} value={props.client.name} size="small" autoComplete="off" inputProps={{ name: 'clientName' }} label="Client" />
            <SearchDialog el={searchField} getSelectedClient={props.getSelectedClient} handleClose={handleSearchDialogClose} />
            <Box display="flex" flexDirection="column" p={1}>
                <Typography variant="overline" gutterBottom>{props.client.company}</Typography>
                <Typography variant="body2" gutterBottom>{props.client.address}</Typography>
                <Typography variant="caption" gutterBottom>{props.client.contactNumber}</Typography>
            </Box>
        </Box>
    )
}