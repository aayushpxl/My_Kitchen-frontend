import React, { useState, useEffect } from "react";
import Navbar from "../components/common/Navbar";
import DaySelector from "../components/MealPlanner/DaySelector";
import MealTypeSelect from "../components/MealPlanner/MealTypeSelect";
import MealItem from "../components/MealPlanner/MealItem";
import RecipeSearchModal from "../components/MealPlanner/RecipeSearchModal"; 
import { getMyMealPlans, saveMealPlan, removeMealPlan } from "../services/mealService";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const MEAL_TYPES = ["breakfast", "lunch", "dinner", "snack"];

export default function MealPlanner() {
  const [activeDay, setActiveDay] = useState("Monday");
  const [mealType, setMealType] = useState("breakfast");
  const [allMeals, setAllMeals] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch meals on load
  const fetchMeals = async () => {
    try {
      setLoading(true);
      const data = await getMyMealPlans(); // Using the named export directly
      setAllMeals(data);
    } catch (err) {
      console.error("Failed to fetch meals", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeals();
  }, []);

  // Logic: Filter meals for the currently selected slot
  const currentMeals = allMeals.filter(
    (m) => m.dayOfWeek === activeDay && m.mealType === mealType
  );

  const handleSelectRecipe = async (recipeId) => {
    try {
      const planData = {
        dayOfWeek: activeDay,
        mealType: mealType,
        recipeId: recipeId,
      };
      await saveMealPlan(planData);
      setIsModalOpen(false);
      fetchMeals(); // Refresh the list
    } catch (err) {
      alert("Error saving meal plan");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to remove this meal?")) return;
    try {
      await removeMealPlan(id);
      setAllMeals(allMeals.filter((m) => m._id !== id));
    } catch (err) {
      alert("Error deleting meal");
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 pt-28 pb-12">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Meal Planner</h1>
          <p className="text-gray-500">Plan your meals for the week and stay healthy.</p>
        </header>

        <div className="flex flex-col lg:flex-row gap-12">
          <div className="flex-1">
            <DaySelector days={DAYS} activeDay={activeDay} onSelect={setActiveDay} />
            <MealTypeSelect types={MEAL_TYPES} activeType={mealType} onSelect={setMealType} />

            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-gray-800 capitalize">
                {activeDay} - {mealType}
              </h2>
            </div>

            <div className="space-y-4">
              {loading ? (
                <p className="text-center py-10 text-gray-400">Loading your meals...</p>
              ) : currentMeals.length > 0 ? (
                currentMeals.map((meal) => (
                  <MealItem 
                    key={meal._id} 
                    meal={meal} 
                    onDelete={() => handleDelete(meal._id)} 
                  />
                ))
              ) : (
                <EmptyState onAdd={() => setIsModalOpen(true)} />
              )}
            </div>
          </div>

          <aside className="w-full lg:w-[380px]">
             <div className="bg-[#EBF3FF] rounded-3xl p-6">
                <h4 className="font-bold text-[#2563EB]">Planning Tip</h4>
                <p className="text-sm text-[#3B82F6]">Selection: {activeDay} {mealType}</p>
             </div>
          </aside>
        </div>
      </main>

      {/* Recipe Picker Modal */}
      <RecipeSearchModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSelect={handleSelectRecipe}
      />
    </div>
  );
}

function EmptyState({ onAdd }) {
  return (
    <div className="bg-white border border-gray-100 rounded-[32px] p-12 text-center shadow-sm">
      <h3 className="text-lg font-bold text-gray-900 mb-2">No meals for this slot</h3>
      <button 
        onClick={onAdd} 
        className="bg-[#00B488] text-white px-8 py-3 rounded-full font-bold hover:bg-[#009d76] transition-all"
      >
        Add Food
      </button>
    </div>
  );
}