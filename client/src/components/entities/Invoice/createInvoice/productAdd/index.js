import React from "react";
import TexField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

function ProductAdd({
  productName,
  handleProductChangeName,
  productQty,
  handleProductQtyChange,
  productPrice,
  handleProductPriceChange,
  addProduct,
}) {
  return (
    <Box display="flex" alignItems="center" p={2}>
      <TexField
        size="small"
        style={{ marginRight: 15 }}
        value={productName}
        onChange={handleProductChangeName}
        label="Add Product"
        variant="outlined"
      />
      <TexField
        size="small"
        style={{ marginRight: 15 }}
        value={productQty}
        onChange={handleProductQtyChange}
        type="number"
        label="Qty"
        variant="outlined"
      />
      <TexField
        size="small"
        style={{ marginRight: 15 }}
        value={productPrice}
        onChange={handleProductPriceChange}
        type="number"
        label="Price"
        variant="outlined"
      />
      <Button
        style={{ marginLeft: "auto" }}
        variant="contained"
        onClick={addProduct}
        color="primary"
      >
        Add
      </Button>
    </Box>
  );
}

export default ProductAdd;
