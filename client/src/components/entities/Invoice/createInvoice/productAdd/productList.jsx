import React from 'react';
import Paper from '@material-ui/core/Paper';
import Fade from '@material-ui/core/Fade';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

export default ({ transition, searchedProducts,setProduct }) => {
    return (
        <Fade {...transition} timeout={350}>
            <Paper>
                <List component="nav">
                    {searchedProducts.map(product => {
                        return (
                            <ListItem key={product._id} onClick={()=>setProduct(product)} button>
                                <ListItemText primary={product.name} />
                            </ListItem>
                        )
                    })}
                </List>
            </Paper>
        </Fade>
    )
}