import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { 
  CheckCircle, XCircle, Eye, Clock, 
  ShieldCheck, Inbox, ArrowRight, MessageSquare 
} from 'lucide-react';
import { Link } from 'react-router-dom';

const API_URL = 'http://localhost:5000/api/recipes';

const AdminModeration = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [rejectModalOpen, setRejectModalOpen] = useState(false);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [rejectionReason, setRejectionReason] = useState('');
    const [activeTab, setActiveTab] = useState('pending');

    const tabs = [
        { id: 'pending', label: 'Pending Review', icon: <Clock size={16} />, color: 'text-amber-500', bg: 'bg-amber-50' },
        { id: 'approved', label: 'Approved', icon: <CheckCircle size={16} />, color: 'text-emerald-500', bg: 'bg-emerald-50' },
        { id: 'rejected', label: 'Rejected', icon: <XCircle size={16} />, color: 'text-rose-500', bg: 'bg-rose-50' },
    ];

    const fetchRecipes = async () => {
        setLoading(true);
        try {
            const token = sessionStorage.getItem('token');
            const response = await axios.get(`${API_URL}?status=${activeTab}&limit=50`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setRecipes(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error("Failed to fetch recipes", error);
            setRecipes([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchRecipes(); }, [activeTab]);

    const handleApprove = async (id) => {
        try {
            const token = sessionStorage.getItem('token');
            await axios.put(`${API_URL}/${id}/status`, { status: 'approved' }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setRecipes(prev => prev.filter(r => r._id !== id));
        } catch (error) {
            alert("Failed to approve");
        }
    };

    const handleReject = async () => {
        if (!rejectionReason.trim()) return alert("Please provide a reason");
        try {
            const token = sessionStorage.getItem('token');
            await axios.put(`${API_URL}/${selectedRecipe._id}/status`, {
                status: 'rejected',
                rejectionReason
            }, { headers: { Authorization: `Bearer ${token}` } });
            setRecipes(prev => prev.filter(r => r._id !== selectedRecipe._id));
            setRejectModalOpen(false);
            setRejectionReason('');
        } catch (error) {
            alert("Failed to reject");
        }
    };

    return (
        <div className="max-w-6xl mx-auto pb-12">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                        <ShieldCheck className="text-orange-500" size={32} />
                        Quality Control
                    </h1>
                    <p className="text-gray-500 mt-1 font-medium">Review and moderate community submissions</p>
                </div>

                {/* Glassmorphism Tabs */}
                <div className="flex bg-gray-100/80 backdrop-blur-md p-1.5 rounded-2xl border border-gray-200">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-bold transition-all ${
                                activeTab === tab.id
                                    ? 'bg-white text-gray-900 shadow-sm ring-1 ring-gray-200'
                                    : 'text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            {activeTab === tab.id ? tab.icon : null}
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-20">
                    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-orange-500 mb-4"></div>
                    <p className="text-gray-400 font-medium">Fetching submissions...</p>
                </div>
            ) : recipes.length === 0 ? (
                <div className="bg-white rounded-[2.5rem] p-20 text-center border border-gray-100 shadow-sm">
                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Inbox size={40} className="text-gray-200" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Queue is empty!</h3>
                    <p className="text-gray-500 max-w-xs mx-auto mt-2 font-medium">
                        No recipes are currently {activeTab}. Check back later for new community content.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {recipes.map(recipe => (
                        <div key={recipe._id} className="group bg-white p-5 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row items-center gap-6">
                            {/* Recipe Image */}
                            <div className="w-full md:w-32 h-32 bg-gray-100 rounded-[1.5rem] overflow-hidden flex-shrink-0 relative">
                                {recipe.image ? (
                                    <img src={recipe.image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-3xl">🥘</div>
                                )}
                                <div className="absolute top-2 right-2 px-2 py-1 bg-white/90 backdrop-blur-sm rounded-lg text-[10px] font-black uppercase tracking-tight">
                                    {recipe.category || 'Recipe'}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                                <div className="flex flex-wrap items-center gap-2 mb-1">
                                    <h3 className="font-black text-gray-900 text-lg truncate">{recipe.title}</h3>
                                </div>
                                <p className="text-sm text-gray-500 line-clamp-2 mb-4 font-medium leading-relaxed">
                                    {recipe.description}
                                </p>
                                
                                <div className="flex flex-wrap items-center gap-4">
                                    <div className="flex items-center gap-2 px-3 py-1 bg-gray-50 rounded-full text-[11px] font-bold text-gray-500 border border-gray-100">
                                        <div className="w-5 h-5 rounded-full bg-orange-100 flex items-center justify-center text-[10px] text-orange-600 font-black">
                                            {recipe.createdBy?.username?.charAt(0).toUpperCase()}
                                        </div>
                                        {recipe.createdBy?.username}
                                    </div>
                                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-gray-400 uppercase tracking-tight">
                                        <Clock size={12} />
                                        {new Date(recipe.createdAt).toLocaleDateString()}
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center gap-2 w-full md:w-auto border-t md:border-t-0 pt-4 md:pt-0">
                                <Link to={`/admin/moderation/${recipe._id}`} className="flex-1 md:flex-none p-3 text-gray-400 hover:text-orange-500 bg-gray-50 hover:bg-orange-50 rounded-2xl transition-all flex justify-center">
                                    <Eye size={22} />
                                </Link>

                                {activeTab === 'pending' && (
                                    <>
                                        <button
                                            onClick={() => handleApprove(recipe._id)}
                                            className="flex-[2] md:flex-none px-6 py-3 bg-emerald-500 text-white rounded-2xl flex items-center justify-center gap-2 text-sm font-bold hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-100 active:scale-95"
                                        >
                                            <CheckCircle size={18} /> Approve
                                        </button>
                                        <button
                                            onClick={() => { setSelectedRecipe(recipe); setRejectModalOpen(true); }}
                                            className="flex-[2] md:flex-none px-6 py-3 bg-white text-rose-500 border border-rose-100 rounded-2xl flex items-center justify-center gap-2 text-sm font-bold hover:bg-rose-50 transition-all active:scale-95"
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

            {/* Premium Reject Modal */}
            {rejectModalOpen && (
                <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-6">
                    <div className="bg-white rounded-[2.5rem] w-full max-w-md p-8 shadow-2xl border border-white animate-in zoom-in duration-200">
                        <div className="w-16 h-16 bg-rose-50 rounded-2xl flex items-center justify-center mb-6 text-rose-500">
                            <AlertCircle size={32} />
                        </div>
                        <h3 className="text-2xl font-black text-gray-900 mb-2">Refuse Submission</h3>
                        <p className="text-gray-500 text-sm font-medium mb-6">
                            This feedback will be sent to <span className="text-gray-900 font-bold">@{selectedRecipe?.createdBy?.username}</span> to help them improve.
                        </p>

                        <div className="relative mb-6">
                            <MessageSquare className="absolute left-4 top-4 text-gray-300" size={20} />
                            <textarea
                                className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-rose-500 transition-all text-sm font-medium placeholder:text-gray-400"
                                rows="4"
                                placeholder="Explain why this recipe isn't ready..."
                                value={rejectionReason}
                                onChange={(e) => setRejectionReason(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col gap-3">
                            <button
                                onClick={handleReject}
                                className="w-full py-4 bg-rose-500 text-white rounded-2xl font-bold text-sm shadow-lg shadow-rose-200 hover:bg-rose-600 transition-all active:scale-95"
                            >
                                Send Rejection
                            </button>
                            <button
                                onClick={() => setRejectModalOpen(false)}
                                className="w-full py-4 text-gray-400 font-bold text-sm hover:text-gray-600 transition-all"
                            >
                                Back to Queue
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminModeration;