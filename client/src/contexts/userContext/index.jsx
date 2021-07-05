import React from 'react';
import { useEffect } from 'react';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import { getCurrentUser } from '../../api';

export const UserContext = React.createContext();

function UserProvider(props) {
    const [user, setUser] = React.useState(null);
    const [isLoading, setIsloading] = React.useState(1);

    useEffect(() => {
        setCurrentUser()
    }, [])

    function setCurrentUser() {
        getCurrentUser()
            .then(response => {
                if (response && !response.error) {
                    setUser(response);
                }
            })
            .finally(() => setIsloading(0))
    }

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {isLoading ? (
                <Box display="flex" alignItems="center" justifyContent="center" style={{ width: '100%', height: '100vh' }}>
                    <CircularProgress />
                </Box>
            ) : props.children}
        </UserContext.Provider>
    )
}

export default React.memo(UserProvider);