import React from 'react';
import InvoiceProvider, { InvoiceContext } from './invoiceContext';
import EntityView from './entityView';
import CreateInvoice from './createInvoice';
import { useRouteMatch, Route } from 'react-router-dom'

function Invoice() {
    const match = useRouteMatch();
    return (
        <InvoiceProvider>
            <Route exact path={match.path} render={(props) => {
                return (
                    <React.Fragment>
                        <EntityView {...props} context={InvoiceContext} />
                    </React.Fragment>
                )
            }} />
            <Route path={match.path + '/NewInvoice'} component={CreateInvoice} />
        </InvoiceProvider>
    )
}

export default Invoice