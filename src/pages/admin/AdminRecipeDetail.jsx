import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Clock, Users, Flame, ChevronLeft, CheckCircle, XCircle } from 'lucide-react';
import Button from '../../components/ui/Button';
import { getImageUrl } from '../../utils/imageUtils';

const AdminRecipeDetail = ({ source = 'recipes' }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Determine back path based on source
    const backPath = source === 'moderation' ? '/admin/moderation' : '/admin/recipes';
    const backLabel = source === 'moderation' ? 'Back to Moderation' : 'Back to Recipes';

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const token = sessionStorage.getItem('token');
                const res = await axios.get(`http://localhost:5000/api/recipes/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setRecipe(res.data);
            } catch (err) {
                console.error(err);
                setError("Failed to load recipe.");
            } finally {
                setLoading(false);
            }
        };

        fetchRecipe();
    }, [id]);

    const handleApprove = async () => {
        if (!window.confirm("Approve this recipe?")) return;
        try {
            const token = sessionStorage.getItem('token');
            await axios.put(`http://localhost:5000/api/recipes/${id}/status`, { status: 'approved' }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            navigate('/admin/moderation');
        } catch (error) {
            alert("Failed to approve");
        }
    };

    const handleReject = async () => {
        const reason = prompt("Enter rejection reason:");
        if (!reason) return;
        try {
            const token = sessionStorage.getItem('token');
            await axios.put(`http://localhost:5000/api/recipes/${id}/status`, { status: 'rejected', rejectionReason: reason }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            navigate('/admin/moderation');
        } catch (error) {
            alert("Failed to reject");
        }
    };

    if (loading) return <div className="p-8 text-center text-gray-500">Loading recipe...</div>;
    if (error) return <div className="p-8 text-center text-red-500">{error}</div>;
    if (!recipe) return <div className="p-8 text-center text-gray-500">Recipe not found</div>;

    return (
        <div className="space-y-6">
            <button onClick={() => navigate(backPath)} className="flex items-center text-gray-500 hover:text-gray-700">
                <ChevronLeft size={20} /> {backLabel}
            </button>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="h-64 w-full bg-gray-100 relative">
                    {recipe.image ? (
                        <img src={getImageUrl(recipe.image)} alt={recipe.title} className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-4xl">🍰</div>
                    )}
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-sm font-semibold shadow-sm">
                        Status: <span className="uppercase">{recipe.status}</span>
                    </div>
                </div>

                <div className="p-8">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">{recipe.title}</h1>
                            <p className="text-gray-500">{recipe.description}</p>
                        </div>
                        <div className="flex gap-2">
                            {recipe.status === 'pending' && (
                                <>
                                    <button onClick={handleApprove} className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 font-medium">
                                        <CheckCircle size={18} /> Approve
                                    </button>
                                    <button onClick={handleReject} className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 font-medium">
                                        <XCircle size={18} /> Reject
                                    </button>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="flex gap-6 border-y border-gray-100 py-6 mb-8">
                        <div className="flex items-center gap-2 text-gray-600">
                            <Clock size={20} className="text-orange-500" />
                            <span>{recipe.cookingTime || 'N/A'}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                            <Flame size={20} className="text-red-500" />
                            <span>{recipe.difficulty || 'Medium'}</span>
                        </div>
                        <Link to={`/admin/users/${recipe.createdBy?._id}`} className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition">
                            <Users size={20} className="text-blue-500" />
                            <span>By {recipe.createdBy?.username || 'Unknown'}</span>
                        </Link>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Ingredients</h3>
                            <ul className="space-y-3">
                                {recipe.ingredients.map((ing, i) => (
                                    <li key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                        <span className="w-2 h-2 rounded-full bg-orange-400"></span>
                                        <span className="font-medium">{ing.name}</span>
                                        <span className="text-gray-500 text-sm ml-auto">{ing.quantity} {ing.unit}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Instructions</h3>
                            <div className="space-y-4">
                                {recipe.steps.map((step, i) => (
                                    <div key={i} className="flex gap-4">
                                        <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-orange-100 text-orange-600 font-bold rounded-full">
                                            {i + 1}
                                        </span>
                                        <p className="text-gray-600 leading-relaxed pt-1">{step}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminRecipeDetail;
