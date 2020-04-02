import React from 'react';
import { IconButton, Paper, Container } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import MaterialTable from "material-table";

import NewProduct from './newProductDialog';

class Products extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Items: [],
            newItem: {
                name: '',
                price: '',
                sku: '',
                taxRate: '',
                description: '',
            },
            dialogToggle: false
        }
        this.deleteItem = this.deleteItem.bind(this);
        this.addNewItem = this.addNewItem.bind(this);
        this.newItemValueChange = this.newItemValueChange.bind(this);
        this.toggleDialog = this.toggleDialog.bind(this);
        this.getSingleItem = this.getSingleItem.bind(this);
        this.fetchItems().then(Items => this.setState({ Items: Items }));
    }
    columns = [
        { title: 'Name', field: 'name' },
        { title: 'Price', field: 'price' },
        { title: 'Description', field: 'description' }
    ];
    getSingleItem(data) {
        (async (id) => {
            let response = await fetch('http://localhost:3100/products/' + id, { method: 'GET' })
                .then(res => res.json());
            return response;
        })(data._id)
            .then(singleItem => this.setState({
                newItem: {
                    _id: singleItem[0]._id,
                    name: singleItem[0].name,
                    price: singleItem[0].price,
                    sku: singleItem[0].sku,
                    taxRate: singleItem[0].taxRate,
                    description: singleItem[0].description,
                }
            }))
            .then(this.toggleDialog())
    }
    deleteItem(data) {
        (async (id) => {
            let response = await fetch('http://localhost:3100/products/' + id, { method: 'DELETE' })
                .then(res => res.json());
            return response;
        })(data._id)
            .then(deletedItem => console.log(deletedItem))
            .then(() => this.fetchItems())
            .then(Items => this.setState({ Items: Items }));

    }
    async fetchItems() {
        let Items = await fetch('http://localhost:3100/products/').then(res => res.json());
        return Items;
    }
    async addNewItem() {
        let response;
        if (this.state.newItem._id) {
            response = await fetch('http://localhost:3100/products/' + this.state.newItem._id, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: this.state.newItem.name,
                    price: this.state.newItem.price,
                    sku: this.state.newItem.sku,
                    taxRate: this.state.newItem.taxRate,
                    description: this.state.newItem.description,
                }),
            })
        } else {
            response = await fetch('http://localhost:3100/products/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: this.state.newItem.name,
                    price: this.state.newItem.price,
                    sku: this.state.newItem.sku,
                    taxRate: this.state.newItem.taxRate,
                    description: this.state.newItem.description,
                }),
            })
        }
        response.json()
            .then(result => console.log(result))
            .then(() => this.fetchItems())
            .then(Items => this.setState({ Items: Items }))
            .then(this.toggleDialog());
    }
    newItemValueChange(e) {
        let newItem = { ...this.state.newItem }
        newItem[e.currentTarget.getAttribute('name')] = e.target.value;
        this.setState({ newItem: newItem });
    }
    toggleDialog() {
        this.setState({ 
            dialogToggle: !this.state.dialogToggle ,
            newItem: {
                name: '',
                price: '',
                sku: '',
                taxRate: '',
                description: '',
            }
        });
    }
    render() {
        return (
            <Container maxWidth="lg" className="py-3">
                <Paper>
                    <IconButton onClick={this.toggleDialog}>
                        <AddIcon />
                    </IconButton>
                </Paper>
                {/* <List component="nav">
                    {this.getItems()}
                </List> */}
                <MaterialTable
                    columns={this.columns}
                    data={this.state.Items}
                    title="Products"
                    actions={[
                        {
                            icon: 'launch',
                            tooltip: 'Edit Product',
                            onClick: (event, rowData) => { this.getSingleItem(rowData) }
                        },
                        {
                            icon: 'delete',
                            tooltip: 'Delete Product',
                            onClick: (event, rowData) => { this.deleteItem(rowData) }
                        },
                    ]}
                    options={{
                        actionsColumnIndex: -1
                    }}
                />
                <NewProduct
                    dialogToggle={this.state.dialogToggle}
                    toggleDialog={this.toggleDialog}
                    newItem={this.state.newItem}
                    newItemValueChange={this.newItemValueChange}
                    addNewItem={this.addNewItem}
                />
            </Container>
        )
    }
}

export default Products;