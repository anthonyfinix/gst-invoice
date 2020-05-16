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
            <Box
                bgcolor="text.primary"
                color="background.paper"
                className="product-search-result-dialog"
                style={{
                    left: props.productSearchElm.getBoundingClientRect().left,
                    top: props.productSearchElm.getBoundingClientRect().top + 50
                }}>
                <List component="nav">
                    {getItems(props.productSearchElm)}
                </List>
            </Box>
        </ClickAwayListener>
    )
}