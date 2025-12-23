import { useState } from "react";
import { saveMealPlan } from "../../api/mealplanApi";

export const useMealPlan = () => {
  const [loading, setLoading] = useState(false);

  const addMeal = async (mealData) => {
    try {
      setLoading(true);
      const data = await saveMealPlan(mealData);
      return { success: true, data };
    } catch (error) {
      console.error("Meal Plan Error:", error);
      return { success: false, message: error.response?.data?.message || "Error saving meal" };
    } finally {
      setLoading(false);
    }
  };

  return { addMeal, loading };
};