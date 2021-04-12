import axios from "axios";
import { BASE_URL } from "./config";

let instance = {
  baseURL: BASE_URL,
  timeout: 5000,
};

const axiosInstance = axios.create(instance);

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    // console.log(error.response.data);
    // @TODO: Hanle expire token here
    return Promise.reject(error);
  }
);

export const axiosAuth = (accessToken) => {
  axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

  return axiosInstance;
};

export default axiosInstance;
