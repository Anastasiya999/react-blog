import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

instance.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    config.headers.Authorization = window.localStorage.getItem("token");
    return config;
  },
  function (error) {
    // Do something with request error
    alert("Failure in authorization process");
    return Promise.reject(error);
  }
);

export default instance;
