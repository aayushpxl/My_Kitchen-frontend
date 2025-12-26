import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import adminService from '../../services/adminService';
import { Search, Mail, Trophy, Star, Shield } from 'lucide-react';

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {
        if (!searchTerm) {
            setFilteredUsers(users);
        } else {
            const lower = searchTerm.toLowerCase();
            setFilteredUsers(users.filter(u =>
                u.username.toLowerCase().includes(lower) ||
                u.email.toLowerCase().includes(lower)
            ));
        }
    }, [searchTerm, users]);

    const fetchUsers = async () => {
        try {
            const data = await adminService.getAllUsers();
            setUsers(data);
            setFilteredUsers(data);
        } catch (error) {
            console.error("Failed to fetch users", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="text-center p-10">Loading users...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">User Management</h2>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gray-50 flex items-center gap-4">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search users..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 text-gray-600 text-xs uppercase font-semibold">
                            <tr>
                                <th className="px-6 py-4">User</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Engagement</th>
                                <th className="px-6 py-4">Joined</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredUsers.map((user) => (
                                <tr key={user._id} className="hover:bg-gray-50/50 transition">
                                    <td className="px-6 py-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold border border-orange-200">
                                                {user.username.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <Link to={`/admin/users/${user._id}`} className="font-medium text-gray-900 hover:text-orange-600 hover:underline">{user.username}</Link>
                                                <div className="text-xs text-gray-500 flex items-center gap-1">
                                                    <Mail size={10} /> {user.email}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-3">
                                        <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-50 text-green-700">
                                            Active
                                        </span>
                                    </td>
                                    <td className="px-6 py-3">
                                        <div className="flex gap-4 text-xs">
                                            <div className="flex flex-col items-center">
                                                <span className="font-bold text-gray-800">{user.joinedChallenges}</span>
                                                <span className="text-gray-400">Joined</span>
                                            </div>
                                            <div className="flex flex-col items-center">
                                                <span className="font-bold text-green-600">{user.completedChallenges}</span>
                                                <span className="text-gray-400">Completed</span>
                                            </div>
                                            <div className="flex flex-col items-center">
                                                <span className="font-bold text-orange-600 flex items-center gap-0.5">
                                                    {user.totalPoints} <Star size={10} fill="currentColor" />
                                                </span>
                                                <span className="text-gray-400">Points</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-3 text-sm text-gray-500">
                                        {new Date(user.createdAt).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminUsers;
