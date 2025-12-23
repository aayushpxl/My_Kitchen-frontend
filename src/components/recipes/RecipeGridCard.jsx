import React from 'react';
import { Link } from 'react-router-dom';

const RecipeGridCard = ({ recipe }) => {
    return (
        <div className="group relative bg-white rounded-[2.5rem] p-5 border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-500 flex flex-col h-full overflow-hidden">
            
            {/* Image Section - Scaled down slightly with a more refined shape */}
            <div className="relative aspect-square mb-5 overflow-hidden rounded-[2rem]">
                <img
                    src={recipe.image || "https://placehold.co/400x400?text=No+Image"}
                    alt={recipe.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                
                {/* Floating Nutrition Badge - Premium Minimalist */}
                {recipe.nutrition?.calories && (
                    <div className="absolute top-3 right-3 backdrop-blur-md bg-white/80 px-3 py-1.5 rounded-2xl shadow-sm border border-white/50">
                        <span className="text-[10px] font-black text-gray-900 uppercase tracking-tighter">
                            {recipe.nutrition.calories} kcal
                        </span>
                    </div>
                )}
                
                {/* Gradient Overlay for better text legibility if needed */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            
            {/* Content Section - Improved Typography Hierarchy */}
            <div className="flex flex-col flex-grow px-2">
                <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-bold text-orange-500 uppercase tracking-[0.15em]">
                        {recipe.category || "Main Dish"}
                    </span>
                    <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em]">
                        {recipe.time || "25 min"}
                    </span>
                </div>

                <h3 className="text-lg font-black text-gray-900 mb-2 leading-tight group-hover:text-orange-600 transition-colors duration-300 line-clamp-1">
                    {recipe.title}
                </h3>

                <p className="text-gray-500 text-xs leading-relaxed mb-4 line-clamp-2 font-medium">
                    {recipe.description || "A delicious recipe waiting for you to cook."}
                </p>

                {/* Ingredients tag list - More refined than raw text */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                    {['Tomato', 'Cheese', 'Meat'].map((ing) => (
                        <span key={ing} className="text-[9px] font-bold bg-gray-50 text-gray-400 px-2 py-1 rounded-md uppercase tracking-wide">
                            {ing}
                        </span>
                    ))}
                </div>

                {/* Action - Minimalist Button */}
                <Link
                    to={`/recipes/${recipe._id}`}
                    className="mt-auto flex items-center justify-between w-full bg-gray-900 text-white py-4 px-6 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all duration-300 hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-200 active:scale-[0.97]"
                >
                    <span>Start Cooking</span>
                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                </Link>
            </div>
        </div>
    );
};

export default RecipeGridCard;