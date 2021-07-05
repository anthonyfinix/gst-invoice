import React from 'react';
import Delete from '@material-ui/icons/Delete';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';

export default ({row,columns,handleDelete,openOptionsMenu}) => {
    return (
        <TableRow>
            {columns.map(column => <TableCell key={row[column]} component="th" scope="row">{row[column]}</TableCell>)}
            <TableCell component="th" align="right" scope="row">
                <IconButton size="small" onClick={() => handleDelete(row._id)}><Delete /></IconButton>
            </TableCell>
            <TableCell component="th" align="right" scope="row">
                <IconButton size="small" onClick={(e) => openOptionsMenu(e,row)}><MoreVertIcon /></IconButton>
            </TableCell>
        </TableRow>
    )
}