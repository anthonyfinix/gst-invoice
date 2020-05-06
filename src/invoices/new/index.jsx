import React, { Component } from 'react';
import Actions from './actions';
import ClientDetails from './clientDetails';
import InvoiceSummery from './invoiceSummery';
import ProductInputRows from './productInputRows';
import { Box, Container, Typography } from '../../utils/mui';
import { addNewInvoice } from '../../api'
import { Redirect } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

export default class NewInvoice extends Component {
    constructor(props) {
        super(props)
        this.state = {
            client: { name: 'Client Not Selected', _id: 2,company: 'Company not selected', address :'Address not available', contactNumber:'Contacts not available' },
            redirect: false,
            products: [],
            total: 0,
            invoiceNo: '',
            created: '',
            dueDate: '',
            status: 2,
        }
        this.addInvoice = this.addInvoice.bind(this);
        this.setProducts = this.setProducts.bind(this);
        this.setInvoiceNo = this.setInvoiceNo.bind(this);
        this.setInvoiceCreatedDate = this.setInvoiceCreatedDate.bind(this);
        this.getTodayDate = this.getTodayDate.bind(this);
        this.setClient = this.setClient.bind(this);
        this.saveInvoice = this.saveInvoice.bind(this);
        this.getSelectedClient = this.getSelectedClient.bind(this);
    }
    getSelectedClient(client){
        this.setState({client: client})
    }
    saveInvoice() {
        let data = {
            invoiceNo: this.state.invoiceNo,
            client: this.state.client,
            created: this.state.created,
            products: this.state.products,
            draft: this.state.draft,
            total: this.state.total,
            status: this.state.status
        }
        addNewInvoice(data)
        .then((newItem)=>{console.log(newItem)})
        .then(() => this.setState({ redirect: !this.state.redirect }) );
    }
    setClient() {
        if (this.props.match.params.id !== undefined) {
            this.setState({ client: { name: this.props.match.params.id,id: this.state.client.id } })
        }
    }
    componentDidMount() {
        this.setInvoiceNo();
        this.setInvoiceCreatedDate();
        this.setClient();
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
    setInvoiceCreatedDate() {
        this.setState({ created: this.getTodayDate() });
    }
    getTodayDate() {
        let dd = new Date().getDate();
        let mm = new Date().getMonth();
        let yyyy = new Date().getFullYear();
        let today = `${dd}/${mm}/${yyyy}`
        return today
    }
    render() {
        if (this.state.redirect) {
            return <Redirect to="/invoices" />
        } else {
            return (
                <Container className="py-2">
                    <Actions saveInvoice={this.saveInvoice} />
                    <Box className="mt-5" display="flex" justifyContent="space-between">
                        <ClientDetails getSelectedClient={this.getSelectedClient} client={this.state.client} />
                        <InvoiceSummery invoiceNo={this.state.invoiceNo} created={this.state.created} />
                    </Box>
                    <Box className="mt-3" >
                        <Typography variant="h6">Products</Typography>
                        <ProductInputRows setProducts={this.setProducts} />
                    </Box>
                </Container>
            )
        }
    }
}