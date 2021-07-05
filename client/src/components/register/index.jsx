import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import CircularProgress from '@material-ui/core/CircularProgress';
import { registerUser } from '../../api';
import './register.css';

function Register() {
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [snackBar, setSnackbar] = React.useState({ open: false, message: '' });
    const [isLoading, setIsLoading] = React.useState(false);
    const history = useHistory();
    const handleNameChange = (e) => {
        setName(e.target.value)
    }
    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }
    const handleUsernameChange = (e) => {
        setUsername(e.target.value)
    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }
    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value)
    }
    const closeSnackbar = () => {
        setSnackbar({ open: false, message: '' })
    }
    const handleRegister = () => {
        setIsLoading(true)
        registerUser({ name, email, username, password })
            .then(response => {
                if (response.error) {
                    setSnackbar({ open: true, message: response.error })
                    setTimeout(() => closeSnackbar(), 6000)
                }else{
                    history.push('/login');
                }
            })
            .catch(error => {
                if (error) {
                    setSnackbar({ open: true, message: error.message })
                    setTimeout(() => closeSnackbar(), 6000)
                }
            })
            .finally(() => setIsLoading(false))
    }

    return (
        <Box id="register-main-wrapper" display="flex" justifyContent="center" alignItems="center">
            {
                isLoading ? (
                    <CircularProgress />
                ) : (
                        <Card id="register-card">
                            <Box display="flex" p={5} flexDirection="column" justifyContent="space-between" alignItems="center">
                                <Typography variant="h6" style={{ fontWeight: "bold" }} gutterBottom>REGISTER</Typography>
                                <TextField
                                    type="text"
                                    fullWidth size="small"
                                    label="Name"
                                    variant="outlined"
                                    margin="normal"
                                    value={name}
                                    onChange={handleNameChange}
                                    autoComplete="off"
                                    name="name"
                                />
                                <TextField
                                    type="text"
                                    fullWidth size="small"
                                    label="Username"
                                    variant="outlined"
                                    margin="normal"
                                    value={username}
                                    onChange={handleUsernameChange}
                                    autoComplete="off"
                                    name="username"
                                />
                                <TextField
                                    type="email"
                                    fullWidth size="small"
                                    label="Email"
                                    variant="outlined"
                                    margin="normal"
                                    value={email}
                                    onChange={handleEmailChange}
                                    autoComplete="off"
                                    name="email"
                                />
                                <TextField
                                    type="password"
                                    fullWidth size="small"
                                    label="Password"
                                    variant="outlined"
                                    margin="normal"
                                    value={password}
                                    onChange={handlePasswordChange}
                                    autoComplete="off"
                                    name="password"
                                />
                                <TextField
                                    type="password"
                                    fullWidth size="small"
                                    label="Confirm Password"
                                    variant="outlined"
                                    margin="normal"
                                    value={confirmPassword}
                                    onChange={handleConfirmPasswordChange}
                                    autoComplete="off"
                                    name="confirmPassword"
                                />
                            </Box>
                            <Box p={2} pt={0} display="flex" justifyContent="space-between">
                                <Button component={Link} to="/login" variant="text">already a user?</Button>
                                <Button variant="contained" color="primary" onClick={handleRegister}>Register</Button>
                            </Box>
                        </Card>
                    )
            }
            <Snackbar open={snackBar.open} onClose={closeSnackbar} message={snackBar.message} />
        </Box>
    )
}

export default Register;