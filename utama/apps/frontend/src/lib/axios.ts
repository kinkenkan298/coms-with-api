import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.APP_API_URL!,
  headers: {
    "Content-Type": "application/json",
  },
});
