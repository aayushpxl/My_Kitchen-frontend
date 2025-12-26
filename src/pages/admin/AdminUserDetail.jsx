import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ChevronLeft, Mail, Calendar, MapPin, Shield } from 'lucide-react';

const AdminUserDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem('token');
                // Assuming we can fetch user by ID. If not, we might need a specific admin endpoint or search.
                // Standard REST pattern is /users/:id
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

    if (loading) return <div className="p-8 text-center text-gray-500">Loading user...</div>;
    if (error) return <div className="p-8 text-center text-red-500">{error}</div>;
    if (!user) return <div className="p-8 text-center text-gray-500">User not found</div>;

    return (
        <div className="space-y-6">
            <button onClick={() => navigate(-1)} className="flex items-center text-gray-500 hover:text-gray-700">
                <ChevronLeft size={20} /> Back
            </button>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="h-32 bg-gradient-to-r from-orange-400 to-red-500"></div>
                <div className="px-8 pb-8">
                    <div className="relative flex justify-between items-end -mt-12 mb-6">
                        <div className="flex items-end gap-6">
                            <div className="w-24 h-24 rounded-full bg-white p-1 shadow-md">
                                <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center text-2xl font-bold text-gray-500 uppercase overflow-hidden">
                                    {user.profilePicture ? (
                                        <img src={user.profilePicture} alt={user.username} className="w-full h-full object-cover" />
                                    ) : (
                                        user.username.charAt(0)
                                    )}
                                </div>
                            </div>
                            <div className="mb-1">
                                <h1 className="text-2xl font-bold text-gray-900">{user.username}</h1>
                                <p className="text-gray-500">Member since {new Date(user.createdAt).toLocaleDateString()}</p>
                            </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold capitalize ${user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'
                            }`}>
                            {user.role}
                        </span>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <h3 className="text-lg font-bold text-gray-900 border-b pb-2">Contact Info</h3>
                            <div className="flex items-center gap-3 text-gray-600">
                                <Mail size={18} />
                                <span>{user.email}</span>
                            </div>
                            {/* Add more fields if available in model */}
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-lg font-bold text-gray-900 border-b pb-2">Account Status</h3>
                            <div className="flex items-center gap-3 text-gray-600">
                                <Shield size={18} />
                                <span>Role: {user.role}</span>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-lg text-center mt-4">
                                <p className="text-2xl font-bold text-orange-600">{user.publishedRecipes || 0}</p>
                                <p className="text-xs text-gray-500 uppercase font-semibold">Recipes Published</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminUserDetail;
