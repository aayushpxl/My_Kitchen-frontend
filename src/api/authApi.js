import api from "./api";

export const registerUserApi = (data) =>
  api.post("/auth/register", data);

export const loginUserApi = (data) =>
  api.post("/auth/login", data);
