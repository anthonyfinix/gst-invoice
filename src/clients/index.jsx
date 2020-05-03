import React from 'react';
import { Container } from '../utils/mui';
import { Route, Redirect } from 'react-router-dom';
import ClientsTable from "./clientsTable";
import NewClient from './newClient';
import NewInvoice from '../invoices/new';
import Actions from './actions';
import { getAllClients, getSingleClient, deleteSingleClient, addNewClient, updateClient } from "../api";

class Clients extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Items: [],
            newItem: {
                name: '',
                email: '',
                company: '',
                address: '',
                contactNumber: '',
            },
            newInvoiceId: null,
            dialogToggle: false,
        }
        getAllClients().then(clients => {
            this.setState({ Items: clients })
        })
        this.linktoNewInvoice = this.linktoNewInvoice.bind(this);
        this.getSingleItem = this.getSingleItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.addNewItem = this.addNewItem.bind(this);
        this.newItemValueChange = this.newItemValueChange.bind(this);
        this.toggleDialog = this.toggleDialog.bind(this);
    }
    linktoNewInvoice(data) {
        this.setState({ newInvoiceId: data._id });
    }
    getSingleItem(data) {
        getSingleClient(data._id)
            .then(singleItem => this.setState({
                newItem: {
                    _id: singleItem[0]._id,
                    name: singleItem[0].name,
                    email: singleItem[0].email,
                    company: singleItem[0].company,
                    address: singleItem[0].address,
                    contactNumber: singleItem[0].contactNumber,
                }
            }))
            .then(this.toggleDialog())
    }
    deleteItem({ _id }) {
        deleteSingleClient(_id)
            .then(deletedItem => console.log(deletedItem))
            .then(() => getAllClients())
            .then(Items => this.setState({ Items: Items }));
    }
    addNewItem() {
        if (this.state.newItem._id) {
            updateClient(this.state.newItem)
                .then(() => getAllClients())
                .then(Items => this.setState({ Items: Items }))
                .then(this.toggleDialog);
        } else {
            addNewClient(this.state.newItem)
                .then(()=>getAllClients())
                .then(Items => this.setState({ Items: Items }))
                .then(this.toggleDialog);
        }
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
                _id: '', name: '', email: '', company: '', address: '', contactNumber: '',
            }
        })
    }
    render() {
        if (this.state.newInvoiceId != null) {
            return <Redirect to={`/invoices/new/${this.state.newInvoiceId}`} />
        } else {
            return (
                <Container>
                    <Actions addNewItem={this.toggleDialog} />
                    <Route exact path='/invoice/new' component={NewInvoice} />
                    <ClientsTable
                        clients={this.state.Items}
                        getSingleItem={this.getSingleItem}
                        deleteItem={this.deleteItem}
                    />
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