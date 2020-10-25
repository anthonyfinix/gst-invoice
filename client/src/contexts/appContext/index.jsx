import React, { createContext, useState } from 'react';

export const AppContext = createContext()
export default function AppProvider(props) {
    console.log('app context')
    const [appConfiguration] = useState({ name: "GST INVOICE" });
    const [sidebarState, setSidebarState] = useState(1);
    const toggleSidebar = () => {
        setSidebarState(!sidebarState)
    }
    return (
        <AppContext.Provider value={{ appConfiguration, sidebarState, toggleSidebar }}>
            {props.children}
        </AppContext.Provider>
    )
}