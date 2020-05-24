import React from 'react';
import Box from '@material-ui/core/Box'
import { Route} from 'react-router-dom';
import ClientsTable from "./clientsTable";
import NewClientDialog from './newClientDialog';
import EditClientDialog from "./editClientDialog";
import NewInvoice from '../invoices/new';
import Actions from './actions';
import { getAllClients, getSingleClient, deleteSingleClient, addNewClient, updateClient } from "../../api";

class Clients extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Items: [],
            dialogToggle: false,
            addClientFlag: false,
            editClientFlag: false,
        }
        getAllClients().then(clients => {
            this.setState({ Items: clients })
        })
        this.getSingleItem = this.getSingleItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.handleAddNewClient = this.handleAddNewClient.bind(this);
        this.AddNewClientDialogClose = this.AddNewClientDialogClose.bind(this);
        this.handleClientUpdate = this.handleClientUpdate.bind(this);
        this.EditClientDialogClose = this.EditClientDialogClose.bind(this);
        this.getDialog = this.getDialog.bind(this);
        this.handleAddNewBtnClick = this.handleAddNewBtnClick.bind(this);
        this.handleEditClientBtnClick = this.handleEditClientBtnClick.bind(this);
    }
    getDialog() {
        if (this.state.dialogToggle === true && this.state.addClientFlag === true) {
            return <NewClientDialog
                dialogToggle={this.state.dialogToggle}
                AddNewClientDialogClose={this.AddNewClientDialogClose}
                handleAddNewClient = {this.handleAddNewClient}
            />
        }
        if (this.state.dialogToggle === true && this.state.editClientFlag === true) {
            return <EditClientDialog
                handleClientUpdate = {this.handleClientUpdate}
                dialogToggle={this.state.dialogToggle}
                EditClientDialogClose={this.EditClientDialogClose}
                client={this.state.editClient}
            />
        }
    }
    getSingleItem(data) {
        return getSingleClient(data._id)
            .then(singleItem => this.setState({
                editClient: {
                    _id: singleItem[0]._id,
                    name: singleItem[0].name,
                    email: singleItem[0].email,
                    company: singleItem[0].company,
                    address: singleItem[0].address,
                    contactNumber: singleItem[0].contactNumber,
                }
            }))
    }
    handleAddNewBtnClick() {
        this.setState({ addClientFlag: true, dialogToggle: true, });
    }
    handleEditClientBtnClick() {
        this.setState({ editClientFlag: true, dialogToggle: true, });
    }
    AddNewClientDialogClose() {
        this.setState({ dialogToggle: false, addClientFlag: false })
    }
    EditClientDialogClose() {
        this.setState({ dialogToggle: false, editClientFlag: false })
    }
    deleteItem({ _id }) {
        deleteSingleClient(_id)
            .then(deletedItem => console.log(deletedItem))
            .then(() => getAllClients())
            .then(Items => this.setState({ Items: Items }));
    }
    handleAddNewClient(clientDetails) {
        let client = {};
        Object.keys(clientDetails).forEach(item => {
            client[item] = clientDetails[item].value;
        })
        return addNewClient(client)
            .then(() => getAllClients())
            .then((Items) => this.setState({ Items: Items }))
    }
    handleClientUpdate(updatedClient) {
        let client = {};
        Object.keys(updatedClient).forEach(item => {
            client[item] = updatedClient[item].value;
        })
        return updateClient(client)
            .then(() => getAllClients())
            .then((Items) => this.setState({ Items: Items }))
    }
    render() {
        return (
            <Box px={2}>
                <Actions handleAddNewBtnClick={this.handleAddNewBtnClick} />
                <Route exact path='/invoice/new' component={NewInvoice} />
                <ClientsTable
                    clients={this.state.Items}
                    handleEditClientBtnClick={this.handleEditClientBtnClick}
                    getSingleItem={this.getSingleItem}
                    deleteItem={this.deleteItem}
                />
                {this.getDialog()}
            </Box>
        )
    }
}

export default Clients