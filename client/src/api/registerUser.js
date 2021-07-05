import axios from '../util/axios';

const registerUser = async (user) => {
    let response = await axios.post(`/register`,user);
    let data = response.data
    return data;
};

export default registerUser;
