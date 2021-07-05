import React from 'react';
import Box from '@material-ui/core/Box';
import Header from '../header'
export default function Welcome() {
    return (
        <Box>
            <Header />
            <Box px={3}>
                <h1>Welcome</h1>
            </Box>
        </Box>
    )
}