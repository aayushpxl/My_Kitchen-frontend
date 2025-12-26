import React from "react";
import { Trash2, ExternalLink } from "lucide-react"; // Or use your own icons
import { getImageUrl } from "../../utils/imageUtils";

export default function MealItem({ meal, onDelete }) {
  // Accessing populated recipe data from the backend model
  const { recipe, note } = meal;

  return (
    <div className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl hover:shadow-md transition-shadow group">
      <div className="flex items-center gap-4">
        {/* Recipe Image */}
        <img
          src={getImageUrl(recipe?.image, "https://via.placeholder.com/150")}
          className="w-20 h-20 rounded-xl object-cover"
          alt={recipe?.title}
        />

        <div>
          <h4 className="font-bold text-gray-900">{recipe?.title}</h4>
          <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
            <span className="bg-gray-100 px-2 py-0.5 rounded text-[#00B488] font-medium">
              {recipe?.category || "Recipe"}
            </span>
            <span>• {recipe?.cookingTime || "20"} mins</span>
          </div>
          {note && (
            <p className="text-xs text-orange-500 mt-2 italic font-medium">
              Note: {note}
            </p>
          )}
        </div>
      </div>

      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => window.open(`/recipes/${recipe?._id}`, '_blank')}
          className="p-2 bg-gray-50 text-gray-400 rounded-lg hover:bg-[#00B488]/10 hover:text-[#00B488] transition-colors"
          title="View Recipe"
        >
          <ExternalLink size={18} />
        </button>
        <button
          onClick={onDelete}
          className="p-2 bg-gray-50 text-gray-400 rounded-lg hover:bg-red-50 hover:text-red-500 transition-colors"
          title="Remove from Plan"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}