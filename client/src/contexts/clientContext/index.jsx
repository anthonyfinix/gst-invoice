import React from 'react';
import getClients from '../../api/client/getClients';
import addClient from '../../api/client/addClient';

export const ClientContext = React.createContext();
function ClientProvider(props) {
    let title = "Client"
    let [dialogState, setDialogState] = React.useState(false);
    const toggleDialog = () => setDialogState(!dialogState)
    const [items, setClients] = React.useState(null);
    const updateClients = () => getClients().then(response => setClients(response))
    React.useEffect(() => { getClients().then(response => setClients(response)) }, [])

    return (
        <ClientContext.Provider value={{ items, title, dialogState, toggleDialog, addClient, updateClients }}>
            {props.children}
        </ClientContext.Provider>
    )
}
export default ClientProvider;