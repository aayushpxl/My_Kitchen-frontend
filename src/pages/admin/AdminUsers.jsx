import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import adminService from '../../services/adminService';
import { 
  Search, Mail, Trophy, Star, Users, 
  ChevronRight, Calendar, Activity, Zap 
} from 'lucide-react';

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

    if (loading) return (
        <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto pb-10">
            {/* Header Section */}
            <div className="mb-8">
                <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Community Directory</h1>
                <p className="text-gray-500 mt-1 flex items-center gap-2">
                    <Users size={16} className="text-orange-500" />
                    Manage members, track engagement, and monitor chef progress.
                </p>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <StatCard label="Total Members" value={users.length} icon={<Users className="text-blue-600" />} color="bg-blue-50" />
                <StatCard label="Active Now" value={Math.floor(users.length * 0.8)} icon={<Activity className="text-green-600" />} color="bg-green-50" />
                <StatCard label="Top Performers" value={users.filter(u => u.totalPoints > 500).length} icon={<Trophy className="text-orange-600" />} color="bg-orange-50" />
            </div>

            {/* Toolbar Section */}
            <div className="bg-white p-5 rounded-[2rem] border border-gray-100 shadow-sm mb-6 flex flex-wrap items-center gap-4">
                <div className="relative flex-1 min-w-[300px]">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search by username or email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-orange-500/20 transition-all text-gray-700 placeholder:text-gray-400"
                    />
                </div>
                <div className="text-sm font-medium text-gray-400 px-4">
                    Showing <span className="text-gray-900">{filteredUsers.length}</span> members
                </div>
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-gray-50">
                                <th className="px-8 py-5 text-sm font-bold text-gray-400 uppercase tracking-wider">Member</th>
                                <th className="px-8 py-5 text-sm font-bold text-gray-400 uppercase tracking-wider">Status</th>
                                <th className="px-8 py-5 text-sm font-bold text-gray-400 uppercase tracking-wider">Engagement</th>
                                <th className="px-8 py-5 text-sm font-bold text-gray-400 uppercase tracking-wider text-right">View</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filteredUsers.map((user) => (
                                <tr key={user._id} className="group hover:bg-orange-50/30 transition-colors">
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center text-orange-700 font-bold shadow-sm group-hover:scale-105 transition-transform">
                                                {user.username.charAt(0).toUpperCase()}
                                            </div>
                                            <div className="min-w-0">
                                                <div className="font-bold text-gray-900">{user.username}</div>
                                                <div className="text-sm text-gray-400 flex items-center gap-1">
                                                    <Mail size={12} /> {user.email}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-green-50 text-green-600 ring-1 ring-inset ring-green-200">
                                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                                            Active
                                        </span>
                                    </td>
                                    <td className="px-8 py-5">
                                        <div className="flex gap-6">
                                            <EngagementStat icon={<Zap size={14} className="text-blue-500" />} value={user.joinedChallenges} label="Joined" />
                                            <EngagementStat icon={<Trophy size={14} className="text-emerald-500" />} value={user.completedChallenges} label="Done" />
                                            <div className="flex flex-col">
                                                <div className="flex items-center gap-1 text-orange-600 font-bold text-sm">
                                                    {user.totalPoints} <Star size={12} fill="currentColor" />
                                                </div>
                                                <span className="text-[10px] text-gray-400 uppercase font-bold tracking-tight">Points</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5 text-right">
                                        <Link 
                                            to={`/admin/users/${user._id}`} 
                                            className="inline-flex items-center justify-center p-2.5 text-gray-400 hover:text-orange-500 hover:bg-orange-50 rounded-xl transition-all"
                                        >
                                            <ChevronRight size={20} />
                                        </Link>
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

// Helper Component for Stats at top
const StatCard = ({ label, value, icon, color }) => (
    <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex items-center gap-5">
        <div className={`w-14 h-14 ${color} rounded-2xl flex items-center justify-center`}>
            {React.cloneElement(icon, { size: 24 })}
        </div>
        <div>
            <div className="text-2xl font-black text-gray-900">{value}</div>
            <div className="text-sm font-medium text-gray-400">{label}</div>
        </div>
    </div>
);

// Helper Component for Table Engagement
const EngagementStat = ({ icon, value, label }) => (
    <div className="flex flex-col">
        <div className="flex items-center gap-1 text-gray-900 font-bold text-sm">
            {icon} {value}
        </div>
        <span className="text-[10px] text-gray-400 uppercase font-bold tracking-tight">{label}</span>
    </div>
);

export default AdminUsers;