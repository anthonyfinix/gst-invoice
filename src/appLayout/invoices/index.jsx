import React from 'react';
import Box from '@material-ui/core/Box';
import Actions from './actions';
import InvoicesTable from './invoicesTable';
import {getAllInvoices,deleteSingleInvoice } from '../../api'

class invoices extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Items: [],
        }
        this.handleInvoiceDelete = this.handleInvoiceDelete.bind(this);
        this.addNewItem = this.addNewItem.bind(this);
        this.newItemNameChange = this.newItemNameChange.bind(this);
        this.getClients = this.getClients.bind(this);
        this.searchClients = this.searchClients.bind(this);
        this.getInvoice = this.getInvoice.bind(this);
        getAllInvoices().then(Items => this.setState({ Items: Items }));
    }
    handleInvoiceDelete(invoiceId) {
        deleteSingleInvoice(invoiceId)
        .then(()=>getAllInvoices())
        .then((invoices)=>this.setState({Items:invoices}))
        // console.log(invoiceId)
    }
    async getInvoice(id) {
        let response = await fetch('http://localhost:3100/invoices/' + id, { method: 'DELETE' })
            .then(res => res.json());
        return response;
    }
    async fetchItems() {
        let Items = await fetch('http://localhost:3100/invoices/').then(res => res.json());
        return Items;
    }
    async addNewItem() {
        let response = await fetch('http://localhost:3100/invoices/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: this.state.newItem.name, company: this.state.newItem.company }),
        })
        response.json()
            .then(result => console.log(result))
            .then(() => this.fetchItems())
            .then(Items => this.setState({ Items: Items }));
    }
    async getClients(searchTerm) {
        let clients = await fetch('http://localhost:3100/clients/search/' + searchTerm).then(res => res.json());
        return clients;
    };
    newItemNameChange(e) {
        this.getClients(e.target.value).then(data => this.setState({ clients: data }));
        // this.setState({ newItem: { client: { name: e.target.value }, productsId: [] } })
    }
    searchClients() {
        let clients = this.state.clients.map(client => {
            return <option>{client.name}</option>
        });
        return clients
    }
    render() {
        return (
            <Box px={1}>
                <Actions />
                <InvoicesTable handleInvoiceDelete={this.handleInvoiceDelete} invoices={this.state.Items} />
            </Box>
        )
    }
}

export default invoices;