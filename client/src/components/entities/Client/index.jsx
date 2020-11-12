import React from 'react';
import ClientProvider, { ClientContext } from './clientContext';
import CreateDialog from './CreateDialog';
import EntityView from './entityView';

function Client() {
    return (
        <ClientProvider>
            <EntityView context={ClientContext} />
            <CreateDialog />
        </ClientProvider>
    )
}

export default Client