import React from 'react';
import TextField from '@material-ui/core/TextField';

export default function ClientDetails(props){

    const handleClientFocusIn = ()=>{
        console.log('client focus')
    }
    const handleClientFocusOut = ()=>{
        console.log('client focus out')
    }

    return(
        <TextField variant="outlined" onFocus={handleClientFocusIn} onBlur={handleClientFocusOut} value={props.client.name} size="small" autoComplete="off" inputProps={{ name: 'clientName' }} label="Client"/>
    )
}