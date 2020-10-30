import React, { memo } from 'react';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { AppContext } from '../../contexts/appContext';
import links from './links';

function Sidebar() {
    const { setCurrentEntity } = React.useContext(AppContext)
    const handleSidebarItemClick = (link) => {
        setCurrentEntity(link.entity)
    }
    return (
        <Box>
            <List component="nav">
                {Object.keys(links).map((item) => {
                    return (
                        <ListItem key={links[item].title} onClick={() => handleSidebarItemClick(links[item])} button>
                            <ListItemText primary={links[item].title} />
                        </ListItem>
                    )
                })}
            </List>
        </Box>
    )
}
export default memo(Sidebar)