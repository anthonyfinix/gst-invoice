import React, { useState, useEffect, useContext } from 'react';
import './register.css';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { Link, Redirect } from 'react-router-dom';
import { AppContext } from '../App';
import { getUsernameAvailable, registerUser } from '../api';
import { Name, Password, Username, Email } from '../utils/validate';

export default (props) => {
    const { appDetails: { user } } = useContext(AppContext);
    const [registrationDetails, setRegistrationDetails] = useState({
        username: { value: '', error: '' },
        name: { value: '', error: '' },
        email: { value: '', error: '' },
        password: { value: '', error: '' },
        confirmPassword: { value: '', error: '' }
    });
    const [timer, setTimer] = useState(null);
    const [usernameAvailable, setUsernameAvailable] = useState(null);
    const [isComplete, setIsComplete] = useState(false);
    useEffect(() => {
        if (usernameAvailable === false) {
            let value = registrationDetails;
            value.username.error = 'username not available';
            setRegistrationDetails({ ...value })
        } else {
            let value = registrationDetails;
            let error = validateUsername(value.username.value)
            if (error) {
                value.username.error = error;
            } else {
                value.username.error = '';
            }
            setRegistrationDetails({ ...value })
        }
    }, [usernameAvailable])

    useEffect(() => {
        let completeFlag = true
        Object.keys(registrationDetails).forEach(key => {
            if (registrationDetails[key].value === '' || registrationDetails[key].error !== '') {
                completeFlag = false;
            }
        })
        if (completeFlag) setIsComplete(true)
    }, [registrationDetails])

    const handleRegistrationValueChange = (e) => {
        const element = e.currentTarget;
        let values = registrationDetails;
        let error = '';
        switch (element.getAttribute('name')) {
            case 'username':
                error = validateUsername(element.value)
                if (error) {
                    values.username.error = error
                } else {
                    values.username.error = ''
                }
                checkUserName(element.value)
                break;
            case 'name':
                error = validateName(element.value)
                if (error) {
                    values.name.error = error
                } else {
                    values.name.error = ''
                }
                break;
            case 'email':
                error = validateEmail(element.value)
                if (error) {
                    values.email.error = error
                } else {
                    values.email.error = ''
                }
                break;
            case 'password':
                error = validatePassword(element.value);
                if (error) {
                    values.password.error = error
                } else if (values.confirmPassword.value !== '') {
                    error = comparePassword(values.confirmPassword.value, element.value)
                    if (error) {
                        values.password.error = error;
                    } else {
                        values.password.error = '';
                    }
                } else {
                    values.password.error = ''
                }
                break;
            case 'confirmPassword':
                error = validateConfirmPassword(element.value, values.password.value);
                if (error) {
                    values.confirmPassword.error = error
                } else {
                    values.confirmPassword.error = ''
                }
                break;
            default:
                break;
        }
        values[element.getAttribute('name')].value = element.value;
        setRegistrationDetails({ ...values })
    }

    const checkUserName = (username) => {
        clearTimeout(timer)
        if (username !== '') {
            setTimer(setTimeout(() => {
                getUsernameAvailable(username)
                .then(data => setUsernameAvailable(data.isAvailable))
            }, 500))
        }
    }
    const handleRegistrationClick = () => {
        let regValues = {};
        Object.keys(registrationDetails).forEach(key => {
            if (key !== 'confirmPassword')
                regValues[key] = registrationDetails[key].value;
        })
        registerUser(regValues).then(data => {
            if (data.error) return console.log(data.error)
            props.history.push('/login')
        })
    }
    const validateUsername = (username) => {
        const { error } = Username.validate(username);
        if (error) return error.details[0].message;
    }
    const validateName = (name) => {
        const { error } = Name.validate(name);
        if (error) return error.details[0].message;
    }
    const validateEmail = (name) => {
        const { error } = Email.validate(name);
        if (error) return error.details[0].message;
    }
    const validatePassword = (password) => {
        const { error } = Password.validate(password);
        if (error) return error.details[0].message;
    }
    const validateConfirmPassword = (confirmPassword, password) => {
        return comparePassword(confirmPassword, password)
    }
    const comparePassword = (confirmPassword, password) => {
        if (!password) return
        if (password !== confirmPassword) return 'Password does not match';
    }
    if (user.name) {
        return <Redirect to={`/app`} />
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
                                error={usernameAvailable === false ? true : false}
                                autoComplete='off'
                                variant="outlined"
                                value={registrationDetails.username.value}
                                style={{ marginBottom: 20 }}
                                label="Username"
                                inputProps={{ name: 'username' }}
                                helperText={registrationDetails.username.error}
                                size="small" />
                            <TextField
                                onChange={handleRegistrationValueChange}
                                autoComplete='off'
                                variant="outlined"
                                error={!!registrationDetails.name.error}
                                value={registrationDetails.name.value}
                                helperText={registrationDetails.name.error}
                                style={{ marginBottom: 20 }}
                                label="Name"
                                inputProps={{ name: 'name' }}
                                size="small" />
                            <TextField
                                onChange={handleRegistrationValueChange}
                                autoComplete='off'
                                variant="outlined"
                                error={!!registrationDetails.email.error}
                                value={registrationDetails.email.value}
                                helperText={registrationDetails.email.error}
                                style={{ marginBottom: 20 }}
                                label="Email"
                                inputProps={{ name: 'email' }}
                                size="small" />
                            <TextField
                                onChange={handleRegistrationValueChange}
                                autoComplete='off'
                                variant="outlined"
                                error={!!registrationDetails.password.error}
                                value={registrationDetails.password.value}
                                helperText={registrationDetails.password.error}
                                style={{ marginBottom: 20 }}
                                label="Password"
                                inputProps={{ name: 'password' }}
                                type="password" size="small" />
                            <TextField
                                onChange={handleRegistrationValueChange}
                                autoComplete='off'
                                variant="outlined"
                                error={!!registrationDetails.confirmPassword.error}
                                value={registrationDetails.confirmPassword.value}
                                helperText={registrationDetails.confirmPassword.error}
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
                        <Button
                            disabled={!isComplete}
                            size="small"
                            variant="contained"
                            style={{ marginLeft: 'auto', marginBottom: 5 }}
                            onClick={handleRegistrationClick}
                            color="primary">
                            Register
                        </Button>
                    </CardActions>
                </Card>
            </Box>
        </React.Fragment>
    )
}