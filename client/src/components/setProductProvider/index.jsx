import React from 'react';
import { AppContext } from '../../contexts/appContext';
import product from '../../contexts';
function SetProductProvider(props) {
    let { currentProduct } = React.useContext(AppContext)
    let Provider = product.providers[currentProduct.provider];
    return (
        <Provider>
            {props.children}
        </Provider>
    )
}

export default SetProductProvider