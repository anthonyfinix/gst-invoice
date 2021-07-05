import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
export default () => {
    return (
        <Box display="flex" justifyContent="space-between" px={2} pb={1}>
            <div style={{ flexGrow: 1, flexBasis: 0 }}>
                <Typography variant="caption">Name</Typography>
            </div>
            <div style={{ flexGrow: 1, flexBasis: 0 }}>
                <Typography variant="caption">Quantity</Typography>
            </div>
            <div style={{ flexGrow: 1, flexBasis: 0 }}>
                <Typography variant="caption">Price</Typography>
            </div>
            <div style={{ flexGrow: 1, flexBasis: 0 }}>
                <Typography variant="caption">Total</Typography>
            </div>
        </Box>
    )
}