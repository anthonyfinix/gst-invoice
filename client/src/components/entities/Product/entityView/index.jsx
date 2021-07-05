import React from 'react';
import Box from '@material-ui/core/Box';
import ProductHeader from './header';
import ProductTable from './table'
import { TextField } from '@material-ui/core';
function Product({ context, ...props }) {
    const contextData = React.useContext(context)
    const handleSearch = (e) => { contextData.searchItems(e.target.value) }
    return (
        <Box style={{ height: "100%" }} display="flex" flexDirection="column">
            <Box px={2}>
                <ProductHeader title={contextData.title} toggleDialog={contextData.toggleDialog} context={contextData} />
                <TextField style={{ marginLeft: "auto" }} onChange={handleSearch} variant="outlined" size="small" label="search" />
            </Box>
            <Box style={{ height: "100%", overflowY: "scroll" }}>
                <ProductTable
                    items={contextData.items}
                    columns={contextData.columns}
                    deleteItem={contextData.deleteItem}
                    setEditItem={contextData.setEditItem}
                    toggleDialog={contextData.toggleDialog}
                    setSelectedProduct={contextData.setSelectedProduct}
                />
            </Box>
        </Box>
    )
}

export default React.memo(Product)