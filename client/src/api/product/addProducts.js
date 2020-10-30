import axios from "../../util/axios";

const addProduct = async ({name}) => {
  let response = await axios.post(`/api/products`, {name});
  let data = response.data;
  return data;
};

export default addProduct;
