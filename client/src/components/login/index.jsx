import React from 'react';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link, useHistory } from 'react-router-dom';
import './login.css';
import { loginUser } from '../../api';
import { UserContext } from '../../contexts/userContext';

function Login() {
    let { setUser } = React.useContext(UserContext);
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [snackBar, setSnackbar] = React.useState({ open: false, message: '' });
    const [isLoading, setIsLoading] = React.useState(false);
    const history = useHistory();

    const handleUsernameChange = (e) => {
        setUsername(e.target.value)
    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }
    const closeSnackbar = () => {
        setSnackbar({ open: false, message: '' })
    }
    const handleLogin = () => {
        setIsLoading(true);
        loginUser({ username, password })
            .then(response => {
                if (response.error) {
                    setSnackbar({ open: true, message: response.error })
                    setTimeout(() => closeSnackbar(), 6000)
                } else {
                    localStorage.setItem('x-token',response.accessToken)
                    setUser(response)
                    history.push('/app');
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
        <Box id="login-main-wrapper" display="flex" justifyContent="center" alignItems="center">
            {isLoading ? <CircularProgress /> : (
                <Card id="login-card">
                    <Box display="flex" p={5} flexDirection="column" justifyContent="space-between" alignItems="center">
                        <Typography variant="h6" style={{ fontWeight: "bold" }} gutterBottom>LOGIN</Typography>
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
                    </Box>
                    <Box p={2} pt={0} display="flex" justifyContent="space-between">
                        <Button component={Link} to="/register" variant="text">Not a user?</Button>
                        <Button variant="contained" color="primary" onClick={handleLogin}>Login</Button>
                    </Box>
                </Card>
            )}
            <Snackbar open={snackBar.open} onClose={closeSnackbar} message={snackBar.message} />
        </Box>
    )
}

export default Login;