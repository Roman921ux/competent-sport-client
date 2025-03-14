import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "http://localhost:3000",
  baseURL: "https://titan-forge-platform-server-7ef8.twc1.net/",
});

axiosInstance.interceptors.request.use((config) => {
  let token = window.localStorage.getItem("token");
  if (token && token.startsWith('"') && token.endsWith('"')) {
    token = token.slice(1, -1);
  }
  // console.log("token", token);
  config.headers.Authorization = token;
  return config;
});

export default axiosInstance;
// 80/30
// 70/30
