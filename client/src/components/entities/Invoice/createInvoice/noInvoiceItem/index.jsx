
import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
function NoProductItem(){
    return(
        <Box display="flex" alignItems="center" justifyContent="center" mt={5}>
            <Typography variant="h3" style={{opacity:.1,fontWeight:"bolder"}}>Add a Product</Typography>
        </Box>
    )
}
export default NoProductItem