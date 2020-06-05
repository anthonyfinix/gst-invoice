import React, { useContext, useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Popover from "@material-ui/core/Popover";
import "./header.css";
import { AppContext } from "../../App";

export default ({ match, ...props }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const {
    appDetails: { user },
    setUserDetails,
  } = useContext(AppContext);
  console.log(user)

  const handleUserBtnClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleUserMenuClose = (e) => {
    setAnchorEl(null);
};
const handleLogoutBtnClick = ()=>{
    localStorage.removeItem('gstInvoice');
    setUserDetails(null)
    setAnchorEl(null);
  }
  return (
    <React.Fragment>
      <AppBar position="static" className="main-header">
        <Toolbar className="toolbar">
          <IconButton onClick={props.toggleDrawer}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">GST INVOICE</Typography>
          <Button
            style={{ marginLeft: "auto" }}
            onClick={handleUserBtnClick}
            color="inherit"
          >
            {user.name}
          </Button>
        </Toolbar>
      </AppBar>
      <Popover
        anchorEl={anchorEl}
        keepMounted
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorEl)}
        onClose={handleUserMenuClose}
      >
        <MenuItem onClick={handleUserMenuClose}>Profile</MenuItem>
        <MenuItem onClick={handleLogoutBtnClick}>Logout</MenuItem>
      </Popover>
    </React.Fragment>
  );
};
