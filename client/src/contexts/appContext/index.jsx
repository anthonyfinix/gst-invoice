import React, { createContext, useState } from 'react';
export const AppContext = createContext();

export default function AppProvider(props) {
    const [appConfiguration] = useState({ name: "GST INVOICE" });
    const [sidebarState, setSidebarState] = useState(1);
    const [currentProduct, setCurrentProduct] = useState({provider:"ProductProvider",context:"ProductContext"});
    const toggleSidebar = () => {
        setSidebarState(!sidebarState)
    }
    return (
        <AppContext.Provider value={{ appConfiguration, sidebarState, toggleSidebar, currentProduct, setCurrentProduct }}>
            {props.children}
        </AppContext.Provider>
    )
}