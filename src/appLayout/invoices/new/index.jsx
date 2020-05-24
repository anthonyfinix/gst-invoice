import React, { Component } from 'react';
import Actions from './actions';
import ClientDetails from './clientDetails';
import InvoiceSummery from './invoiceSummery';
import ProductInputRows from './productInputRows';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { addNewInvoice } from '../../../api'
import { Redirect } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

export default class NewInvoice extends Component {
    constructor(props) {
        super(props)
        this.state = {
            client: { name: '', _id: 2, company: '', address: '', contactNumber: '' },
            redirect: false,
            products: [],
            total: 0,
            invoiceNo: '',
            created: new Date(),
            dueDate: new Date().setMonth(new Date().getMonth() + 1),
            status: 4,
            invoiceState: { state: false, error: '' }
        }
        this.addInvoice = this.addInvoice.bind(this);
        this.setProducts = this.setProducts.bind(this);
        this.setInvoiceNo = this.setInvoiceNo.bind(this);
        this.setClient = this.setClient.bind(this);
        this.saveInvoice = this.saveInvoice.bind(this);
        this.getSelectedClient = this.getSelectedClient.bind(this);
        this.handleDueDate = this.handleDueDate.bind(this);
        this.handleCreationDate = this.handleCreationDate.bind(this);
    }
    componentDidMount() {
        this.setInvoiceNo();
        this.setClient();
    }
    getSelectedClient(client) {
        this.setState({ client: client, invoiceState: { state: true,error:'' } })
    }
    saveInvoice() {
        let data = {
            invoiceNo: this.state.invoiceNo,
            client: this.state.client,
            created: this.state.created,
            dueDate: this.state.dueDate,
            products: this.state.products,
            draft: this.state.draft,
            total: this.state.total,
            status: this.state.status
        }
        addNewInvoice(data)
            .then((newItem) => { console.log(newItem) })
            .then(() => this.setState({ redirect: !this.state.redirect }));
    }
    setClient() {
        if (this.props.match.params.id !== undefined) {
            this.setState({ client: { name: this.props.match.params.id, id: this.state.client.id } })
        }
    }
    handleCreationDate(date) {
        this.setState({ created: new Date(date) });
        // console.log(date)
    }
    handleDueDate(date) {
        this.setState({ dueDate: new Date(date) });
        // console.log(date)
    }
    setProducts(data) {
        this.setState({ products: data.products, total: data.total });
    }
    addInvoice(data) {
        addNewInvoice(data).then(() => { this.setState({ redirect: !this.state.redirect }) });
    }
    setInvoiceNo() {
        this.setState({ invoiceNo: uuidv4(6) });
    }
    render() {
        if (this.state.redirect) {
            return <Redirect to="/invoices" />
        } else {
            return (
                <Box px={2}>
                    <Actions
                        saveInvoice={this.saveInvoice}
                        invoiceState={this.state.invoiceState}
                    />
                    <Box mt={1} display="flex" justifyContent="space-between">
                        <ClientDetails getSelectedClient={this.getSelectedClient} client={this.state.client} />
                        <InvoiceSummery
                            created={this.state.created}
                            dueDate={this.state.dueDate}
                            handleCreationDate={this.handleCreationDate}
                            handleDueDate={this.handleDueDate}
                            invoiceNo={this.state.invoiceNo} />
                    </Box>
                    <Box className="mt-3" >
                        <Typography variant="h6">Products</Typography>
                        <ProductInputRows setProducts={this.setProducts} />
                    </Box>
                </Box>
            )
        }
    }
}