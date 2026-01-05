import axios from "axios";

const apiBaseUrl = "https://localhost:7187/api/v1";

export const http = axios.create({
  baseURL: apiBaseUrl,
});

export function setAuthToken(token) {
  http.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}
