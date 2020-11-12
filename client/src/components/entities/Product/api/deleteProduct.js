import axios from "../../../../util/axios";

const deleteProduct = async (id) => {
  let response = await axios.delete(`/api/products?id=${id}`);
  let data = response.data;
  return data;
};

export default deleteProduct;
