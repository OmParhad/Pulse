import axios from "axios";

export const api = axios.create({
  baseURL: "https://pulse-r807.onrender.com/api,
  timeout: 10000,
});
