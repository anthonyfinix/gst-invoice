import React from 'react';
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography';

function Sidebar({total,handlePreview,handleSent,handleDraft,...props}) {
    return (
        <Box id="new-invoice-sidebar" p={2} display="flex" flexDirection="column">
            <Button variant="outlined" onClick={handlePreview} color="primary">Preview</Button>
            <Button variant="outlined" onClick={handleDraft} color="primary">Draft</Button>
            <Button variant="outlined" onClick={handleSent} color="primary">Sent</Button>
            <Box mt="auto">
                <Typography variant="h6" align="right">Total</Typography>
                <Typography variant="h2" align="right">{total}</Typography>
            </Box>
        </Box>
    )
}

export default Sidebar;