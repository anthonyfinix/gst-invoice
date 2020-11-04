import React from 'react';
import getClients from '../../api/client/getClients';
import addClient from '../../api/client/addClient';
import getSearchClients from '../../api/client/getSearchClients';

export const ClientContext = React.createContext();
function ClientProvider(props) {
    let title = "Client"
    let [dialogState, setDialogState] = React.useState(false);
    const toggleDialog = () => setDialogState(!dialogState)
    const [clients, setClients] = React.useState(null);
    const updateClients = () => getClients().then(response => setClients(response))
    const searchClients = (query) => getSearchClients(query).then(response => setClients(response))
    React.useEffect(() => { getClients().then(response => setClients(response)) }, [])

    return (
        <ClientContext.Provider value={{
            items: clients,
            title,
            dialogState,
            toggleDialog,
            addClient,
            updateClients,
            searchItems:searchClients
        }}>
            {props.children}
        </ClientContext.Provider>
    )
}
export default ClientProvider;