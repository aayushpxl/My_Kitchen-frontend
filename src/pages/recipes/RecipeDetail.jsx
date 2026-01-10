import React, { useEffect } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { useRecipe, useToggleSaveRecipe } from '../../hooks/useRecipes';
import { useAuth } from '../../context/AuthContext';
import AppNavBar from '../../components/common/Navbar';
import LandingNavBar from '../landingpage/NavBar';
import Button from '../../components/ui/Button';
import { toast } from 'react-toastify';
import CookingMode from '../../components/recipes/CookingMode';
import CommunitySection from '../../components/Feedback/CommunitySection';
import { getImageUrl } from '../../utils/imageUtils';
import { Download, FileText, File as FileIcon } from 'lucide-react';
import { jsPDF } from 'jspdf';

const RecipeDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { user, loading: authLoading } = useAuth();

    // Check if accessed through challenge workflow
    const isChallengeMode = location.pathname.startsWith('/challenges/recipe/');


    // Redirect logic (optional, currently disabled)
    useEffect(() => {
        if (!authLoading && !user) {
            // navigate('/login'); 
        }
    }, [user, authLoading, navigate]);

    const { data: recipe, isLoading, error } = useRecipe(id);
    const toggleSaveMutation = useToggleSaveRecipe();

    // STRICT: Show Lock Screen if not logged in
    if (!authLoading && !user) {
        return (
            <div className="min-h-screen bg-gray-50 font-sans flex flex-col">
                {/* Unified Navigation: Show Landing NavBar for public users */}
                <LandingNavBar />

                <div className="flex-grow flex items-center justify-center p-4">
                    <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl text-center max-w-md w-full border border-gray-100">
                        <div className="w-20 h-20 bg-orange-100/50 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
                            🔒
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-3">Login to View Recipe</h2>
                        <p className="text-gray-500 mb-8 leading-relaxed">
                            This recipe is exclusive to our community. Please login or create an account to view the full ingredients and instructions.
                        </p>
                        <div className="space-y-3">
                            <Button className="w-full py-3 text-lg" onClick={() => navigate('/login')}>
                                Login to Unlock
                            </Button>
                            <Link to="/register" className="block text-sm text-orange-600 font-medium hover:underline">
                                Don't have an account? Sign up
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Loading / Error States
    if (isLoading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    if (error || !recipe) return <div className="min-h-screen flex items-center justify-center text-red-500">Recipe not found</div>;

    const isSaved = user?.savedRecipes?.some(r => r === id || r._id === id);

    const handleToggleSave = () => {
        toggleSaveMutation.mutate(id, {
            onSuccess: (data) => {
                toast.success(data.isSaved ? "Recipe Saved!" : "Recipe Removed");
            },
            onError: (err) => {
                toast.error(err.response?.data?.message || "Failed to save");
            }
        });
    };

    const downloadShoppingList = () => {
        if (!recipe || !recipe.ingredients) return;

        const header = `🛒 MY KITCHEN SHOPPING LIST\n`;
        const title = `Recipe: ${recipe.title.toUpperCase()}\n`;
        const date = `Date: ${new Date().toLocaleDateString()}\n`;
        const separator = "==========================================\n\n";

        const ingredientsText = recipe.ingredients
            .map(ing => `[ ] ${ing.name.padEnd(25)} ${ing.quantity} ${ing.unit}`)
            .join('\n');

        const footer = `\n\n${separator}Happy Cooking! Visit us for more recipes.\nMy Kitchen - Your Personal Culinary Assistant`;

        const fullContent = header + title + date + separator + ingredientsText + footer;

        const blob = new Blob([fullContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${recipe.title.toLowerCase().replace(/\s+/g, '-')}-shopping-list.txt`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        toast.success("Shopping list downloaded!");
    };

    const downloadPDF = () => {
        if (!recipe || !recipe.ingredients) return;

        const doc = new jsPDF();

        // Header
        doc.setFontSize(22);
        doc.setTextColor(217, 136, 41); // Orange
        doc.text("MY KITCHEN", 105, 20, { align: "center" });

        doc.setFontSize(12);
        doc.setTextColor(100);
        doc.text("Your Personal Culinary Assistant", 105, 28, { align: "center" });

        doc.setDrawColor(240);
        doc.line(20, 35, 190, 35);

        // Recipe Title
        doc.setFontSize(18);
        doc.setTextColor(40);
        doc.text(recipe.title.toUpperCase(), 20, 50);

        doc.setFontSize(10);
        doc.setTextColor(150);
        doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 58);

        // Ingredients Header
        doc.setFontSize(14);
        doc.setTextColor(40);
        doc.text("SHOPPING LIST / INGREDIENTS", 20, 75);

        // Ingredients List
        let yPos = 85;
        doc.setFontSize(11);
        doc.setTextColor(60);

        recipe.ingredients.forEach((ing, index) => {
            if (yPos > 270) {
                doc.addPage();
                yPos = 20;
            }

            // Draw checkbox
            doc.setDrawColor(200);
            doc.rect(20, yPos - 4, 4, 4);

            doc.text(`${ing.name}`, 30, yPos);
            doc.text(`${ing.quantity} ${ing.unit}`, 150, yPos);

            yPos += 10;
            doc.setDrawColor(245);
            doc.line(20, yPos - 5, 190, yPos - 5);
        });

        // Footer
        const finalY = Math.min(yPos + 20, 280);
        doc.setFontSize(10);
        doc.setTextColor(150);
        doc.text("==========================================", 105, finalY, { align: "center" });
        doc.text("Happy Cooking! Visit My Kitchen for more recipes.", 105, finalY + 7, { align: "center" });

        doc.save(`${recipe.title.toLowerCase().replace(/\s+/g, '-')}-shopping-list.pdf`);
        toast.success("PDF Shopping list downloaded!");
    };

    return (
        <div className="min-h-screen bg-white font-sans overflow-x-hidden">
            {/* App Navigation: Show App NavBar for logged-in users */}
            <AppNavBar />

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
                            <CookingMode recipe={recipe} isChallengeMode={isChallengeMode} />
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

                        {!recipe.isLocked && (
                            <div className="mt-8 space-y-3">
                                <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest text-center mb-4">Download Shopping List</h3>
                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        onClick={downloadPDF}
                                        className="flex flex-col items-center justify-center gap-2 bg-orange-500 text-white font-bold py-4 rounded-2xl hover:bg-orange-600 transition-all duration-300 shadow-md hover:shadow-orange-200 group active:scale-95"
                                    >
                                        <FileIcon size={20} />
                                        <span className="text-xs">PDF Document</span>
                                    </button>
                                    <button
                                        onClick={downloadShoppingList}
                                        className="flex flex-col items-center justify-center gap-2 bg-white border-2 border-gray-100 text-gray-600 font-bold py-4 rounded-2xl hover:border-orange-200 hover:text-orange-500 transition-all duration-300 shadow-sm group active:scale-95"
                                    >
                                        <FileText size={20} />
                                        <span className="text-xs">TXT File</span>
                                    </button>
                                </div>
                                <p className="text-[10px] text-gray-400 text-center font-medium">Ready for your supermarket trip!</p>
                            </div>
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