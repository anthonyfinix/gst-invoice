import axios from "axios";

const logoutUser = async (user) => {
  let domain = process.env.REACT_APP_API_DOMAIN || 'http://locahost:3500'
  let response = await axios.get(`${domain}/logout`, {
    withCredentials: true,
  });
  let data = response.data;
  return data;
};

export default logoutUser;
