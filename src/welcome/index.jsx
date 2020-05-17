import React from 'react';
import './welcome.css';
import { NavLink } from 'react-router-dom';
import Button from '@material-ui/core/Button'
import express from '../assets/express.svg';
import js from '../assets/js.svg';
import mongodb from '../assets/mongodb.svg';
import mui from '../assets/mui.svg';
import node from '../assets/nodejs.svg';
import passport from '../assets/passportJS.svg';
import react from '../assets/react.svg';

export default (props) => {
    return (
        <div id="welcome-wrapper">
            <div className="caption-wrapper" style={{margin: 'auto'}}>
                <h1>Welcome to Invoice</h1>
                <p>invoicing made easier</p>
                <div>
                <NavLink to="/login">
                    <Button variant="contained" color="primary">Login</Button>
                </NavLink>
                <NavLink to="/register">
                    <Button variant="contained" color="primary">Register</Button>
                </NavLink>
                </div>
            </div>
            <div className="softwareStacks-wrapper" style={{marginTop: 'auto'}}>
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
    )
}