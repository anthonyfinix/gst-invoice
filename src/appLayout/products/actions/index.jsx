import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

export default (props)=>{
    const handleAddNewBtnClick = ()=>{
        props.handleAddProductBtnClick();
    }
    return (
        <Toolbar className="actionToolbar px-0">
            <Typography variant="h5" className="main-title">
                Products
            </Typography>
            <Button
            style={{marginLeft: 'auto'}}
                variant="contained"
                color="primary"
                endIcon={<Icon>add</Icon>}
                size="small"
                onClick={handleAddNewBtnClick}
            >
                Add new
            </Button>
        </Toolbar>
    )
}