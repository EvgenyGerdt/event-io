import axios from "axios";
import type { AxiosInstance } from "axios";

const instance: AxiosInstance = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  timeout: 20000,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

export default instance;
