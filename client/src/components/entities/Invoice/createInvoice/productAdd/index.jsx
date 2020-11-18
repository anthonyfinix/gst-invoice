import React from "react";
import TexField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Popper from '@material-ui/core/Popper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import getSearchProducts from '../../../Product/api/getSearchProducts';
import ProductList from './productList';

function ProductAdd({
  addProduct
}) {
  const [searchedProducts, setSearchedProducts] = React.useState([])
  const [name, setName] = React.useState('');
  const handleNameChange = (e) => setName(e.target.value);
  const [quantity, setQuantity] = React.useState('');
  const handleQuantityChange = (e) => setQuantity(e.target.value);
  const [price, setPrice] = React.useState('');
  const handlePriceChange = (e) => setPrice(e.target.value);
  

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    getSearchProducts(event.target.value)
      .then(response => setSearchedProducts(response))
  };
  const handleSearchedItemClick = (product) => {
    addProduct(product)
    handleClose()
  }
  const handleAddProductClick = ()=>{
    if ((name !== '') || (quantity !== '') || (price !== '')) {
      addProduct({name:name,qty:quantity,price:price})
    }
    setName('')
    setQuantity('')
    setPrice('')
  }
  return (
    <React.Fragment>
      <Box display="flex" alignItems="center" p={2}>
        <TexField
          size="small"
          style={{ marginRight: 15 }}
          value={name}
          onChange={handleNameChange}
          onKeyUp={handleClick}
          label="Add Product"
          variant="outlined"
        />
        <TexField
          size="small"
          style={{ marginRight: 15 }}
          value={quantity}
          onChange={handleQuantityChange}
          type="number"
          label="Qty"
          variant="outlined"
        />
        <TexField
          size="small"
          style={{ marginRight: 15 }}
          value={price}
          onChange={handlePriceChange}
          type="number"
          label="Price"
          variant="outlined"
        />
        <Button
          style={{ marginLeft: "auto" }}
          variant="contained"
          onClick={handleAddProductClick}
          color="primary"
        >
          Add
      </Button>
      </Box>
      <ClickAwayListener onClickAway={handleClose}>
        <Popper placement="bottom-start" open={!!anchorEl} anchorEl={anchorEl} transition>
          {({ TransitionProps }) => <ProductList setProduct={handleSearchedItemClick} searchedProducts={searchedProducts} transition={TransitionProps} />}
        </Popper>
      </ClickAwayListener>
    </React.Fragment>
  );
}

export default ProductAdd;
