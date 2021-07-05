import axios from "../../../../util/axios";

const deleteClient = async (id) => {
  let response = await axios.delete(`/api/clients?id=${id}`);
  let data = response.data;
  return data;
};

export default deleteClient;
