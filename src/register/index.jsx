import React, { useState, useEffect } from 'react';
import './register.css';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { Link, Redirect } from 'react-router-dom';
import { getUsernameAvailable } from '../api'

export default (props) => {
    const [registrationDetails, setRegistrationDetails] = useState({ username: '', name: '', password: '', confirmPassword: '' });
    const [timer, setTimer] = useState(null);
    const [usernameAvailable, setUsernameAvailable] = useState(null);
    const handleRegistrationValueChange = (e) => {
        const element = e.currentTarget;
        let values = registrationDetails;
        switch (element.getAttribute('name')) {
            case 'username':
                clearTimeout(timer)
                if (element.value !== '') {
                    setTimer(setTimeout(() => {
                        getUsernameAvailable(element.value).
                            then(data => setUsernameAvailable(data.isAvailable))
                    }, 500))
                }
                break;
            case 'name':
                console.log('name')
                break;
            case 'password':
                console.log('password')
                break;
            case 'confirmPassword':
                console.log('confirm password')
                break;
        }
        values[element.getAttribute('name')] = element.value;
        setRegistrationDetails({ ...values })
    }
    return (
        <React.Fragment>
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" className="login-wrapper">
                <Card style={{ margin: 'auto' }}>
                    <CardContent>
                        <Box display="flex" flexDirection="column" alignItems="center" justifyItems="center">
                            <Typography variant="h6">REGISTRATION</Typography>
                            <Typography variant="caption" style={{ marginBottom: 20 }}>Please type your details</Typography>
                            <TextField
                                onChange={handleRegistrationValueChange}
                                autoComplete='off'
                                variant="outlined"
                                value={registrationDetails.username}
                                style={{ marginBottom: 20 }}
                                label="Username"
                                error={false}
                                inputProps={{ name: 'username' }}
                                helperText={usernameAvailable === false ? "username taken" : ""}
                                size="small" />
                            <TextField
                                onChange={handleRegistrationValueChange}
                                autoComplete='off'
                                variant="outlined"
                                value={registrationDetails.name}
                                style={{ marginBottom: 20 }}
                                label="Name"
                                inputProps={{ name: 'name' }}
                                size="small" />
                            <TextField
                                onChange={handleRegistrationValueChange}
                                autoComplete='off'
                                variant="outlined"
                                value={registrationDetails.password}
                                style={{ marginBottom: 20 }}
                                label="Password"
                                inputProps={{ name: 'password' }}
                                type="password" size="small" />
                            <TextField
                                onChange={handleRegistrationValueChange}
                                autoComplete='off'
                                variant="outlined"
                                value={registrationDetails.confirmPassword}
                                style={{ marginBottom: 20 }}
                                label="Confirm Password"
                                inputProps={{ name: 'confirmPassword' }}
                                type="password" size="small" />
                        </Box>
                    </CardContent>
                    <CardActions>
                        <Link to="/login">
                            <Button size="small" style={{ marginBottom: 5 }} color="primary">Login</Button>
                        </Link>
                        <Button size="small" variant="contained" style={{ marginLeft: 'auto', marginBottom: 5 }} color="primary">
                            Register
                        </Button>
                    </CardActions>
                </Card>
            </Box>
        </React.Fragment>
    )
}