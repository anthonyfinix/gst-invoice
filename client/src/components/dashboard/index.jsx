import { Box } from '@material-ui/core';
import React from 'react';
import { UserContext } from '../../contexts/userContext';
function Dashboard() {
    const { user } = React.useContext(UserContext);
    console.log(user)
    return (
        <Box>
            <h1>Dashboard</h1>
            <p>{user.invoiceIssuedCount}</p>
        </Box>
    )
}
export default Dashboard;