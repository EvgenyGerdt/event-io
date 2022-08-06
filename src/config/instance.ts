import axios from "axios";
import router from "@/router";
import type { AxiosInstance } from "axios";

const instance: AxiosInstance = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  timeout: 20000,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("id");

      router.push({ name: "Auth" });
    }
  }
);

instance.interceptors.request.use((request) => {
  if (request.url !== "/api/v1/login" && request.url !== "/api/v1/register") {
    request.headers = {
      Authorization: localStorage.getItem("token") as string,
    };
  }

  return request;
});

export default instance;
