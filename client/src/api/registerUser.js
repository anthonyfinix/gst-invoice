import axios from 'axios';

const registerUser = async (user) => {
    let domain = process.env.REACT_APP_API_DOMAIN || 'http://locahost:3500'
    let response = await axios.post(`${domain}/register`,user,{withCredentials:true});
    let data = response.data
    return data;
};

export default registerUser;
