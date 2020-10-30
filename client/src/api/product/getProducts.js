import axios from "../../util/axios";

const getAllProducts = async (user) => {
  let response = await axios.get(`/api/products`, user);
  let data = response.data;
  return data;
};

export default getAllProducts;
