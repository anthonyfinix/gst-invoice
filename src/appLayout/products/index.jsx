import React from 'react';
import ProductTable from './productTable';
import Actions from './actions';
import Box from '@material-ui/core/Box';
import { getAllProducts, deleteProduct, updateProduct, addNewProduct } from '../../api';

import AddProduct from './productAddDilaog';
import EditProduct from './productUpdateDialog';

class Products extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Items: [],
            newItem: {},
            updateFlag: false,
            addFlag: false,
            dialogToggle: false
        }
        this.deleteItem = this.deleteItem.bind(this);
        this.newItemValueChange = this.newItemValueChange.bind(this);
        this.editProduct = this.editProduct.bind(this);
        this.handleAddNewProduct = this.handleAddNewProduct.bind(this);
        this.handleAddProductBtnClick = this.handleAddProductBtnClick.bind(this);
        this.handleAddProductDialogClose = this.handleAddProductDialogClose.bind(this);
        this.handleUpdateProduct = this.handleUpdateProduct.bind(this);
        this.handleUpdateProductBtnClick = this.handleUpdateProductBtnClick.bind(this);
        this.handleUpdateDialogClose = this.handleUpdateDialogClose.bind(this);
        this.getDialog = this.getDialog.bind(this);
    }
    componentDidMount() {
        getAllProducts().then(Items => this.setState({ Items: Items }));

    }
    handleAddProductBtnClick() {
        this.setState({ dialogToggle: true, addFlag: true })
    }
    handleAddProductDialogClose() {
        this.setState({ dialogToggle: false, addFlag: false})
    }
    handleUpdateProductBtnClick() {
        this.setState({ dialogToggle: true, updateFlag: true })
    }
    handleUpdateDialogClose() {
        this.setState({ dialogToggle: false, updateFlag: false })
    }
    editProduct({ _id, name, price, sku, taxRate, description }) {
        this.setState({
            newItem: {
                _id: _id,
                name: name,
                price: price,
                sku: sku,
                taxRate: taxRate,
                description: description,
            }
        })
        this.handleUpdateProductBtnClick();
    }
    deleteItem(id) {
        deleteProduct(id)
            .then(() => getAllProducts())
            .then(Items => this.setState({ Items: Items }));

    }
    handleAddNewProduct(newProductDetails) {
        addNewProduct(newProductDetails)
            .then(() => getAllProducts())
            .then(Items => this.setState({ Items: Items, newItem: {} }))
            .then(() => this.handleAddProductDialogClose());
    }
    handleUpdateProduct() {
        updateProduct(this.state.newItem)
            .then(() => getAllProducts())
            .then(Items => this.setState({ Items: Items, newItem: { name: '', price: '', sku: '', taxRate: '', description: '' } }))
            .then(this.handleUpdateDialogClose());
    }
    newItemValueChange(e) {
        let newItem = { ...this.state.newItem }
        newItem[e.currentTarget.getAttribute('name')] = e.target.value;
        this.setState({ newItem: newItem });
    }
    getDialog() {
        if (this.state.dialogToggle && this.state.updateFlag) {
            return (
                <EditProduct
                    dialogToggle={this.state.dialogToggle}
                    toggleDialog={this.handleUpdateDialogClose}
                    newItem={this.state.newItem}
                    newItemValueChange={this.newItemValueChange}
                    handleUpdateProduct={this.handleUpdateProduct}
                />
            )
        } else if(this.state.dialogToggle && this.state.addFlag) {
            return (
                <AddProduct
                    dialogToggle={this.state.dialogToggle}
                    toggleDialog={this.handleAddProductDialogClose}
                    handleAddProduct={this.handleAddNewProduct}
                />
            )
        }
    }
    render() {
        return (
            <Box px={2}>
                <Actions handleAddProductBtnClick={this.handleAddProductBtnClick} />
                <ProductTable
                    editProduct={this.editProduct}
                    deleteItem={this.deleteItem}
                    products={this.state.Items}
                />
                {this.getDialog()}
            </Box>
        )
    }
}

export default Products;