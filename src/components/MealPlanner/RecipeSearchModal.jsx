import React, { useState, useEffect } from "react";
import { X, Search } from "lucide-react";
import api from "../../api/api"; // Your axios instance

export default function RecipeSearchModal({ isOpen, onClose, onSelect }) {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchRecipes();
    }
  }, [isOpen]);

  const fetchRecipes = async () => {
    setLoading(true);
    try {
      const res = await api.get("/recipes");
      setRecipes(res.data);
    } catch (err) {
      console.error("Error fetching recipes", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredRecipes = recipes.filter(r => 
    r.title.toLowerCase().includes(search.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-2xl rounded-[32px] overflow-hidden shadow-2xl flex flex-col max-h-[80vh]">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Choose a Recipe</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X size={24} />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-6 bg-gray-50">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search your recipes..."
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00B488]/20"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Recipe List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-3">
          {loading ? (
            <p className="text-center text-gray-500">Loading recipes...</p>
          ) : filteredRecipes.map((recipe) => (
            <div 
              key={recipe._id}
              onClick={() => onSelect(recipe._id)}
              className="flex items-center gap-4 p-3 border border-gray-100 rounded-2xl hover:border-[#00B488] hover:bg-[#00B488]/5 cursor-pointer transition-all group"
            >
              <img src={recipe.image} className="w-16 h-16 rounded-lg object-cover" alt="" />
              <div className="flex-1">
                <h4 className="font-bold text-gray-900 group-hover:text-[#00B488]">{recipe.title}</h4>
                <p className="text-xs text-gray-400">{recipe.category} • {recipe.cookingTime} mins</p>
              </div>
              <button className="text-[#00B488] font-bold text-sm px-4">Select</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}