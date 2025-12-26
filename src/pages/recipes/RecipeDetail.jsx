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
        <div className="min-h-screen bg-white font-sans">
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
                            {recipe.nutrition?.protein && (
                                <span className="flex items-center gap-1">💪 {recipe.nutrition.protein} Protein</span>
                            )}
                        </div>
                    </div>
                    {/* Save Button */}
                    <button
                        onClick={handleToggleSave}
                        className="mr-12 md:mr-24 bg-white/20 backdrop-blur-md p-3 rounded-full hover:bg-white/30 transition shadow-lg group"
                        title={isSaved ? "Unsave Recipe" : "Save Recipe"}
                    >
                        <span className={`text-3xl ${isSaved ? "grayscale-0" : "grayscale"} `}>
                            {isSaved ? "❤️" : "🤍"}
                        </span>
                    </button>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12 grid md:grid-cols-3 gap-12">
                {/* Left Content: Description & Instructions */}
                <div className="md:col-span-2 space-y-10">
                    <section>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Description</h2>
                        <p className="text-gray-600 leading-relaxed">{recipe.description}</p>
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
                            <CookingMode steps={recipe.steps} />
                        )}
                    </section>
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
