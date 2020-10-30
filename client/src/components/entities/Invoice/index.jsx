import React from 'react';
import InvoiceProvider, { InvoiceContext } from '../../../contexts/invoiceContext';
import CreateDialog from './createDialog';
import EntityView from '../../entityView'

function Invoice() {
    return (
        <InvoiceProvider>
            <EntityView context={InvoiceContext} />
            <CreateDialog/>
        </InvoiceProvider>
    )
}

export default Invoice