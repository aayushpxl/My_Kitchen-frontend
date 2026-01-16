import api from "./api";

export const registerUser = (data) =>
  api.post("/auth/register", data);

export const loginUser = (data) =>
  api.post("/auth/login", data);

export const getMe = () => api.get("/auth/me");

export const updateProfile = (formData) =>
  api.put("/auth/profile", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const deactivateAccount = () => api.put("/users/deactivate");