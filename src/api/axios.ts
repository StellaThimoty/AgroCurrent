import axios from "axios";

// Create an Axios instance with default options
const axiosInstance = axios.create({
  baseURL: "http://localhost:3001",
  withCredentials: true,
});

export default axiosInstance;