import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';

const RecipeCard = ({ recipe }) => {
    return (
        <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition p-4 border border-gray-100 flex flex-col h-full">
            <div className="relative mb-4 h-48 rounded-xl overflow-hidden">
                <img
                    src={recipe.image || "https://placehold.co/600x400?text=No+Image"}
                    alt={recipe.title}
                    className="w-full h-full object-cover transform hover:scale-105 transition duration-500"
                />
            </div>

            <div className="flex-1 flex flex-col">
                <h3 className="text-lg font-bold text-gray-800 mb-1 line-clamp-1">{recipe.title}</h3>

                <div className="flex items-center gap-2 mb-3">
                    {/* Nutrition Badge if available */}
                    {recipe.nutrition && recipe.nutrition.calories && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-orange-100 text-orange-700">
                            {recipe.nutrition.calories} Kcal
                        </span>
                    )}
                </div>

                <div className="mt-auto pt-3 border-t border-gray-100 flex justify-between items-center">
                    <div className="flex items-center gap-1">
                        <img src={`https://ui-avatars.com/api/?name=${recipe.createdBy?.username || 'User'}&background=random`} className="w-6 h-6 rounded-full" alt="Author" />
                        <span className="text-xs text-gray-500 max-w-[80px] truncate">{recipe.createdBy?.username || "Chef"}</span>
                    </div>
                    <Link to={`/recipes/${recipe._id}`} className="text-sm font-bold text-orange-600 hover:text-orange-700">
                        View Recipe →
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default RecipeCard;
