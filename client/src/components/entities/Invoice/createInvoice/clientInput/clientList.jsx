import React from 'react';
import Paper from '@material-ui/core/Paper';
import Fade from '@material-ui/core/Fade';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

export default ({ transition, searchedClients,setRecipient }) => {
    return (
        <Fade {...transition} timeout={350}>
            <Paper>
                <List component="nav">
                    {searchedClients.map(client => {
                        return (
                            <ListItem key={client._id} onClick={()=>setRecipient(client)} button>
                                <ListItemText primary={client.name} />
                            </ListItem>
                        )
                    })}
                </List>
            </Paper>
        </Fade>
    )
}