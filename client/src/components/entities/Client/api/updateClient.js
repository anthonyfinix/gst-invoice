import axios from "../../../../util/axios";

export default async (client) => {
  let response = await axios.put(`/api/clients`, client);
  let data = response.data;
  return data;
};
