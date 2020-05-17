import React from 'react';
import './login.css';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

export default (props) => {
    return (
        <React.Fragment>
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" className="login-wrapper">
                <Card style={{ margin: 'auto' }}>
                    <CardContent>
                        <Box display="flex" flexDirection="column" alignItems="center" justifyItems="center">
                            <Typography variant="h6">WELCOME</Typography>
                            <Typography variant="caption" style={{ marginBottom: 20 }}>Please type your credentials</Typography>
                            <TextField variant="outlined" style={{ marginBottom: 20 }} label="Username" size="small" />
                            <TextField variant="outlined" style={{ marginBottom: 20 }} label="Password" type="password" size="small" />
                        </Box>
                    </CardContent>
                    <CardActions>
                        <Link to="/register">
                            <Button size="small" style={{ marginBottom: 5 }} color="primary">Register</Button>
                        </Link>
                        <Button size="small" variant="contained" style={{ marginLeft: 'auto', marginBottom: 5 }} color="primary">
                            Login
                        </Button>
                    </CardActions>
                </Card>
            </Box>
        </React.Fragment>
    )
}