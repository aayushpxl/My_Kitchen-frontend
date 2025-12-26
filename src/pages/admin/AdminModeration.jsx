import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CheckCircle, XCircle, Eye, AlertCircle, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const API_URL = 'http://localhost:5000/api/recipes';

const AdminModeration = () => {
    const [recipes, setRecipes] = useState([]);
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [rejectModalOpen, setRejectModalOpen] = useState(false);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [rejectionReason, setRejectionReason] = useState('');
    const [activeTab, setActiveTab] = useState('pending'); // pending, approved, rejected

    useEffect(() => {
        fetchRecipes();
    }, []);

    useEffect(() => {
        filterRecipes();
    }, [recipes, activeTab]);

    const fetchRecipes = async () => {
        setLoading(true);
        try {
            const token = sessionStorage.getItem('token');
            // Fetch based on active tab or all if possible. 
            // Currently assuming we can fetch all or just pending.
            // Requirement implies filtering capability.
            // Using a query param 'status' if supported, or falling back.
            // Valid statuses: 'pending', 'approved', 'rejected'

            const response = await axios.get(`${API_URL}?status=${activeTab}&limit=50`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            // If the API filters, we get filtered data. 
            // If API returns all, we filter client side.
            // Assuming API supports ?status=... from previous context or standard practice.
            // If not, we might view empty lists for non-pending if only /pending endpoint exists.
            setRecipes(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error("Failed to fetch recipes", error);
            setRecipes([]);
        } finally {
            setLoading(false);
        }
    };

    // Re-fetch when tab changes to ensure fresh data for that status
    useEffect(() => {
        fetchRecipes();
    }, [activeTab]);

    const filterRecipes = () => {
        // If API does filtering, we just use recipes. 
        // If API returns all mixed, we filter here.
        // Assuming API might return mixed if we used a generic endpoint, but here we used specific query.
        setFilteredRecipes(recipes);
    };

    const handleApprove = async (id) => {
        if (!window.confirm("Approve this recipe for public view?")) return;
        try {
            const token = sessionStorage.getItem('token');
            await axios.put(`${API_URL}/${id}/status`, { status: 'approved' }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            // Remove from local list or refetch
            setRecipes(prev => prev.filter(r => r._id !== id));
        } catch (error) {
            console.error(error);
            alert("Failed to approve");
        }
    };

    const openRejectModal = (recipe) => {
        setSelectedRecipe(recipe);
        setRejectModalOpen(true);
    };

    const handleReject = async () => {
        if (!rejectionReason.trim()) return alert("Please provide a reason");
        try {
            const token = sessionStorage.getItem('token');
            await axios.put(`${API_URL}/${selectedRecipe._id}/status`, {
                status: 'rejected',
                rejectionReason
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setRecipes(prev => prev.filter(r => r._id !== selectedRecipe._id));
            setRejectModalOpen(false);
            setRejectionReason('');
            setSelectedRecipe(null);
        } catch (error) {
            console.error(error);
            alert("Failed to reject");
        }
    };

    if (loading && recipes.length === 0) return <div className="p-8 text-center text-gray-500">Loading recipes...</div>;

    const tabs = [
        { id: 'pending', label: 'Pending', icon: <Clock size={16} /> },
        { id: 'approved', label: 'Approved', icon: <CheckCircle size={16} /> },
        { id: 'rejected', label: 'Rejected', icon: <XCircle size={16} /> },
    ];

    return (
        <div>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                    <h1 className="text-2xl font-bold text-gray-800">Moderation</h1>
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${activeTab === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                        activeTab === 'approved' ? 'bg-green-100 text-green-700' :
                            'bg-red-100 text-red-700'
                        }`}>
                        {recipes.length} {activeTab}
                    </span>
                </div>

                <div className="flex bg-gray-100 p-1 rounded-lg self-start md:self-auto">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all ${activeTab === tab.id
                                ? 'bg-white text-gray-900 shadow-sm'
                                : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            {tab.icon}
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {filteredRecipes.length === 0 ? (
                <div className="bg-white rounded-2xl p-12 text-center border border-gray-100">
                    <div className="text-4xl mb-4">✨</div>
                    <h3 className="text-lg font-medium text-gray-900">No {activeTab} recipes</h3>
                    <p className="text-gray-500">There are no recipes in this category.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {filteredRecipes.map(recipe => (
                        <div key={recipe._id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col md:flex-row items-center gap-6">
                            <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                {recipe.image ? (
                                    <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-300">🍰</div>
                                )}
                            </div>

                            <div className="flex-1 text-center md:text-left">
                                <h3 className="font-bold text-gray-900">{recipe.title}</h3>
                                <p className="text-sm text-gray-500 line-clamp-2">{recipe.description}</p>
                                <div className="mt-2 flex items-center justify-center md:justify-start gap-4 text-xs text-gray-400">
                                    <span className="flex items-center gap-1">👤 {recipe.createdBy?.username || 'Unknown'}</span>
                                    <span className="flex items-center gap-1"><Clock size={12} /> {new Date(recipe.createdAt).toLocaleDateString()}</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <Link to={`/admin/moderation/${recipe._id}`} className="p-2 text-gray-400 hover:text-blue-500 bg-gray-50 rounded-lg" title="View Details">
                                    <Eye size={20} />
                                </Link>

                                {activeTab === 'pending' && (
                                    <>
                                        <button
                                            onClick={() => handleApprove(recipe._id)}
                                            className="px-4 py-2 bg-green-50 text-green-700 hover:bg-green-100 rounded-lg flex items-center gap-2 font-medium transition"
                                        >
                                            <CheckCircle size={18} /> Approve
                                        </button>
                                        <button
                                            onClick={() => openRejectModal(recipe)}
                                            className="px-4 py-2 bg-red-50 text-red-700 hover:bg-red-100 rounded-lg flex items-center gap-2 font-medium transition"
                                        >
                                            <XCircle size={18} /> Reject
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Reject Modal */}
            {rejectModalOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl w-full max-w-md p-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Reject Recipe</h3>
                        <p className="text-gray-600 text-sm mb-4">Why are you rejecting <strong>{selectedRecipe?.title}</strong>?</p>

                        <textarea
                            className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none mb-4"
                            rows="3"
                            placeholder="Reason (e.g. Inappropriate content, Duplicate...)"
                            value={rejectionReason}
                            onChange={(e) => setRejectionReason(e.target.value)}
                        />

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setRejectModalOpen(false)}
                                className="px-4 py-2 text-gray-500 hover:bg-gray-100 rounded-lg"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleReject}
                                className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded-lg"
                            >
                                Confirm Rejection
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminModeration;
