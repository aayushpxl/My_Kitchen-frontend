import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useRecipe, useToggleSaveRecipe } from '../../hooks/useRecipes';
import { useAuth } from '../../context/AuthContext';
import Navbar from '../../components/common/Navbar';  // ✅ Home navbar
import Button from '../../components/ui/Button';
import { toast } from 'react-toastify';
import CookingMode from '../../components/recipes/CookingMode';
import { getImageUrl } from '../../utils/imageUtils';

const RecipeDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const { data: recipe, isLoading, error } = useRecipe(id);
    const toggleSaveMutation = useToggleSaveRecipe();

    // ...rest of the component


    const isSaved = user?.savedRecipes?.some(r => r === id || r._id === id); // Handle ID or object population

    const handleToggleSave = () => {
        if (!user) {
            toast.error("Please login to save recipes");
            navigate("/login");
            return;
        }
        toggleSaveMutation.mutate(id, {
            onSuccess: (data) => {
                toast.success(data.isSaved ? "Recipe Saved!" : "Recipe Removed");
            },
            onError: (err) => {
                toast.error(err.response?.data?.message || "Failed to save");
            }
        });
    };

    if (isLoading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    if (error || !recipe) return <div className="min-h-screen flex items-center justify-center text-red-500">Recipe not found</div>;

    return (
        <div className="min-h-screen bg-white font-sans overflow-x-hidden">
            <Navbar />

            {/* Hero Image */}
            <div className="relative h-[400px] w-full">
                <img src={getImageUrl(recipe.image, "https://placehold.co/1200x600")} alt={recipe.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-10 left-4 md:left-20 text-white w-full pr-8 flex justify-between items-end">
                    <div>
                        <h1 className="text-4xl md:text-6xl font-bold mb-4">{recipe.title}</h1>
                        <div className="flex items-center gap-6 text-sm font-semibold">
                            {recipe.createdBy && (
                                <Link to={`/users/${recipe.createdBy._id}`} className="flex items-center gap-1 bg-white/20 backdrop-blur px-3 py-1 rounded-full hover:bg-white/30 transition">
                                    👤 By {recipe.createdBy.username || "Unknown"}
                                </Link>
                            )}
                            {recipe.nutrition?.calories && (
                                <span className="flex items-center gap-1">🔥 {recipe.nutrition.calories} Kcal</span>
                            )}
                            {recipe.difficulty && (
                                <span className={`flex items-center gap-1 px-3 py-1 rounded-full bg-white/20 backdrop-blur ${recipe.difficulty === 'Easy' ? 'text-emerald-400' : recipe.difficulty === 'Hard' ? 'text-rose-400' : 'text-amber-400'
                                    }`}>
                                    📊 {recipe.difficulty}
                                </span>
                            )}
                            {recipe.servings && (
                                <span className="flex items-center gap-1 bg-white/20 backdrop-blur px-3 py-1 rounded-full">
                                    🍽️ {recipe.servings} Servings
                                </span>
                            )}
                        </div>
                    </div>
                    {/* Save Button */}
                    <button
                        onClick={handleToggleSave}
                        className="mr-12 md:mr-24 bg-white/20 backdrop-blur-md p-3.5 rounded-full hover:bg-white/30 transition shadow-lg group border border-white/20"
                        title={isSaved ? "Unsave Recipe" : "Save Recipe"}
                    >
                        <svg
                            className={`w-7 h-7 ${isSaved ? "fill-orange-400 text-orange-400" : "text-white"}`}
                            viewBox="0 0 24 24"
                            fill={isSaved ? "currentColor" : "none"}
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                        </svg>
                    </button>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12 grid md:grid-cols-3 gap-12">
                {/* Left Content: Description & Instructions */}
                <div className="md:col-span-2 space-y-10">
                    <section>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Description</h2>
                        <p className="text-gray-600 leading-relaxed mb-6">{recipe.description}</p>

                        {recipe.tags && recipe.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {recipe.tags.map(tag => (
                                    <span key={tag} className="bg-orange-50 text-orange-600 px-3 py-1 rounded-lg text-xs font-bold border border-orange-100 uppercase tracking-widest">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        )}
                    </section>



                    <section>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Instructions</h2>
                        {recipe.isLocked ? (
                            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 text-center space-y-4 relative overflow-hidden">
                                <div className="absolute inset-0 bg-white/50 backdrop-blur-sm z-10 flex flex-col items-center justify-center">
                                    <span className="text-4xl mb-2">🔒</span>
                                    <h3 className="text-xl font-bold text-gray-800">Login to View Full Recipe</h3>
                                    <p className="text-gray-500 mb-4">Join our community to access step-by-step instructions.</p>
                                    <Link to="/login">
                                        <Button className="bg-orange-600 text-white shadow-orange-200">
                                            Login Now
                                        </Button>
                                    </Link>
                                </div>
                                {/* Fake Blurred Content */}
                                <div className="filter blur-sm select-none opacity-50 text-left space-y-4">
                                    <p>1. First, prepare the ingredients by chopping them finely.</p>
                                    <p>2. Heat the pan to medium heat and add olive oil.</p>
                                    <p>3. Sauté the onions until golden brown...</p>
                                </div>
                            </div>
                        ) : (
                            <CookingMode recipe={recipe} />
                        )}
                    </section>

                    {/* Pro Tips Section - Moved here and redesigned */}
                    {recipe.proTips && recipe.proTips.length > 0 && (
                        <div className="bg-[#F0F4FF] rounded-3xl p-6 md:p-8 flex items-start gap-4 md:gap-6 border border-blue-50/50">
                            <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 bg-[#F59E0B] rounded-full flex items-center justify-center shadow-lg shadow-orange-100">
                                <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                </svg>
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="text-[#4F46E5] font-black text-sm uppercase tracking-widest mb-2">Chef's Pro Tip</h3>
                                <div className="space-y-3">
                                    {recipe.proTips.map((tip, idx) => (
                                        <p key={idx} className="text-[#4F46E5] text-base md:text-lg font-medium leading-relaxed opacity-90">
                                            {tip}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Sidebar: Ingredients */}
                <div className="md:col-span-1">
                    <div className="bg-orange-50 p-6 rounded-2xl sticky top-24">
                        <h2 className="text-xl font-bold text-gray-800 mb-6">Ingredients</h2>

                        {recipe.isLocked ? (
                            <div className="space-y-3 relative">
                                <div className="absolute inset-0 z-10"></div> {/* Block interaction */}
                                <div className="filter blur-sm select-none opacity-60">
                                    <div className="flex justify-between border-b border-orange-200 pb-2">
                                        <span>Tomato</span>
                                        <span>2 pcs</span>
                                    </div>
                                    <div className="flex justify-between border-b border-orange-200 pb-2">
                                        <span>Unlocks on Login</span>
                                        <span>---</span>
                                    </div>
                                </div>
                                <div className="text-center pt-4">
                                    <span className="text-xs font-bold text-orange-600">🔒 Login to see ingredients</span>
                                </div>
                            </div>
                        ) : (
                            <ul className="space-y-4">
                                {recipe.ingredients && recipe.ingredients.map((ing, idx) => (
                                    <li key={idx} className="flex justify-between items-center border-b border-orange-200 pb-2 last:border-0">
                                        <span className="text-gray-700 font-medium">{ing.name}</span>
                                        <span className="text-gray-500 text-sm">{ing.quantity} {ing.unit}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>


        </div>
    );
};

export default RecipeDetail;
