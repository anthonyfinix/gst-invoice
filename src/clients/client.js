import React from 'react';
import { IconButton, Paper, Container } from '@material-ui/core';
import AddIcon from "@material-ui/icons/Add";
import MaterialTable from "material-table";
import { Route, Redirect } from 'react-router-dom';

import NewClient from './newClientDialog';
import NewInvoice from '../invoices/newInvoice';

class Clients extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Items: [],
            newItem: {
                name: '',
                company: '',
                address: '',
                contactNumber: '',
            },
            newInvoiceId: null,
            dialogToggle: false,
        }
        this.linktoNewInvoice = this.linktoNewInvoice.bind(this);
        this.getSingleItem = this.getSingleItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.addNewItem = this.addNewItem.bind(this);
        this.newItemValueChange = this.newItemValueChange.bind(this);
        this.toggleDialog = this.toggleDialog.bind(this);
        this.fetchItems().then(Items => this.setState({ Items: Items }));
    }
    columns = [
        { title: 'Name', field: 'name' },
        { title: 'Company', field: 'company' },
        { title: 'Number', field: 'contactNumber' }
    ];
    linktoNewInvoice(data) {
        this.setState({ newInvoiceId: data._id });
    }
    getSingleItem(data) {
        (async (id) => {
            let response = await fetch('http://localhost:3100/clients/' + id, { method: 'GET' })
                .then(res => res.json());
            return response;
        })(data._id)
            .then(singleItem => this.setState({
                newItem: {
                    _id: singleItem[0]._id,
                    name: singleItem[0].name,
                    company: singleItem[0].company,
                    address: singleItem[0].address,
                    contactNumber: singleItem[0].contactNumber,
                }
            }))
            .then(this.toggleDialog())
    }
    deleteItem({ _id }) {
        (async (id) => {
            let response = await fetch('http://localhost:3100/clients/' + id, { method: 'DELETE' })
                .then(res => res.json());
            return response;
        })(_id)
            .then(deletedItem => console.log(deletedItem))
            .then(() => this.fetchItems())
            .then(Items => this.setState({ Items: Items }));
    }
    async fetchItems() {
        let Items = await fetch('http://localhost:3100/clients/').then(res => res.json());
        return Items;
    }
    async addNewItem() {
        let response;
        if (this.state.newItem._id) {
            response = await fetch('http://localhost:3100/clients/' + this.state.newItem._id, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: this.state.newItem.name,
                    company: this.state.newItem.company,
                    address: this.state.newItem.address,
                    contactNumber: this.state.newItem.contactNumber,
                }),
            })
        } else {
            response = await fetch('http://localhost:3100/clients/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: this.state.newItem.name,
                    company: this.state.newItem.company,
                    address: this.state.newItem.address,
                    contactNumber: this.state.newItem.contactNumber,
                }),
            })
        }
        response.json()
            .then(result => console.log(result))
            .then(() => this.fetchItems())
            .then(Items => this.setState({ Items: Items }))
            .then(this.toggleDialog);
    }
    newItemValueChange(e) {
        let newItem = { ...this.state.newItem }
        newItem[e.currentTarget.getAttribute('name')] = e.target.value;
        this.setState({ newItem: newItem });
    }
    toggleDialog() {
        this.setState({
            dialogToggle: !this.state.dialogToggle,
            newItem: {
                _id: '',
                name: '',
                company: '',
                address: '',
                contactNumber: '',
            }
        })
    }
    render() {
        if (this.state.newInvoiceId != null) {
            return <Redirect to={`/invoices/new/${this.state.newInvoiceId}`} />
        } else {
            return (
                <Container maxWidth="lg" className="py-3">
                    <Paper>
                        <IconButton onClick={this.toggleDialog}>
                            <AddIcon />
                        </IconButton>
                    </Paper>
                    <MaterialTable
                        columns={this.columns}
                        data={this.state.Items}
                        title="Clients"
                        actions={[
                            {
                                icon: 'receipt',
                                tooltip: 'Edit Product',
                                onClick: (event, rowData) => { this.linktoNewInvoice(rowData) }
                            },
                            {
                                icon: 'launch',
                                tooltip: 'Edit Product',
                                onClick: (event, rowData) => { this.getSingleItem(rowData) }
                            },
                            {
                                icon: 'delete',
                                tooltip: 'Delete User',
                                onClick: (event, rowData) => { this.deleteItem(rowData) }
                            },
                        ]}
                        options={{
                            actionsColumnIndex: -1
                        }}
                    />
                    <Route exact path='/invoice/new' component={NewInvoice} />
                    <NewClient
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
}

export default Clients