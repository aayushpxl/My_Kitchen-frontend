import React, { useEffect, useState } from 'react';
import { getSavedRecipes } from '../../api/recipeApi';
import RecipeGridCard from '../recipes/RecipeGridCard';
import { Bookmark } from 'lucide-react';

const SavedRecipesList = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchSaved = async () => {
        try {
            setLoading(true);
            const data = await getSavedRecipes();
            setRecipes(data || []);
        } catch (err) {
            console.error(err);
            setError("Failed to load saved recipes.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSaved();
    }, []);

    if (loading) return <div className="text-center py-10 text-gray-400">Loading saved recipes...</div>;
    if (error) return <div className="text-center py-10 text-red-400">{error}</div>;

    if (recipes.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 px-4 bg-gray-50 rounded-[2rem] border border-dashed border-gray-200">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-gray-300 mb-4 shadow-sm">
                    <Bookmark size={32} />
                </div>
                <h4 className="text-gray-900 font-bold mb-1">No saved recipes yet</h4>
                <p className="text-gray-400 text-sm text-center max-w-xs">
                    Recipes you save will appear here for quick access later.
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {recipes.map(recipe => (
                <RecipeGridCard key={recipe._id} recipe={recipe} />
            ))}
        </div>
    );
};

export default SavedRecipesList;
