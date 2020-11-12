import React from 'react';
import addClient from '../api/addClient';
import getClients from '../api/getClients';
import deleteClient from '../api/deleteClient';
import getSearchClients from '../api/getSearchClients';

export const ClientContext = React.createContext();
function ClientProvider(props) {
    let title = "Client"
    let [dialogState, setDialogState] = React.useState(false);
    const toggleDialog = () => setDialogState(!dialogState)
    const [clients, setClients] = React.useState(null);
    const [columns] = React.useState(['name', 'email']);
    const updateClients = () => getClients().then(response => setClients(response));
    const searchClients = (query) => getSearchClients(query).then(response => setClients(response));
    const handleItemDelete = (id) => {
        deleteClient(id).then((response) => {
            console.log(response)
            updateClients()
        })
    };
    React.useEffect(() => { getClients().then(response => setClients(response)) }, [])

    return (
        <ClientContext.Provider value={{
            items: clients,
            columns,
            title,
            dialogState,
            toggleDialog,
            addClient,
            updateClients,
            searchItems: searchClients,
            deleteItem: handleItemDelete
        }}>
            {props.children}
        </ClientContext.Provider>
    )
}
export default ClientProvider;