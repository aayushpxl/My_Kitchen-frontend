import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, Heart } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { toggleSaveRecipe } from '../../api/recipeApi';
import { toast } from 'react-toastify';
import { getImageUrl } from '../../utils/imageUtils';

const RecipeGridCard = ({ recipe }) => {
    const { user, fetchUser } = useAuth();
    const [isSaving, setIsSaving] = useState(false);

    const isSaved = user?.savedRecipes?.includes(recipe._id);

    const averageRating = recipe.reviews?.length > 0
        ? (recipe.reviews.reduce((acc, rev) => acc + rev.rating, 0) / recipe.reviews.length).toFixed(1)
        : null;

    const handleToggleSave = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (!user) {
            toast.info("Please login to save recipes!");
            return;
        }

        setIsSaving(true);
        try {
            const res = await toggleSaveRecipe(recipe._id);
            if (res.success) {
                toast.success(res.message);
                await fetchUser(); // Refresh user state to update isSaved
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to save recipe");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="group relative bg-white rounded-[2.5rem] p-5 border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-500 flex flex-col h-full overflow-hidden">

            {/* Image Section - Scaled down slightly with a more refined shape */}
            <div className="relative aspect-square mb-5 overflow-hidden rounded-[2rem]">
                <img
                    src={getImageUrl(recipe.image)}
                    alt={recipe.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                />

                {/* Floating Save Button */}
                <button
                    onClick={handleToggleSave}
                    disabled={isSaving}
                    className={`absolute top-3 left-3 z-10 p-2.5 rounded-2xl transition-all duration-300 ${isSaved
                        ? 'bg-orange-600 text-white shadow-lg shadow-orange-200 scale-110'
                        : 'bg-white/80 backdrop-blur-md text-gray-900 border border-white/50 hover:bg-white hover:scale-110'
                        }`}
                >
                    <Bookmark
                        size={16}
                        className={`${isSaved ? 'fill-current' : ''} ${isSaving ? 'animate-pulse' : ''}`}
                    />
                </button>

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
                <div className="flex flex-wrap items-center gap-2 mb-2">
                    {recipe.category && (
                        <>
                            <span className="text-[10px] font-bold text-orange-500 uppercase tracking-[0.15em]">
                                {recipe.category}
                            </span>
                            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                        </>
                    )}
                    {averageRating && (
                        <>
                            <span className="flex items-center gap-1 text-[10px] font-black text-amber-500 uppercase tracking-widest bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-100">
                                ⭐ {averageRating}
                            </span>
                            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                        </>
                    )}
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em]">
                        {recipe.cookingTime || "25 min"}
                    </span>
                    {recipe.difficulty && (
                        <>
                            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                            <span className={`text-[10px] font-bold uppercase tracking-[0.15em] ${recipe.difficulty === 'Easy' ? 'text-emerald-500' : recipe.difficulty === 'Hard' ? 'text-rose-500' : 'text-amber-500'
                                }`}>
                                {recipe.difficulty}
                            </span>
                        </>
                    )}
                </div>

                <h3 className="text-lg font-black text-gray-900 mb-2 leading-tight group-hover:text-orange-600 transition-colors duration-300 line-clamp-1">
                    {recipe.title}
                </h3>

                <p className="text-gray-500 text-xs leading-relaxed mb-4 line-clamp-2 font-medium">
                    {recipe.description || "A delicious recipe waiting for you to cook."}
                </p>

                {/* Dynamic Tags list */}
                {(recipe.tags && recipe.tags.length > 0) ? (
                    <div className="flex flex-wrap gap-1.5 mb-6">
                        {recipe.tags.slice(0, 3).map((tag) => (
                            <span key={tag} className="text-[9px] font-bold bg-orange-50 text-orange-600/70 px-2 py-1 rounded-md uppercase tracking-wide border border-orange-100/50">
                                {tag}
                            </span>
                        ))}
                        {recipe.servings && (
                            <span className="text-[9px] font-bold bg-gray-50 text-gray-400 px-2 py-1 rounded-md uppercase tracking-wide ml-auto">
                                {recipe.servings} Servings
                            </span>
                        )}
                    </div>
                ) : (
                    <div className="flex flex-wrap gap-1.5 mb-6">
                        {recipe.servings && (
                            <span className="text-[9px] font-bold bg-gray-50 text-gray-400 px-2 py-1 rounded-md uppercase tracking-wide">
                                {recipe.servings} Servings
                            </span>
                        )}
                    </div>
                )}

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