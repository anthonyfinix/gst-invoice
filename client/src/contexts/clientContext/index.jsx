import React from 'react';
import getAllClients from '../../api/getClients';

export const ClientContext = React.createContext();
function ClientProvider(props) {
    const [items, setClients] = React.useState(null);
    React.useEffect(() => {
        getAllClients()
            .then(response => setClients(response))
    }, [])

    return (
        <ClientContext.Provider value={{ items }}>
            {props.children}
        </ClientContext.Provider>
    )
}
export default ClientProvider;