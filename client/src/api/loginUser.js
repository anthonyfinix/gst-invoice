import axios from '../util/axios';

const loginUser = async (user) => {
    let response = await axios.post(`/login`,user);
    let data = response.data
    return data;
};

export default loginUser;
