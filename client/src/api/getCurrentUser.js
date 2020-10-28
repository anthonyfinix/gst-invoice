import axios from "../util/axios";

const loginUser = async () => {
  let response = await axios.get(`/login`);
  return response.data;
};

export default loginUser;
