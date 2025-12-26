import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllRecipes, deleteRecipe } from '../../api/recipeApi';
import { Pencil, Trash2, Plus, Eye, Search } from 'lucide-react';

const AdminRecipes = () => {
    const [recipes, setRecipes] = useState([]);
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchRecipes();
    }, []);

    useEffect(() => {
        if (!searchTerm) {
            setFilteredRecipes(recipes);
        } else {
            const lower = searchTerm.toLowerCase();
            setFilteredRecipes(recipes.filter(r =>
                r.title.toLowerCase().includes(lower) ||
                r.createdBy?.username?.toLowerCase().includes(lower)
            ));
        }
    }, [searchTerm, recipes]);

    const fetchRecipes = async () => {
        try {
            const data = await getAllRecipes();
            setRecipes(data);
            setFilteredRecipes(data);
        } catch (error) {
            console.error("Failed to fetch recipes", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this recipe?")) return;
        try {
            await deleteRecipe(id);
            setRecipes(recipes.filter(r => r._id !== id));
            // Toast success here
        } catch (error) {
            console.error("Failed to delete recipe", error);
            alert("Failed to delete recipe");
        }
    };

    if (loading) return <div className="text-center p-10">Loading recipes...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Recipes Management</h2>
                <Link to="/admin/add-recipe" className="flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition">
                    <Plus size={18} />
                    Add New Recipe
                </Link>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Filters / Search */}
                <div className="p-4 border-b border-gray-100 bg-gray-50 flex items-center gap-4">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search recipes..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                    </div>
                    <div className="text-sm text-gray-500">
                        Total: {filteredRecipes.length}
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 text-gray-600 text-xs uppercase font-semibold">
                            <tr>
                                <th className="px-6 py-4">Recipe</th>
                                <th className="px-6 py-4">Created By</th>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredRecipes.map((recipe) => (
                                <tr key={recipe._id} className="hover:bg-gray-50/50 transition">
                                    <td className="px-6 py-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-gray-100 overflow-hidden">
                                                {recipe.image ? (
                                                    <img src={recipe.image} alt="" className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full bg-orange-100 flex items-center justify-center text-orange-400">R</div>
                                                )}
                                            </div>
                                            <div>
                                                <div className="font-medium text-gray-900">{recipe.title}</div>
                                                <div className="text-xs text-gray-500 truncate max-w-[200px]">{recipe.description}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-3">
                                        <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${recipe.createdByRole === 'admin' ? 'bg-purple-50 text-purple-700' : 'bg-gray-100 text-gray-600'}`}>
                                            {recipe.createdBy?.username || 'Unknown'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-3 text-sm text-gray-500">
                                        {new Date(recipe.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-3">
                                        <div className="flex items-center justify-center gap-2">
                                            <Link to={`/admin/recipe/${recipe._id}`} className="p-1 text-gray-400 hover:text-blue-600">
                                                <Eye size={18} />
                                            </Link>
                                            {/* Note: Edit will just go to AddRecipe with state or separate Edit page. 
                                                For now we can reuse AddRecipe if we refactor it, or just show alert 'Coming soon'
                                                or link to /admin/edit-recipe/:id and implement that.
                                            */}
                                            <button className="p-1 text-gray-400 hover:text-green-600" title="Edit (Coming Soon)">
                                                <Pencil size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(recipe._id)}
                                                className="p-1 text-gray-400 hover:text-red-600"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {filteredRecipes.length === 0 && (
                                <tr>
                                    <td colSpan="4" className="px-6 py-8 text-center text-gray-400">
                                        No recipes found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminRecipes;
