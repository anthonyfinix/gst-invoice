import React from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import { AppContext } from '../../../contexts/appContext';

function SidebarToggle() {
    const { toggleSidebar } = React.useContext(AppContext);
    return (
        <IconButton onClick={toggleSidebar}>
            <MenuIcon />
        </IconButton>
    )
}

export default SidebarToggle;