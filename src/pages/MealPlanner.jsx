import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import DaySelector from "../components/MealPlanner/DaySelector";
import MealTypeSelect from "../components/MealPlanner/MealTypeSelect";
import MealItem from "../components/MealPlanner/MealItem";
import RecipeSearchModal from "../components/MealPlanner/RecipeSearchModal";
import WeeklyMealCard from "../components/MealPlanner/WeeklyMealCard";
import ScrollFade from "../components/ui/ScrollFade"; // Import your ScrollFade
import { getMyMealPlans, saveMealPlan, removeMealPlan } from "../services/mealService";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const MEAL_TYPES = ["breakfast", "lunch", "dinner", "snack"];

export default function MealPlanner() {
  const navigate = useNavigate();
  const [activeDay, setActiveDay] = useState("Monday");
  const [mealType, setMealType] = useState("breakfast");
  const [allMeals, setAllMeals] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchMeals = async () => {
    try {
      setLoading(true);
      const data = await getMyMealPlans();
      setAllMeals(data);
    } catch (err) {
      console.error("Failed to fetch meals", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchMeals(); }, []);

  const handleSelectRecipe = async (recipeId) => {
    try {
      await saveMealPlan({ dayOfWeek: activeDay, mealType: mealType, recipeId });
      setIsModalOpen(false);
      fetchMeals();
    } catch (err) {
      alert("Error saving meal plan");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Remove this meal?")) return;
    try {
      await removeMealPlan(id);
      setAllMeals(allMeals.filter((m) => m._id !== id));
    } catch (err) {
      alert("Error deleting meal");
    }
  };

  const currentDayMeals = allMeals.filter(
    (m) => m.dayOfWeek === activeDay && m.mealType === mealType
  );

  return (
    <div className="min-h-screen bg-[#FDFDFD] font-sans">
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 pt-30 pb-12">

        {/* TOP SECTION: Only visible when meals exist */}
        {allMeals.length > 0 && (
          <section className="mb-[1px]">
            <div className="flex items-center gap-6 overflow-x-auto pb-6 no-scrollbar">

              {/* The Title Header: Animates in with the list */}
              <div
                className="transition-all duration-700 ease-out"
                style={{ animation: `slideIn 0.6s ease-out both` }}
              >
                <WeeklyMealCard isHeader={true} />
              </div>

              {/* The Meal Cards: Staggered animation */}
              {allMeals.map((meal, index) => (
                <div
                  key={meal._id}
                  className="transition-all duration-500 ease-out"
                  style={{
                    animation: `slideIn 0.5s ease-out ${(index + 1) * 0.1}s both`
                  }}
                >
                  <WeeklyMealCard
                    meal={meal}
                    onDelete={handleDelete}
                    onEdit={() => {/* Edit Logic */ }}
                    onView={(id) => navigate(`/recipes/${id}`)}
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* BOTTOM SECTION: Animation Added */}
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="flex-1">
            <header className="mb-8">
              <h1 className="text-4xl font-black text-gray-900 mb-2">Meal Planner</h1>
              <p className="text-gray-500 font-medium">Plan your daily nutrition and organize your kitchen.</p>
            </header>

            <DaySelector days={DAYS} activeDay={activeDay} onSelect={setActiveDay} />
            <MealTypeSelect types={MEAL_TYPES} activeType={mealType} onSelect={setMealType} />

            <div className="text-center mb-8">
              <h3 className="text-xl font-bold text-gray-800 bg-gray-50 inline-block px-6 py-2 rounded-full">
                {activeDay} — <span className="capitalize text-orange-600">{mealType}</span>
              </h3>
            </div>

            <div className="space-y-4">
              {loading ? (
                <p className="text-center py-10 text-gray-400 animate-pulse">Loading meals...</p>
              ) : currentDayMeals.length > 0 ? (
                currentDayMeals.map((meal) => (
                  <MealItem key={meal._id} meal={meal} onDelete={() => handleDelete(meal._id)} />
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed border-gray-50 rounded-[2.5rem] bg-white group hover:border-orange-200 transition-all duration-300">
                  <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
                    <span className="text-2xl">🥧</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">No {mealType} planned</h3>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="mt-4 bg-[#00B488] text-white px-8 py-2.5 rounded-full font-bold hover:bg-[#009d76] shadow-lg shadow-green-100 transition-all active:scale-95"
                  >
                    Add Food
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* SIDEBAR: Animation Added */}
          <aside className="w-full lg:w-[380px]">
            <div className="bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-[0_10px_40px_rgba(0,0,0,0.03)] sticky top-28 transition-all duration-500 hover:shadow-md">
              <h3 className="text-xl font-black text-gray-900 mb-1">Shopping List</h3>
              <p className="text-gray-400 text-sm mb-6 font-medium">Weekly essentials</p>
              <button className="w-full bg-[#F59E0B] text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest mb-8 hover:bg-orange-500 transition-all shadow-md shadow-orange-100 active:scale-95">
                Generate Shopping List
              </button>
              <div className="space-y-4">
                <ShoppingItem label="Fresh Blueberries" checked />
                <ShoppingItem label="Greek Yogurt" />
                <ShoppingItem label="Feta Cheese" />
                <ShoppingItem label="Cherry Tomatoes" />
              </div>
            </div>
          </aside>
        </div>
      </main>

      <RecipeSearchModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelect={handleSelectRecipe}
      />

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}

function ShoppingItem({ label, checked = false }) {
  return (
    <div className="flex items-center gap-3 group cursor-pointer">
      <div className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-all ${checked ? "bg-[#00B488] border-[#00B488]" : "border-gray-200 group-hover:border-green-200"}`}>
        {checked && <span className="text-white text-[10px]">✓</span>}
      </div>
      <span className={`text-sm font-bold ${checked ? "text-gray-300 line-through italic" : "text-gray-600"}`}>
        {label}
      </span>
    </div>
  );
}