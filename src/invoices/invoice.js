import React from 'react';
import { Typography, IconButton, Container } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';

class invoices extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Items: [],
        }
        this.deleteItem = this.deleteItem.bind(this);
        this.addNewItem = this.addNewItem.bind(this);
        this.newItemNameChange = this.newItemNameChange.bind(this);
        this.getClients = this.getClients.bind(this);
        this.searchClients = this.searchClients.bind(this);
        this.getInvoice = this.getInvoice.bind(this);
        this.fetchItems().then(Items => this.setState({ Items: Items }));
    }
    deleteItem(e) {
        let id = e.currentTarget.getAttribute('value');
        this.getInvoice(id)
            .then(deletedItem => console.log(deletedItem))
            this.fetchItems()
            .then(Items => this.setState({ Items: Items }));
    }
    async getInvoice(id) {
        let response = await fetch('http://localhost:3100/invoices/' + id, { method: 'DELETE' })
            .then(res => res.json());
        return response;
    }
    getItems() {
        let Items = this.state.Items.map((Item, i) => {
            return (
                <ListItem key={i}>
                    <ListItemText primary={Item.client.name} />
                    <IconButton value={Item._id} onClick={this.deleteItem}>
                        <DeleteIcon />
                    </IconButton>
                </ListItem>
            )
        });
        return Items;
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
            <Container maxWidth="lg" className="py-3">
                <Typography gutterBottom={true} variant="h5">
                    Invoices
                </Typography>
                {/* <ul className="nav">
                    <li className="nav-item nav-link">
                        <button className="btn btn-primary" onClick={this.addNewItem}>Add new</button>
                    </li>
                </ul> */}
                {/* <input list="clients" value={this.state.newItem.name} placeholder="Name" onChange={this.newItemNameChange} />
                <datalist id="clients">
                    {this.searchClients()}
                </datalist> */}
                <List component="nav">
                    {this.getItems()}
                </List>
            </Container>
        )
    }
}

export default invoices;