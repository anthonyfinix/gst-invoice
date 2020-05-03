import React from 'react';
import { TextField } from '../../../utils/mui';

export default function ClientDetails(props){
    return(
        <TextField variant="outlined" value={props.client.name} disabled={true} size="small" autoComplete="off" inputProps={{ name: 'clientName' }} label="Client"/>
    )
}