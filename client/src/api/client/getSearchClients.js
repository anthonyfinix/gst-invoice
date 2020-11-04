import axios from "../../util/axios";

const getSearchClients = async (query) => {
  let response = await axios.get(`/api/clients/search?q=${query}`);
  let data = response.data;
  return data;
};

export default getSearchClients;
