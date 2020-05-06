import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import Actions from './actions';
import InvoicesTable from './invoicesTable';

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
            <Box px={1}>
                <Actions/>
                <InvoicesTable invoices={this.state.Items}/>
            </Box>
        )
    }
}

export default invoices;