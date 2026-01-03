import React, { useEffect, useState } from 'react';
import { getLeaderboard } from '../../api/challengeApi';

const Leaderboard = () => {
    const [leaders, setLeaders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getLeaderboard()
            .then(data => {
                setLeaders(data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Failed to fetch leaderboard", error);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="text-center p-4">Loading leaderboard...</div>;
    if (leaders.length === 0) return null; // Don't show if empty

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-xl">🏆</span> Leaderboard
            </h3>
            <div className="space-y-4">
                {leaders.map((user, index) => (
                    <div key={user._id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-orange-50 transition-colors">
                        <div className="flex-shrink-0 w-8 text-center font-bold text-gray-400">
                            {index + 1}
                        </div>
                        <img
                            src={user.profilePic || "https://ui-avatars.com/api/?name=" + user.username}
                            alt={user.username}
                            className="w-10 h-10 rounded-full object-cover border-2 border-orange-100"
                        />
                        <div className="flex-1">
                            <h4 className="font-semibold text-gray-800">{user.username}</h4>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                <span>{user.badges?.length || 0} Badges</span>
                            </div>
                        </div>
                        <div className="text-orange-600 font-bold">
                            {user.points} pts
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Leaderboard;
