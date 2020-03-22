import React from 'react';

class Products extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Items: [],
            newItem: {
                name: '',
                price: ''
            }
        }
        this.deleteItem = this.deleteItem.bind(this);
        this.addNewItem = this.addNewItem.bind(this);
        this.newItemNameChange = this.newItemNameChange.bind(this);
        this.newItemPriceChange = this.newItemPriceChange.bind(this);
        this.fetchItems().then(Items => this.setState({ Items: Items }));
    }
    deleteItem(e) {
        let id = e.target.getAttribute('value');
        (async (id) => {
            let response = await fetch('http://localhost:3100/Products/' + id,{method: 'DELETE'})
                .then(res => res.json());
            return response;
        })(id)
            .then(deletedItem => console.log(deletedItem))
            .then(() => this.fetchItems())
            .then(Items => this.setState({ Items: Items }));

    }
    getItems() {
        let Items = this.state.Items.map((Items, i) => {
            return (
                <li key={i} className="list-group-Items">{Items.name}
                    <span style={{marginLeft: 20}} value={Items._id} onClick={this.deleteItem}>Delete</span>
                </li>
            )
        });
        return Items;
    }
    async fetchItems() {
        let Items = await fetch('http://localhost:3100/Products/').then(res => res.json());
        return Items;
    }
    async addNewItem() {
        let response = await fetch('http://localhost:3100/Products/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: this.state.newItem.name, price: this.state.newItem.price }),
        })
        response.json()
            .then(result => console.log(result))
            .then(() => this.fetchItems())
            .then(Items => this.setState({ Items: Items }));
    }
    newItemNameChange(e) {
        this.setState({ newItem: { name: e.target.value, price: this.state.newItem.price } })
    }
    newItemPriceChange(e) {
        this.setState({ newItem: { name: this.state.newItem.name, price: e.target.value } })
    }
    render() {
        return (
            <div>
                <h3>Products List</h3>
                <ul className="nav">
                    <li className="nav-Items nav-link">
                        <button className="btn btn-primary" onClick={this.addNewItem}>Add new</button>
                    </li>
                </ul>
                <input value={this.state.newItem.name} placeholder="Name" onChange={this.newItemNameChange} />
                <input value={this.state.newItem.price} placeholder="Price" onChange={this.newItemPriceChange} />
                <ul className="list-group">
                    {this.getItems()}
                </ul>
            </div>
        )
    }
}

export default Products;