import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, 
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export const fetchChallengesApi = () => API.get("/challenges");
export const joinChallengeApi = (challengeId) =>
  API.post(`/challenges/${challengeId}/join`);
export const fetchMyChallengesApi = () => API.get("/challenges/my");
