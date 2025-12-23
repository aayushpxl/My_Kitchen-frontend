import api from "./api";

export const fetchMyMealPlansApi = () => api.get("/meal-plans");

export const saveMealPlanApi = (mealData) => api.post("/meal-plans", mealData);

export const deleteMealPlanApi = (id) => api.delete(`/meal-plans/${id}`);