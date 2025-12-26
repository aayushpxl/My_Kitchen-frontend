import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
    ChevronLeft, Mail, Calendar, Shield,
    Award, Zap, Utensils, Hash, CheckCircle,
    TrendingUp, Clock, MapPin, Phone
} from 'lucide-react';

const AdminUserDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = sessionStorage.getItem('token');
                const res = await axios.get(`http://localhost:5000/api/users/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUser(res.data);
            } catch (err) {
                console.error(err);
                setError("Failed to load user details.");
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, [id]);

    if (loading) return (
        <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
        </div>
    );

    if (error) return <div className="p-8 text-center text-red-500 font-medium">{error}</div>;

    return (
        <div className="max-w-5xl mx-auto pb-12">
            {/* Header Navigation */}
            <button
                onClick={() => navigate(-1)}
                className="group flex items-center gap-2 text-gray-400 hover:text-orange-600 transition-colors mb-6 font-semibold"
            >
                <div className="p-2 bg-white rounded-xl shadow-sm group-hover:bg-orange-50 transition-colors">
                    <ChevronLeft size={18} />
                </div>
                Back to Community
            </button>

            {/* Profile Hero Card */}
            <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden mb-8">
                {/* Banner */}
                <div className="h-48 bg-gradient-to-r from-orange-400 via-orange-500 to-red-500 relative">
                    <div className="absolute inset-0 bg-black/5"></div>
                </div>

                <div className="px-10 pb-10">
                    <div className="relative flex flex-col md:flex-row justify-between items-end -mt-16 gap-6">
                        <div className="flex flex-col md:flex-row items-end gap-6">
                            {/* Avatar */}
                            <div className="w-32 h-32 rounded-[2rem] bg-white p-1.5 shadow-xl">
                                <div className="w-full h-full rounded-[1.8rem] bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center text-4xl font-black text-orange-600 overflow-hidden uppercase">
                                    {user.profilePic ? (
                                        <img src={`http://localhost:5000${user.profilePic}`} alt={user.username} className="w-full h-full object-cover" />
                                    ) : (
                                        user.username.charAt(0)
                                    )}
                                </div>
                            </div>

                            <div className="mb-2">
                                <div className="flex items-center gap-3">
                                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">{user.username}</h1>
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase border ${user.role === 'admin'
                                            ? 'bg-purple-50 text-purple-600 border-purple-100'
                                            : 'bg-blue-50 text-blue-600 border-blue-100'
                                        }`}>
                                        {user.role}
                                    </span>
                                </div>
                                <div className="flex items-center gap-4 mt-1 text-gray-500 font-medium">
                                    <span className="flex items-center gap-1.5 text-sm">
                                        <Calendar size={14} className="text-orange-500" />
                                        Joined {new Date(user.createdAt).toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}
                                    </span>
                                    <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                    <span className="flex items-center gap-1.5 text-sm uppercase tracking-tighter font-bold">
                                        <Hash size={14} className="text-orange-500" />
                                        ID: {id.slice(-6)}
                                    </span>
                                    {user.location && (
                                        <>
                                            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                            <span className="flex items-center gap-1.5 text-sm font-medium">
                                                <MapPin size={14} className="text-orange-500" />
                                                {user.location}
                                            </span>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3 mb-2">
                            <button className="px-6 py-3 bg-gray-900 text-white rounded-2xl font-bold text-sm hover:bg-gray-800 transition-all active:scale-95 shadow-lg shadow-gray-200">
                                Edit Profile
                            </button>
                            <button className="p-3 bg-red-50 text-red-500 rounded-2xl font-bold hover:bg-red-100 transition-all active:scale-95 border border-red-100">
                                <Shield size={20} />
                            </button>
                        </div>
                    </div>

                    {/* Quick Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
                        <UserMetricCard icon={<Utensils size={18} />} label="Recipes" value={user.publishedRecipes || 0} color="text-blue-600" bg="bg-blue-50" />
                        <UserMetricCard icon={<Zap size={18} />} label="Challenges" value={user.joinedChallenges || 0} color="text-orange-600" bg="bg-orange-50" />
                        <UserMetricCard icon={<Award size={18} />} label="Points" value={user.totalPoints || 0} color="text-amber-600" bg="bg-amber-50" />
                        <UserMetricCard icon={<CheckCircle size={18} />} label="Finished" value={user.completedChallenges || 0} color="text-emerald-600" bg="bg-emerald-50" />
                    </div>
                </div>
            </div>

            {/* Bottom Content Sections */}
            <div className="grid md:grid-cols-3 gap-8">
                {/* Left Col: Info */}
                <div className="md:col-span-1 space-y-6">
                    <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
                        <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <Mail size={18} className="text-orange-500" />
                            Contact Details
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <label className="text-[10px] uppercase font-black text-gray-400 tracking-widest">Email Address</label>
                                <p className="text-gray-700 font-semibold truncate">{user.email}</p>
                            </div>
                            {user.phoneNumber && (
                                <div>
                                    <label className="text-[10px] uppercase font-black text-gray-400 tracking-widest">Phone Number</label>
                                    <p className="text-gray-700 font-semibold flex items-center gap-2">
                                        <Phone size={14} className="text-gray-400" />
                                        {user.phoneNumber}
                                    </p>
                                </div>
                            )}
                            <div>
                                <label className="text-[10px] uppercase font-black text-gray-400 tracking-widest">Account Status</label>
                                <div className="flex items-center gap-2 mt-1">
                                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                    <p className="text-gray-700 font-semibold">Verified Member</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {user.bio && (
                        <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm mt-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Award size={18} className="text-orange-500" />
                                About Chef
                            </h3>
                            <p className="text-gray-600 leading-relaxed italic text-sm">
                                "{user.bio}"
                            </p>
                        </div>
                    )}
                </div>

                {/* Right Col: Activity/Badges Preview */}
                <div className="md:col-span-2 space-y-6">
                    <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                <TrendingUp size={18} className="text-orange-500" />
                                Recent Activity
                            </h3>
                            <button className="text-xs font-bold text-orange-600 hover:underline">View All</button>
                        </div>

                        {/* Empty Activity State */}
                        <div className="flex flex-col items-center justify-center py-10 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                            <Clock size={32} className="text-gray-300 mb-2" />
                            <p className="text-sm text-gray-400 font-medium">No recent actions recorded.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Helper Stat Card
const UserMetricCard = ({ icon, label, value, color, bg }) => (
    <div className={`${bg} p-5 rounded-[1.5rem] border border-white shadow-sm flex items-center gap-4 group hover:-translate-y-1 transition-all duration-300`}>
        <div className={`w-10 h-10 rounded-xl bg-white flex items-center justify-center ${color} shadow-sm group-hover:scale-110 transition-transform`}>
            {icon}
        </div>
        <div>
            <div className={`text-xl font-black text-gray-900 leading-none`}>{value}</div>
            <div className="text-[10px] uppercase font-bold text-gray-400 mt-1 tracking-tight">{label}</div>
        </div>
    </div>
);

export default AdminUserDetail;