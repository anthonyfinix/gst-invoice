import React from 'react';
import Box from '@material-ui/core/Box';
import ProductHeader from './header';
import ClientTable from './table'
import TextField from '@material-ui/core/TextField';


function Product({ context, ...props }) {
    const contextData = React.useContext(context)
    const handleSearch = (e) => { contextData.searchItems(e.target.value) }
    return (
        <Box style={{height:"100%"}} display="flex" flexDirection="column">
            <Box>
                <ProductHeader title={contextData.title} toggleDialog={contextData.toggleDialog} context={contextData} />
                <TextField style={{ marginLeft: "auto" }} onChange={handleSearch} variant="outlined" size="small" label="search" />
            </Box>
            <Box flexGrow={1} style={{height:"100%",overflowY:"scroll"}}>
                <ClientTable
                items={contextData.items}
                columns={contextData.columns}
                deleteItem={contextData.deleteItem}
                setSelectedClient={contextData.setSelectedClient}
                toggleDialog={contextData.toggleDialog}
                />
            </Box>
        </Box>
    )
}

export default React.memo(Product)