import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
export default (props)=>{
    return (
        <Box display="flex" style={{width: '100%',height: '100vh'}}>
            <Typography>GSTINVOICE</Typography>
            <LinearProgress />
        </Box>
    )
}