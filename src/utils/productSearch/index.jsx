import React from 'react';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import './productSearch.css'

export default (props) => {

    const getItems = () => {
        return props.products.map((product, i) => {
            return <ListItem button key={i} onClick={() => { props.handleSearchProductSelect(product) }}>
                <ListItemText>{product.name}</ListItemText>
            </ListItem>
        })
    }

    return (
        <ClickAwayListener onClickAway={props.closeProductSearchDialog}>
            <Box className="product-search-result-dialog">
                <List component="nav">
                    {getItems()}
                </List>
            </Box>
        </ClickAwayListener>
    )
}