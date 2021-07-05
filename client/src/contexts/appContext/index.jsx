import React, { createContext, useState } from 'react';
export const AppContext = createContext();

export default function AppProvider(props) {
    const [appConfiguration] = useState({ name: "GST INVOICE" });
    const [sidebarState, setSidebarState] = useState(1);
    const [currentEntity, setCurrentEntity] = useState("product");
    const toggleSidebar = () => {
        setSidebarState(!sidebarState)
    }
    return (
        <AppContext.Provider value={{ appConfiguration, sidebarState, toggleSidebar, currentEntity, setCurrentEntity }}>
            {props.children}
        </AppContext.Provider>
    )
}