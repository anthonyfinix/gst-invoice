import React, { useState, useContext } from 'react';
import './login.css';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { Link, Redirect } from 'react-router-dom';
import { loginUser } from '../api';
import { AppContext } from '../App';

export default (props) => {
    const { appDetails: { user } } = useContext(AppContext);
    const [loginDetails, setLoginCred] = useState({
        username: { value: '', error: '' },
        password: { value: '', error: '' }
    });
    const handleLoginInputChange = (e) => {
        const el = e.currentTarget;
        const newLoginDetails = loginDetails;
        newLoginDetails[el.getAttribute('name')].value = el.value;
        setLoginCred({ ...newLoginDetails })
    }
    const handleLoginBtnClick = () => {
        if (loginDetails.username.error) return;
        if (loginDetails.password.error) return;
        loginUser(loginDetails.username.value, loginDetails.password.value)
            .then(data => {
                if (data.error) return null;
                localStorage.setItem('gstInvoice', data.token);
                props.setUser(data)
                    .then((data) => {
                        props.history.push('/app')
                    })
            });

    }
    if (user.name) {
        return <Redirect to={`/app`} />
    } else {
        return (
            <React.Fragment>
                <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" className="login-wrapper">
                    <Card style={{ margin: 'auto' }}>
                        <CardContent>
                            <Box display="flex" flexDirection="column" alignItems="center" justifyItems="center">
                                <Typography variant="h6">WELCOME</Typography>
                                <Typography variant="caption" style={{ marginBottom: 20 }}>Please type your credentials</Typography>
                                <TextField
                                    variant="outlined"
                                    inputProps={{ name: 'username' }}
                                    value={loginDetails.username.value}
                                    style={{ marginBottom: 20 }}
                                    onChange={handleLoginInputChange}
                                    label="Username"
                                    size="small" />
                                <TextField
                                    variant="outlined"
                                    inputProps={{ name: 'password' }}
                                    value={loginDetails.password.value}
                                    style={{ marginBottom: 20 }}
                                    onChange={handleLoginInputChange}
                                    label="Password"
                                    type="password"
                                    size="small" />
                            </Box>
                        </CardContent>
                        <CardActions>
                            <Link to="/register">
                                <Button size="small" style={{ marginBottom: 5 }} color="primary">Register</Button>
                            </Link>
                            <Button onClick={handleLoginBtnClick} size="small" variant="contained" style={{ marginLeft: 'auto', marginBottom: 5 }} color="primary">
                                Login
                            </Button>
                        </CardActions>
                    </Card>
                </Box>
            </React.Fragment>
        )
    }
}