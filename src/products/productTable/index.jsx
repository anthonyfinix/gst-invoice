import React from 'react';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';

export default (props) => {
    const getColumns = () => {
        return (
            <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Description</TableCell>
            </TableRow>
        )
    }
    const getRows = () => {
        <TableRow key={row.name}>
            <TableCell component="th" scope="row">
                {row.name}
            </TableCell>
            <TableCell>{row.company}</TableCell>
            <TableCell>{row.email}</TableCell>
            <TableCell>{row.contactNumber}</TableCell>
            <TableCell align="right">
                <IconButton size="small">
                    <MoreVertIcon fontSize="inherit" />
                </IconButton>
            </TableCell>
        </TableRow>
    }
    return (
        <React.Fragment>
            <TableContainer component={Paper} elevation={0}>
                <Table aria-label="simple table">
                    <TableHead>
                        {this.getColumns()}
                    </TableHead>
                    <TableBody>
                        {this.getRows(props, handleOptionClick)}
                    </TableBody>
                </Table>
            </TableContainer>
            {this.getMenu(this.state.selectedElement)}
        </React.Fragment>
    )
}