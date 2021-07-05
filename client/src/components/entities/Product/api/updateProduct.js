import axios from "../../../../util/axios";

export default async (product) => {
  let response = await axios.put(`/api/products`, product);
  let data = response.data;
  return data;
};
