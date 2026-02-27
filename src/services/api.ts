import axios from "axios";

const api = axios.create({
  baseURL: "/api", // placeholder
  headers: {
    "Content-Type": "application/json",
  },
});

// interceptor to add token when available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
