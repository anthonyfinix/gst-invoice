import axios from "axios";

const baseURL = process.env.REACT_APP_API_DOMAIN || "http://localhost:3500";

let headers = {};
let accessToken = localStorage.getItem("x-token");
if (accessToken) headers["x-token"] = accessToken;

const axiosInstance = new axios.create({
  baseURL,
  headers,
  withCredentials: true,
});

axiosInstance.interceptors.response.use((response) => {
  if(response.headers["x-token"]) localStorage.setItem("x-token", response.headers["x-token"]);
  return response
});

export default axiosInstance;
