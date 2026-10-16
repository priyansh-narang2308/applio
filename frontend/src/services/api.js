import axios from "axios";

const rawBaseURL =
  import.meta.env.VITE_API_BASE_URL ||
  import.meta.env.VITE_API_URL ||
  "http://localhost:5001/api";

const cleanBaseURL = rawBaseURL.replace(/\/+$/, "");
const baseURL = cleanBaseURL.endsWith("/api")
  ? cleanBaseURL
  : `${cleanBaseURL}/api`;

const API = axios.create({
  baseURL,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("applio_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getApplications = (params) => API.get("/applications", { params });
export const getApplicationById = (id) => API.get(`/applications/${id}`);
export const createApplication = (data) => API.post("/applications", data);
export const updateApplication = (id, data) =>
  API.put(`/applications/${id}`, data);
export const updateApplicationStatus = (id, statusData) =>
  API.patch(`/applications/${id}/status`, statusData);
export const deleteApplication = (id) => API.delete(`/applications/${id}`);
export const getApplicationStats = () => API.get("/applications/stats");

export const registerUser = (userData) => API.post("/auth/register", userData);
export const loginUser = (credentials) => API.post("/auth/login", credentials);
export const getMe = () => API.get("/auth/me");

export default API;
