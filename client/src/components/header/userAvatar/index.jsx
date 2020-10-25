import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Popover from '@material-ui/core/Popover';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { logoutUser } from '../../../api';
import { UserContext } from '../../../contexts/userContext';

function UserAvatar() {
    const {user,setUser} = React.useContext(UserContext);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const userAvatarRef = React.useRef();
    function handleUserAvatarPopupClick() {
        setAnchorEl(userAvatarRef.current)
    }

    function closeUserAvatarPopup() {
        setAnchorEl(null)
    }
    function handleLogout() {
        logoutUser()
        .then(()=>{
            setUser(null)
            localStorage.removeItem('x-token');
        })
    }

    return (
        <React.Fragment>
            <IconButton size="small" ref={userAvatarRef} onClick={handleUserAvatarPopupClick}>
                <AccountCircleIcon />
            </IconButton>
            <Popover
                open={!!anchorEl}
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right', }}
                transformOrigin={{ vertical: 'top', horizontal: 'right', }}
                onClose={closeUserAvatarPopup}
            >
                <List>
                    <ListItem button>
                        <ListItemText primary={user.name} />
                    </ListItem>
                    <ListItem button onClick={handleLogout}>
                        <ListItemText primary="Logout" />
                    </ListItem>
                </List>
            </Popover>
        </React.Fragment>

    )
}
export default UserAvatar