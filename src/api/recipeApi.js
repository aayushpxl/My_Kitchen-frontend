import api from "./api";

export const getAllRecipes = () => api.get("/recipes");
export const getRecipeById = (id) => api.get(`/recipes/${id}`);
export const createRecipe = (data) => api.post("/recipes", data);
export const toggleSaveRecipe = (id) => api.post(`/recipes/${id}/save`);
