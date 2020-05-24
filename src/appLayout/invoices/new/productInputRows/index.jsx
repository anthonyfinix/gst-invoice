import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import './productInputRows.css';
import ProductSearch from '../../../../utils/productSearch';
import { getAllProducts, partialSearchProducttName } from '../../../../api'

export default function ProductInputRows(props) {

    const [rows, setRows] = useState([{ name: '', quantity: "", price: '', tax: '', discount: '', total: '' }]);
    const [total, setTotal] = useState(0);
    const [productSearchElm, setProductSearchElm] = useState(null)
    const [searchedProductsResult, setSearchedProductsResult] = useState([{ name: 'GTX' }, { name: 'GTX2' }]);


    const handleInputChange = (e, i) => {
        let el = e.currentTarget;
        setRows(getUpdatedValues(el.getAttribute('name'), el.value, i));
        setTotal(getTotal());
        props.setProducts({ products: getUpdatedValues(el.getAttribute('name'), el.value, i), total: getTotal() })
        if (el.getAttribute('name') === 'name') {
            setProductSearchElm(el);
            getSearchResult(el.value).then(products => {
                setSearchedProductsResult(products)
            })
        }
    }
    const getSearchResult = (value) => {
        if (/[^A-Za-z0-9]/.test(value) || value === '') {
            return getAllProducts()
        } else {
            return partialSearchProducttName(value)
        }
    }
    const getUpdatedValues = (elName, elVal, i) => {
        return rows.map((row, index) => {
            if (index === i) {
                row[elName] = elVal;
                row.total = calculateDiscount((getNumber(row.price) + getTax(getNumber(row.price), getNumber(row.tax))) * (row.quantity === '' ? 1 : parseInt(row.quantity)), getNumber(row.discount));
            }
            return row;
        })
    }
    const getTotal = () => {
        let total = 0;
        rows.forEach(row => {
            total = total + getNumber(row.total)
        })
        return total;
    }
    const calculateDiscount = (totalPrice, discountRate) => {
        return totalPrice - (totalPrice * discountRate / 100)
    }
    const getTax = (price, taxRate) => {
        return parseFloat(taxRate / 100 * price)
    }
    const getNumber = (val) => {
        if (isNaN(val) || val === '') return 0;
        return parseFloat(val)
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
                    <td className="p-0"><input autoComplete="off" value={row.name} name="name" data-index={i} onChange={(e) => { handleInputChange(e, i) }} type="text" /></td>
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
    const handleSearchProductSelect = (product) => {
        let newRow = [];
        rows.forEach((row, index) => {
            if (index === parseInt(productSearchElm.getAttribute('data-index'))) {
                newRow.push({ name: product.name, quantity: 1, price: product.price, tax: product.taxRate, discount: '', total: product.price })
            } else {
                newRow.push(row)
            }
        });
        console.log(newRow)
        setRows(newRow);
        setTotal(() => {
            let total = 0;
            newRow.forEach(row => {
                total = total + parseInt(row.total);
            })
            return total;
        })

        console.log(productSearchElm.getAttribute('data-index'))
        closeProductSearchDialog();
    }
    const closeProductSearchDialog = () => {
        setProductSearchElm(null)
    }
    const getProductSearchDialog = () => {
        if (productSearchElm) {
            return <ProductSearch
                handleSearchProductSelect={handleSearchProductSelect}
                closeProductSearchDialog={closeProductSearchDialog}
                productSearchElm={productSearchElm}
                products={searchedProductsResult} />
        }
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
                {getProductSearchDialog()}
            </Box>
        </Box>

    )
}