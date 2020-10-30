import React from 'react';
import getAllClients from '../../api/getClients';

export const ClientContext = React.createContext();
function ClientProvider(props) {
    let [dialogState, setDialogState] = React.useState(false);
    const toggleDialog = () => {
        setDialogState(!dialogState)
    }
    let title = "Client"
    const [items, setClients] = React.useState(null);
    React.useEffect(() => {
        getAllClients()
            .then(response => setClients(response))
    }, [])

    return (
        <ClientContext.Provider value={{ items, title, dialogState, toggleDialog }}>
            {props.children}
        </ClientContext.Provider>
    )
}
export default ClientProvider;