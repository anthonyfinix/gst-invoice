import axios from "../util/axios";

const logoutUser = async () => {
  let response = await axios.get(`/logout`);
  let data = response.data;
  return data;
};

export default logoutUser;
