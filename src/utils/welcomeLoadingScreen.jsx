import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
export default (props)=>{
    return (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" style={{width: '100%',height: '100vh'}}>
            <Typography variant="button" gutterBottom >GSTINVOICE</Typography>
            <div style={{width: 200}}>
                <LinearProgress/>

            </div>
        </Box>
    )
}