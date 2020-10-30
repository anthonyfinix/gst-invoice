import React from 'react';
import Client from '../entities/Client'
import Invoice from '../entities/Invoice'
import Product from '../entities/Product'

function GetEntities(props) {
    switch (props.product) {
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
