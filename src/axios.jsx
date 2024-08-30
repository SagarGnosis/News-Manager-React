import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;
export const makeRequest = axios.create({
  baseURL: apiUrl+"/api/",
  withCredentials: true,
});
