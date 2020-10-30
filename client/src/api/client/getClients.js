import axios from "../../util/axios";

const getClients = async (user) => {
  let response = await axios.get(`/api/clients`, user);
  let data = response.data;
  return data;
};

export default getClients;
