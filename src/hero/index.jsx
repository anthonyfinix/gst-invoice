import React, { useContext } from "react";
import "./hero.css";
import { NavLink } from "react-router-dom";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import express from "../assets/express.svg";
import js from "../assets/js.svg";
import mongodb from "../assets/mongodb.svg";
import mui from "../assets/mui.svg";
import node from "../assets/nodejs.svg";
import passport from "../assets/passportJS.svg";
import react from "../assets/react.svg";
import { Link } from "react-router-dom";
import { AppContext } from "../App";

export default (props) => {
  const { appDetails } = useContext(AppContext);
  const getNavButton = () => {
    if (appDetails.user.name) {
      return (
        <Link style={{ marginLeft: "auto" }} to={`/app`}>
          <Button color="inherit">{appDetails.user.name}</Button>
        </Link>
      );
    }
    return (
      <Link style={{ marginLeft: "auto" }} to="/login">
        <Button color="inherit">Login</Button>
      </Link>
    )
  };
  return (
    <div id="welcome-wrapper">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">GSTINVOICE</Typography>
          {getNavButton()}
        </Toolbar>
      </AppBar>
      <div className="caption-wrapper" style={{ margin: "auto" }}>
        <h1>Welcome to Invoice</h1>
        <p>invoicing made easier</p>
        <div>
          <NavLink to="/login">
            <Button variant="contained" color="primary">
              Login
            </Button>
          </NavLink>
          <NavLink to="/register">
            <Button variant="contained" color="primary">
              Register
            </Button>
          </NavLink>
        </div>
      </div>
      <div className="softwareStacks-wrapper" style={{ marginTop: "auto" }}>
        <small>Made with love</small>
        <div>
          <img src={express} alt="express" />
          <img src={js} alt="javascript" />
          <img src={mongodb} alt="mongodb" />
          <img src={mui} alt="material ui" />
          <img src={node} alt="node js" />
          <img src={passport} alt="passport js" />
          <img src={react} alt="react js" />
        </div>
      </div>
    </div>
  );
};
