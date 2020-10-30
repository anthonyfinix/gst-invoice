import axios from "../../util/axios";

const getAllClients = async ({name}) => {
  let response = await axios.post(`/api/clients`, {name});
  let data = response.data;
  return data;
};

export default getAllClients;
