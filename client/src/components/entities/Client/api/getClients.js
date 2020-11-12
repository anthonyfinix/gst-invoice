import axios from "../../../../util/axios";

const getClients = async () => {
  let response = await axios.get(`/api/clients`);
  let data = response.data;
  return data;
};

export default getClients;
