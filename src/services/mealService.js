
import {
  fetchMyMealPlansApi,
  saveMealPlanApi,
  deleteMealPlanApi,
} from "../api/mealplanApi";

export const getMyMealPlans = async () => {
  const res = await fetchMyMealPlansApi();
  return res.data;
};

export const saveMealPlan = async (mealData) => {
  const res = await saveMealPlanApi(mealData);
  return res.data;
};

export const removeMealPlan = async (id) => {
  const res = await deleteMealPlanApi(id);
  return res.data;
};