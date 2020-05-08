import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import './productInputRows.css';

export default function ProductInputRows(props) {

    const [rows, setRows] = useState([{ name: '', quantity: "", price: '', tax: '', discount: '', total: '' }]);
    const [total, setTotal] = useState(0);

    const handleInputChange = (e, i) => {
        let elemName = e.currentTarget.getAttribute('name');
        let elemValue = e.currentTarget.value;
        setRows(getUpdatedValues(elemName, elemValue, i));
        setTotal(getTotal());
        props.setProducts({ products: getUpdatedValues(elemName, elemValue, i), total: getTotal() })
    }
    const getTotal = () => {
        let total = 0;
        rows.forEach(row => {
            total = total + (checkNum(row.total) ? parseFloat(row.total) : 0)
        })
        return total;
    }
    const getUpdatedValues = (elName, elVal, i) => {
        return rows.map((row, index) => {
            if (index === i) {
                row[elName] = elVal;
                if (checkNum(row.price)) {
                    row.total = (checkNum(row.quantity) ? parseFloat(row.quantity) : 1) * ((checkNum(row.tax) ? parseFloat(row.price) * parseFloat(row.tax) / 100 : 0) + parseFloat(row.price)) / (checkNum(row.discount) ? parseFloat(row.discount) : 1)
                } else {
                    row.price = '';
                    row.total = '';
                }
            }
            return row;
        })
    }
    const checkNum = (val) => {
<<<<<<< HEAD
        return parseInt(val) !== NaN && parseInt(val) > 0 ? true : false;
=======
        if (!isNaN(parseInt(val)) && parseInt(val) > 0) {
            return true;
        } else {
            return false
        }
>>>>>>> dueDate
    }
    const handleAddRow = () => {
        setRows(() => [...rows, { name: '', quantity: '', price: '', tax: '', discount: '', total: '' }])
    }
    const handleRemoveRow = (rowIndex) => {
        let updatedRow = [];
        rows.forEach((row, i) => {
            if (i !== rowIndex) {
                updatedRow.push(row)
            }
        })
        setRows(updatedRow)
    }
    const getRows = () => {
        let fields = rows.map((row, i) => {
            return (
                <tr key={i}>
                    <td>{i + 1}</td>
                    <td className="p-0"><input autoComplete="off" value={row.name} name="name" onChange={(e) => { handleInputChange(e, i) }} type="text" /></td>
                    <td className="p-0"><input autoComplete="off" type="number" value={row.quantity} name="quantity" onChange={(e) => { handleInputChange(e, i) }} /></td>
                    <td className="p-0"><input autoComplete="off" type="number" value={row.price} name="price" onChange={(e) => { handleInputChange(e, i) }} /></td>
                    <td className="p-0"><input autoComplete="off" type="number" value={row.tax} name="tax" onChange={(e) => { handleInputChange(e, i) }} /></td>
                    <td className="p-0"><input autoComplete="off" type="number" value={row.discount} name="discount" onChange={(e) => { handleInputChange(e, i) }} /></td>
                    <td className="p-0"><input autoComplete="off" disabled={true} type="number" value={row.total} name="total" onChange={(e) => { handleInputChange(e, i) }} /></td>
                    <td className="p-0">
                        <IconButton onClick={() => handleRemoveRow(i)}>
                            <DeleteIcon />
                        </IconButton>
                    </td>
                </tr>
            )
        })
        return fields;
    }
    return (
        <Box className="py-3">
            <table className="product-table">
                <thead>
                    <tr>
                        <td>#</td>
                        <td>Product</td>
                        <td>Quantity</td>
                        <td>Price</td>
                        <td>Tax</td>
                        <td>Discount</td>
                        <td colSpan="2">Total</td>
                    </tr>
                </thead>
                <tbody>
                    {getRows()}
                    <tr className="total">
                        <th colSpan="6">Total</th>
                        <th colSpan="2">{total}</th>
                    </tr>
                </tbody>
            </table>
            <Box display="flex" justifyContent="flex-end">
                <Button size="small" onClick={handleAddRow} variant="contained" className="mt-2" color="primary">Add New</Button>
            </Box>
        </Box>

    )
}