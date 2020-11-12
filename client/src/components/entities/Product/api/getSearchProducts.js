import axios from "../../../../util/axios";

const getSearchProducts = async (query) => {
  let response = await axios.get(`/api/products/search?q=${query}`);
  let data = response.data;
  return data;
};

export default getSearchProducts;
