import axios from "../../util/axios";

const getAllProducts = async () => {
  let response = await axios.get(`/api/products`);
  let data = response.data;
  return data;
};

export default getAllProducts;
