import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllChallengesAdmin, deleteChallenge, updateChallenge } from '../../api/challengeApi';
import { Pencil, Trash2, Plus, Calendar, Trophy, CheckCircle, XCircle } from 'lucide-react';

const AdminChallenges = () => {
    const [challenges, setChallenges] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchChallenges();
    }, []);

    const fetchChallenges = async () => {
        try {
            const data = await getAllChallengesAdmin();
            // Assuming data is array or data.data is array
            setChallenges(Array.isArray(data) ? data : data.data || []);
        } catch (error) {
            console.error("Failed to fetch challenges", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this challenge?")) return;
        try {
            await deleteChallenge(id);
            setChallenges(challenges.filter(c => c._id !== id));
        } catch (error) {
            console.error("Failed to delete challenge", error);
        }
    };

    const toggleStatus = async (challenge) => {
        try {
            const updated = await updateChallenge(challenge._id, { isActive: !challenge.isActive });
            setChallenges(challenges.map(c => c._id === challenge._id ? { ...c, isActive: !challenge.isActive } : c));
        } catch (error) {
            console.error("Failed to toggle status", error);
        }
    };

    if (loading) return <div className="text-center p-10">Loading challenges...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Challenge Management</h2>
                <Link to="/admin/create-challenge" className="flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition">
                    <Plus size={18} />
                    Create Challenge
                </Link>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 text-gray-600 text-xs uppercase font-semibold">
                            <tr>
                                <th className="px-6 py-4">Challenge</th>
                                <th className="px-6 py-4">Reward</th>
                                <th className="px-6 py-4">Schedule</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {challenges.map((challenge) => (
                                <tr key={challenge._id} className="hover:bg-gray-50/50 transition">
                                    <td className="px-6 py-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600">
                                                <Trophy size={20} />
                                            </div>
                                            <div>
                                                <div className="font-medium text-gray-900">{challenge.title}</div>
                                                <div className="text-xs text-gray-500">{challenge.scheduleType}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-3">
                                        <div className="text-sm">
                                            <span className="font-bold text-orange-600">{challenge.points} pts</span>
                                            <span className="text-gray-400 mx-1">•</span>
                                            <span className="text-gray-600 text-xs bg-gray-100 px-2 py-0.5 rounded-full">{challenge.badge?.name || 'No Badge'}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-3">
                                        <div className="flex flex-col text-xs text-gray-500">
                                            <span className="flex items-center gap-1"><Calendar size={12} /> Start: {new Date(challenge.startDate).toLocaleDateString()}</span>
                                            <span className="flex items-center gap-1"><Calendar size={12} /> End: {new Date(challenge.endDate).toLocaleDateString()}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-3">
                                        <button
                                            onClick={() => toggleStatus(challenge)}
                                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${challenge.isActive
                                                    ? 'bg-green-50 text-green-700 hover:bg-green-100'
                                                    : 'bg-red-50 text-red-700 hover:bg-red-100'
                                                }`}
                                        >
                                            {challenge.isActive ? <CheckCircle size={12} /> : <XCircle size={12} />}
                                            {challenge.isActive ? 'Active' : 'Inactive'}
                                        </button>
                                    </td>
                                    <td className="px-6 py-3">
                                        <div className="flex items-center justify-center gap-2">
                                            <Link to={`/admin/edit-challenge/${challenge._id}`} className="p-1 text-gray-400 hover:text-green-600">
                                                <Pencil size={18} />
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(challenge._id)}
                                                className="p-1 text-gray-400 hover:text-red-600"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {challenges.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="px-6 py-8 text-center text-gray-400">
                                        No challenges found. Create one to get started!
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

export default AdminChallenges;
