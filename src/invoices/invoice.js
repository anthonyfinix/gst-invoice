import React from 'react';

class invoices extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            clients: [],
            newItem: {
                client: { name: '', id: '' },
                productsId: []
            }
        }
        this.deleteItem = this.deleteItem.bind(this);
        this.addNewItem = this.addNewItem.bind(this);
        this.newItemNameChange = this.newItemNameChange.bind(this);
        this.getClients = this.getClients.bind(this);
        this.searchClients = this.searchClients.bind(this);
        this.fetchItems().then(Items => this.setState({ items: Items }));
    }
    deleteItem(e) {
        let id = e.target.getAttribute('value');
        (async (id) => {
            let response = await fetch('http://localhost:3100/invoices/' + id, { method: 'DELETE' })
                .then(res => res.json());
            return response;
        })(id)
            .then(deletedItem => console.log(deletedItem))
            .then(() => this.fetchItems())
            .then(Items => this.setState({ Items: Items }));

    }
    getItems() {
        let Items = this.state.items.map((Items, i) => {
            return (
                <li key={i} className="list-group-Items">{Items.client.name}
                    <span style={{ marginLeft: 20 }} value={Items._id} onClick={this.deleteItem}>Delete</span>
                </li>
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
            <div>
                <h3>invoices List</h3>
                <ul className="nav">
                    <li className="nav-item nav-link">
                        <button className="btn btn-primary" onClick={this.addNewItem}>Add new</button>
                    </li>
                </ul>
                <input list="clients" value={this.state.newItem.name} placeholder="Name" onChange={this.newItemNameChange} />
                <datalist id="clients">
                    {this.searchClients()}
                </datalist>
                <ul className="list-group">
                    {this.getItems()}
                </ul>
            </div>
        )
    }
}

export default invoices;