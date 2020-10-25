import axios from 'axios';

const loginUser = async (user) => {
  let domain = process.env.REACT_APP_API_DOMAIN || 'http://locahost:3500'
    let response = await axios.post(`${domain}/login`,user,{withCredentials:true});
    let data = response.data
    return data;
};

export default loginUser;
