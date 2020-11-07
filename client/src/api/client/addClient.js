import axios from "../../util/axios";

const getAllClients = async ({name,email}) => {
  let response = await axios.post(`/api/clients`, {name,email});
  let data = response.data;
  return data;
};

export default getAllClients;
