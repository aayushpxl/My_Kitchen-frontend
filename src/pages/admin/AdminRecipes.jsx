import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllRecipes, deleteRecipe } from '../../api/recipeApi';
import { Pencil, Trash2, Plus, Eye, Search, Filter, Calendar, User, ChefHat } from 'lucide-react';
import { getImageUrl } from '../../utils/imageUtils';
import DeleteModal from '../../components/admin/DeleteModal';

const AdminRecipes = () => {
    const [recipes, setRecipes] = useState([]);
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterRole, setFilterRole] = useState('all');

    // Delete Modal State
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [recipeToDelete, setRecipeToDelete] = useState(null);

    useEffect(() => {
        fetchRecipes();
    }, []);

    useEffect(() => {
        let result = recipes;
        if (filterRole !== 'all') {
            result = result.filter(r => {
                if (filterRole === 'admin') return r.createdByRole === 'admin';
                if (filterRole === 'user') return r.createdByRole !== 'admin';
                return true;
            });
        }
        if (searchTerm) {
            const lower = searchTerm.toLowerCase();
            result = result.filter(r =>
                r.title.toLowerCase().includes(lower) ||
                r.createdBy?.username?.toLowerCase().includes(lower)
            );
        }
        setFilteredRecipes(result);
    }, [searchTerm, recipes, filterRole]);

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

    const handleDeleteClick = (recipe) => {
        setRecipeToDelete(recipe);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        if (!recipeToDelete) return;
        try {
            await deleteRecipe(recipeToDelete._id);
            setRecipes(recipes.filter(r => r._id !== recipeToDelete._id));
            setIsDeleteModalOpen(false);
            setRecipeToDelete(null);
        } catch (error) {
            console.error("Failed to delete recipe", error);
            alert("Failed to delete recipe");
        }
    };

    if (loading) return (
        <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto pb-10">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Recipe Vault</h1>
                    <p className="text-gray-500 mt-1 flex items-center gap-2">
                        <ChefHat size={16} className="text-orange-500" />
                        Manage and curate the MyKitchen recipe collection
                    </p>
                </div>
                <Link to="/admin/add-recipe" className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-orange-200 hover:shadow-orange-300 hover:-translate-y-0.5 transition-all active:scale-95">
                    <Plus size={20} />
                    Add New Recipe
                </Link>
            </div>

            {/* Toolbar Section */}
            <div className="bg-white p-5 rounded-[2rem] border border-gray-100 shadow-sm mb-6 flex flex-wrap items-center gap-4">
                <div className="relative flex-1 min-w-[300px]">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search by title or author..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-orange-500/20 transition-all text-gray-700 placeholder:text-gray-400"
                    />
                </div>

                <div className="flex items-center gap-2 bg-gray-50 p-1.5 rounded-2xl">
                    <button
                        onClick={() => setFilterRole('all')}
                        className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${filterRole === 'all' ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        All
                    </button>
                    <button
                        onClick={() => setFilterRole('admin')}
                        className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${filterRole === 'admin' ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        Admin
                    </button>
                    <button
                        onClick={() => setFilterRole('user')}
                        className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${filterRole === 'user' ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        Community
                    </button>
                </div>

                <div className="hidden lg:block h-8 w-px bg-gray-100 mx-2"></div>

                <div className="text-sm font-medium text-gray-400">
                    Showing <span className="text-gray-900">{filteredRecipes.length}</span> recipes
                </div>
            </div>

            {/* Table/List Container */}
            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-gray-50">
                                <th className="px-8 py-5 text-sm font-bold text-gray-400 uppercase tracking-wider">Recipe Info</th>
                                <th className="px-8 py-5 text-sm font-bold text-gray-400 uppercase tracking-wider">Author</th>
                                <th className="px-8 py-5 text-sm font-bold text-gray-400 uppercase tracking-wider">Published</th>
                                <th className="px-8 py-5 text-sm font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filteredRecipes.map((recipe) => (
                                <tr key={recipe._id} className="group hover:bg-orange-50/30 transition-colors">
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-4">
                                            <div className="w-14 h-14 rounded-2xl bg-gray-100 overflow-hidden shadow-inner flex-shrink-0 group-hover:scale-105 transition-transform">
                                                {recipe.image ? (
                                                    <img src={getImageUrl(recipe.image)} alt="" className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full bg-orange-100 flex items-center justify-center text-orange-500 font-bold">
                                                        {recipe.title.charAt(0)}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="min-w-0">
                                                <div className="font-bold text-gray-900 truncate">{recipe.title}</div>
                                                <div className="text-sm text-gray-400 truncate max-w-[250px]">{recipe.description}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${recipe.createdByRole === 'admin'
                                            ? 'bg-purple-50 text-purple-600 ring-1 ring-inset ring-purple-200'
                                            : 'bg-blue-50 text-blue-600 ring-1 ring-inset ring-blue-200'
                                            }`}>
                                            <User size={12} />
                                            {recipe.createdBy?.username || 'Unknown'}
                                            {recipe.createdByRole === 'admin' && <span className="opacity-60 font-medium tracking-tighter ml-0.5">STAFF</span>}
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-semibold text-gray-700">
                                                {new Date(recipe.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                            </span>
                                            <span className="text-xs text-gray-400 flex items-center gap-1">
                                                <Calendar size={10} />
                                                Created
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link
                                                to={`/admin/recipe/${recipe._id}`}
                                                className="p-2.5 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-xl transition-all"
                                                title="View Details"
                                            >
                                                <Eye size={20} />
                                            </Link>

                                            {recipe.createdByRole === 'admin' ? (
                                                <Link
                                                    to={`/admin/recipes/edit-recipe/${recipe._id}`}
                                                    className="p-2.5 text-gray-400 hover:text-emerald-500 hover:bg-emerald-50 rounded-xl transition-all"
                                                    title="Edit Recipe"
                                                >
                                                    <Pencil size={20} />
                                                </Link>
                                            ) : (
                                                <div className="p-2.5 text-gray-200 cursor-not-allowed" title="User Content">
                                                    <Pencil size={20} />
                                                </div>
                                            )}

                                            <button
                                                onClick={() => handleDeleteClick(recipe)}
                                                className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                                                title="Delete Recipe"
                                            >
                                                <Trash2 size={20} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {filteredRecipes.length === 0 && (
                                <tr>
                                    <td colSpan="4" className="px-8 py-20 text-center">
                                        <div className="flex flex-col items-center">
                                            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                                                <Search size={24} className="text-gray-300" />
                                            </div>
                                            <p className="text-gray-400 font-medium">No recipes match your criteria.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <DeleteModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={confirmDelete}
                title="Delete Recipe?"
                message="Are you sure you want to remove this recipe from the vault? This action will permanently delete all recipe data."
                itemName={recipeToDelete?.title}
            />
        </div>
    );
};

export default AdminRecipes;