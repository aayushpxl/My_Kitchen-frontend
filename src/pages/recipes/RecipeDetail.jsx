import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useRecipe, useToggleSaveRecipe } from '../../hooks/useRecipes';
import { useAuth } from '../../context/AuthContext';
import Navbar from '../../components/common/Navbar';
import Button from '../../components/ui/Button';
import { toast } from 'react-toastify';
import CookingMode from '../../components/recipes/CookingMode';
import CommunitySection from '../../components/Feedback/CommunitySection'; 
import { getImageUrl } from '../../utils/imageUtils';

const RecipeDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const { data: recipe, isLoading, error } = useRecipe(id);
    const toggleSaveMutation = useToggleSaveRecipe();

    const isSaved = user?.savedRecipes?.some(r => r === id || r._id === id);

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

            {/* Hero Image Section */}
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
                            <span className={`flex items-center gap-1 px-3 py-1 rounded-full bg-white/20 backdrop-blur ${recipe.difficulty === 'Easy' ? 'text-emerald-400' : recipe.difficulty === 'Hard' ? 'text-rose-400' : 'text-amber-400'}`}>
                                📊 {recipe.difficulty}
                            </span>
                            <span className="flex items-center gap-1 bg-white/20 backdrop-blur px-3 py-1 rounded-full">
                                🍽️ {recipe.servings} Servings
                            </span>
                        </div>
                    </div>
                    <button onClick={handleToggleSave} className="mr-12 md:mr-24 bg-white/20 backdrop-blur-md p-3.5 rounded-full hover:bg-white/30 transition shadow-lg border border-white/20">
                        <svg className={`w-7 h-7 ${isSaved ? "fill-orange-400 text-orange-400" : "text-white"}`} viewBox="0 0 24 24" fill={isSaved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2.5">
                            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                        </svg>
                    </button>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12 grid md:grid-cols-3 gap-12">
                <div className="md:col-span-2 space-y-10">
                    <section>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Description</h2>
                        <p className="text-gray-600 leading-relaxed mb-6">{recipe.description}</p>
                        <div className="flex flex-wrap gap-2">
                            {recipe.tags?.map(tag => (
                                <span key={tag} className="bg-orange-50 text-orange-600 px-3 py-1 rounded-lg text-xs font-bold border border-orange-100 uppercase tracking-widest">#{tag}</span>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Instructions</h2>
                        {recipe.isLocked ? (
                            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 text-center space-y-4 relative overflow-hidden">
                                <div className="absolute inset-0 bg-white/50 backdrop-blur-sm z-10 flex flex-col items-center justify-center">
                                    <span className="text-4xl mb-2">🔒</span>
                                    <h3 className="text-xl font-bold text-gray-800">Login to View Full Recipe</h3>
                                    <Link to="/login"><Button className="bg-orange-600 text-white mt-4">Login Now</Button></Link>
                                </div>
                                <div className="filter blur-sm select-none opacity-50 text-left space-y-4">
                                    <p>1. First, prepare the ingredients by chopping them finely.</p>
                                    <p>2. Heat the pan to medium heat and add olive oil.</p>
                                </div>
                            </div>
                        ) : (
                            <CookingMode recipe={recipe} />
                        )}
                    </section>
                </div>

                {/* Sidebar Ingredients */}
                <div className="md:col-span-1">
                    <div className="bg-orange-50/50 p-8 rounded-[2rem] sticky top-24 border border-orange-100/50">
                        <h2 className="text-xl font-black text-gray-800 mb-6 uppercase tracking-widest text-sm">Ingredients</h2>
                        {recipe.isLocked ? (
                            <div className="filter blur-sm select-none opacity-60 space-y-4">
                                <div className="flex justify-between border-b border-orange-200/50 pb-3"><span>Tomato</span><span>2 pcs</span></div>
                            </div>
                        ) : (
                            <ul className="space-y-4">
                                {recipe.ingredients?.map((ing, idx) => (
                                    <li key={idx} className="flex justify-between items-center border-b border-orange-100 pb-3 last:border-0">
                                        <span className="text-gray-700 font-bold">{ing.name}</span>
                                        <span className="text-gray-500 font-medium text-sm">{ing.quantity} {ing.unit}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>

            {/* ✅ Community Section Implementation */}
            <CommunitySection 
                recipeId={id} 
                reviews={recipe.reviews} 
            />
        </div>
    );
};

export default RecipeDetail;