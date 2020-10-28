import React from 'react';
import './main.css'
import Sidebar from '../sidebar';
import Box from '@material-ui/core/Box';
import Product from '../product';
import Header from '../header';
import { AppContext } from '../../contexts/appContext';
import SetProductProvider from '../setProductProvider';

function Main() {
    const { sidebarState } = React.useContext(AppContext)
    return (
        <Box id="app" display="flex" flexDirection="column">
            <Header />
            <Box id="app-main-wrapper" display="flex">
                <div id="app-sidebar-wrapper" className={sidebarState ? 'open' : 'close'}>
                    <Sidebar />
                </div>
                <div id="app-content-wrapper">
                    <SetProductProvider>
                        <Product />
                    </SetProductProvider>
                </div>
            </Box>
        </Box>
    )
}
export default React.memo(Main)