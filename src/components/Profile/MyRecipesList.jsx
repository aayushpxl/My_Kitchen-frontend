import React, { useEffect, useState } from 'react';
import { getMyRecipes } from '../../api/recipeApi';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Clock, CheckCircle, XCircle, Lock, Edit2, ChevronRight, Eye } from 'lucide-react';
import { getImageUrl } from '../../utils/imageUtils';

const MyRecipesList = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMyRecipes();
    }, []);

    const fetchMyRecipes = async () => {
        try {
            const data = await getMyRecipes();
            setRecipes(data);
        } catch (error) {
            console.error("Failed to fetch my recipes", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="text-gray-400 text-sm py-4">Loading your recipes...</div>;

    if (loading) return <div className="text-gray-400 text-sm py-4">Loading your recipes...</div>;

    // Show empty state only if no recipes, but always allow creating new ones via the header/button
    // Actually, user wants to add multiple recipes even if they have one.
    // So I will move the "Create Recipe" button to the top of the list in the return statement.


    const getStatusBadge = (status, reason) => {
        switch (status) {
            case 'approved':
                return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700"><CheckCircle size={10} /> Published</span>;
            case 'pending':
                return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-50 text-yellow-700"><Clock size={10} /> Pending Review</span>;
            case 'rejected':
                return (
                    <div className="group relative">
                        <span className="cursor-help inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-red-50 text-red-700"><XCircle size={10} /> Rejected</span>
                        {reason && <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-gray-900 text-white text-xs p-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10">{reason}</div>}
                    </div>
                );
            case 'private':
                return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600"><Lock size={10} /> Private</span>;
            default:
                return null;
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-end mb-4">
                <Link to="/profile/create-recipe" className="text-sm bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition flex items-center gap-2">
                    <Edit2 size={16} /> Create New Recipe
                </Link>
            </div>

            {recipes.length === 0 && (
                <div className="flex flex-col items-center justify-center p-8 border border-dashed border-gray-200 rounded-xl bg-gray-50/50">
                    <div className="text-4xl mb-3">👨‍🍳</div>
                    <h3 className="font-semibold text-gray-900 mb-1">No recipes yet</h3>
                    <p className="text-sm text-gray-400 mb-4 text-center">Share your culinary masterpieces with the world!</p>
                </div>
            )}

            {recipes.map((recipe) => (
                <div key={recipe._id} className="group bg-white border border-gray-100 rounded-xl p-4 flex items-center gap-4 hover:shadow-sm transition-shadow">
                    <div className="w-16 h-16 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
                        {recipe.image ? (
                            <img src={getImageUrl(recipe.image)} alt={recipe.title} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-300">🍰</div>
                        )}
                    </div>

                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-gray-900 truncate">{recipe.title}</h4>
                            {getStatusBadge(recipe.status, recipe.rejectionReason)}
                        </div>
                        <p className="text-xs text-gray-500 truncate">{recipe.description || "No description provided."}</p>
                    </div>

                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link to={`/recipes/${recipe._id}`} className="p-2 text-gray-400 hover:text-orange-500 bg-gray-50 rounded-lg hover:bg-orange-50" title="View">
                            <Eye size={16} />
                        </Link>
                        {/* Update edit link to new route */}
                        <Link to={`/profile/edit-recipe/${recipe._id}`} className="p-2 text-gray-400 hover:text-blue-500 bg-gray-50 rounded-lg hover:bg-blue-50" title="Edit">
                            <Edit2 size={16} />
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MyRecipesList;
