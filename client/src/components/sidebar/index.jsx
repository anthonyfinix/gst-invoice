import React, { memo } from 'react';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import links from './links';
import { AppContext } from '../../contexts/appContext';

function Sidebar() {
    const { setCurrentProduct } = React.useContext(AppContext)
    const handleSidebarItemClick = (link) => {
        setCurrentProduct(link.entity)
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