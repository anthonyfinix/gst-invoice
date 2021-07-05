import React from 'react';
import Client from '../entities/Client'
import Invoice from '../entities/Invoice'
import Product from '../entities/Product'
import Dashboard from '../dashboard'

function GetEntities(props) {
    switch (props.product) {
        case 'dashboard':
            return (<Dashboard />)
        case 'client':
            return (<Client />)
        case 'invoice':
            return (<Invoice />)
        case 'product':
            return (<Product />)
        default:
            return (<Product />)
    }

}

export default GetEntities
