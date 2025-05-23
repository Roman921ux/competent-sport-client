import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  // baseURL: "https://titan-forge-platform-server-7ef8.twc1.net/",
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
// становая - 80 кг/30
// жим штанги - 70/30
