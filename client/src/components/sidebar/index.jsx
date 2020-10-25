import React, { memo } from 'react';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

function Sidebar() {
    return (
        <Box>
            <List component="nav">
                <ListItem button>
                    <ListItemText primary="List 1" />
                </ListItem>
                <ListItem button>
                    <ListItemText primary="List 2" />
                </ListItem>
                <ListItem button>
                    <ListItemText primary="List 3" />
                </ListItem>
            </List>
        </Box>
    )
}
export default memo(Sidebar)