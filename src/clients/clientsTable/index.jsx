import React, { Component } from 'react';
import {
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Paper,
    IconButton,
    Menu,
    MenuItem,
    MoreVertIcon
} from '../../utils/mui';


export default class ClientsTable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedElement:null,
            selectedRow: null,
        }
        this.getMenu = this.getMenu.bind(this)
        this.getColumns = this.getColumns.bind(this)
        this.getRows = this.getRows.bind(this)
        this.handleOptionClick = this.handleOptionClick.bind(this)
        this.handleMenuClose = this.handleMenuClose.bind(this)
        this.handleEditClient = this.handleEditClient.bind(this)
        this.handleDeleteClient = this.handleDeleteClient.bind(this)
    }
    handleOptionClick(i,row,e){
        this.setState({
            selectedElement: e.currentTarget,
            selectedRow: row
        })
    }
    handleMenuClose(){
        this.setState({selectedElement: null});
    }
    handleEditClient(client){
        this.props.getSingleItem(client);
        this.handleMenuClose();
    }
    handleDeleteClient(client){
        this.props.deleteItem(client);
        this.handleMenuClose();
    }
    getMenu() {
        return (
            <Menu open={Boolean(this.state.selectedElement)} onClose={this.handleMenuClose} anchorEl={this.state.selectedElement} >
                <MenuItem>Give Invoice</MenuItem>
                <MenuItem onClick={()=>{this.handleEditClient(this.state.selectedRow)}}>Edit</MenuItem>
                <MenuItem onClick={()=>{this.handleDeleteClient(this.state.selectedRow)}}>Delete</MenuItem>
            </Menu>

        )
    }
    render() {
        return (
            <React.Fragment>
                <TableContainer component={Paper} elevation={0}>
                    <Table aria-label="simple table">
                        <TableHead>
                            {this.getColumns()}
                        </TableHead>
                        <TableBody>
                            {this.getRows(this.props, this.handleOptionClick)}
                        </TableBody>
                    </Table>
                </TableContainer>
                {this.getMenu(this.state.selectedElement)}
            </React.Fragment>
        )
    }
    getColumns() {
        return (
            <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Company</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Contact Number</TableCell>
                <TableCell></TableCell>
            </TableRow>
        )

    }
    getRows(props,handleOptionClick) {
        let TableRows = props.clients.map((row, i) => {
            return (
                <TableRow key={row.name}>
                    <TableCell component="th" scope="row">
                        {row.name}
                    </TableCell>
                    <TableCell>{row.company}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{row.contactNumber}</TableCell>
                    <TableCell align="right">
                        <IconButton onClick={handleOptionClick.bind(this, i, row)} size="small">
                            <MoreVertIcon fontSize="inherit" />
                        </IconButton>
                    </TableCell>
                </TableRow>
            )
        })
        return TableRows;
    }
}

