import axios from "axios";

const baseURL = process.env.REACT_APP_API_DOMAIN || "http://localhost:3500";

const axiosInstance = new axios.create({
  baseURL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(request => {
  let accessToken = localStorage.getItem("x-token");
  if(accessToken) request.headers['x-token'] = accessToken;
  console.log('request header')
  console.log(request)
  return request;
});

axiosInstance.interceptors.response.use((response) => {
  if(response.headers["x-token"]) localStorage.setItem("x-token", response.headers["x-token"]);
  console.log('response header')
  console.log(response)
  return response
});

export default axiosInstance;
