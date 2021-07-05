import axios from "../../../../util/axios";

const addProduct = async ({name,price}) => {
  let response = await axios.post(`/api/products`, {name,price});
  let data = response.data;
  return data;
};

export default addProduct;
