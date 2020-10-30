import React from 'react';
import './main.css'
import Sidebar from '../sidebar';
import Box from '@material-ui/core/Box';
import Header from '../header';
import { AppContext } from '../../contexts/appContext';
import GetEntities from '../getEntity';

function Main() {
    const { sidebarState, currentProduct } = React.useContext(AppContext)
    return (
        <Box id="app" display="flex" flexDirection="column">
            <Header />
            <Box id="app-main-wrapper" display="flex">
                <div id="app-sidebar-wrapper" className={sidebarState ? 'open' : 'close'}>
                    <Sidebar />
                </div>
                <div id="app-content-wrapper">
                    <GetEntities product={currentProduct.entity} />
                </div>
            </Box>
        </Box>
    )
}
export default React.memo(Main)