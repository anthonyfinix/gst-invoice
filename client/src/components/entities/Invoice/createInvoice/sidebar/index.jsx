import React from 'react';
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography';

function Sidebar({total,...props}) {
    return (
        <Box id="new-invoice-sidebar" p={2} display="flex" flexDirection="column">
            <Button variant="outlined" color="primary">Preview</Button>
            <Button variant="outlined" color="primary">Draft</Button>
            <Button variant="outlined" color="primary">Sent</Button>
            <Typography variant="h3">{total}</Typography>
        </Box>
    )
}

export default Sidebar;