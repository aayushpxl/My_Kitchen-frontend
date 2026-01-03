import React, { useEffect, useState } from 'react';
import { getActiveChallenges, getMyChallenges, joinChallenge, unjoinChallenge } from '../../api/challengeApi';
import Leaderboard from '../../components/Challenge/Leaderboard';
import Button from '../../components/ui/Button';
import { Link } from 'react-router-dom';

const ChallengeList = () => {
    const [allChallenges, setAllChallenges] = useState([]);
    const [myChallenges, setMyChallenges] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [all, mine] = await Promise.all([
                getActiveChallenges(),
                getMyChallenges()
            ]);
            setAllChallenges(all);
            setMyChallenges(mine);
        } catch (error) {
            console.error("Failed to load challenges", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleJoin = async (id) => {
        try {
            await joinChallenge(id);
            fetchData(); // Refresh to update lists
        } catch (error) {
            alert(error.response?.data?.message || "Failed to join");
        }
    };

    const handleUnjoin = async (id) => {
        if (!window.confirm("Are you sure you want to unjoin? Progress will be lost.")) return;
        try {
            await unjoinChallenge(id);
            fetchData();
        } catch (error) {
            console.error("Failed to unjoin", error);
        }
    };

    // Filter available challenges (those not in myChallenges)
    const availableChallenges = allChallenges.filter(
        c => !myChallenges.some(my => my.challenge?._id === c._id && my.status !== 'completed')
    );

    if (loading) return <div className="p-8 text-center">Loading challenges...</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content Area */}
                <div className="lg:col-span-2 space-y-12">

                    {/* Your Active Challenges */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                            <span>🔥</span> Your Active Challenges
                        </h2>
                        {myChallenges.length === 0 ? (
                            <div className="bg-orange-50 p-6 rounded-2xl text-center text-orange-800 border border-orange-100">
                                You haven't joined any challenges yet. Pick one below!
                            </div>
                        ) : (
                            <div className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide">
                                {myChallenges.map(item => {
                                    if (!item.challenge) return null; // Skip if challenge data is missing
                                    return (
                                        <div key={item._id} className="min-w-[280px] bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
                                            <div className="flex justify-between items-start mb-3">
                                                <span className={`px-2 py-1 rounded text-xs font-semibold ${item.challenge.difficulty === 'Hard' ? 'bg-red-100 text-red-600' :
                                                    item.challenge.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-600' :
                                                        'bg-green-100 text-green-600'
                                                    }`}>
                                                    {item.challenge.difficulty}
                                                </span>
                                                {item.status === 'completed' && <span className="text-green-600 font-bold text-xs">COMPLETED</span>}
                                            </div>
                                            <h3 className="font-bold text-lg mb-1">{item.challenge.title}</h3>
                                            <p className="text-sm text-gray-500 mb-4 line-clamp-2">{item.challenge.description}</p>

                                            <div className="mt-auto pt-4 border-t border-gray-50 flex justify-between items-center">
                                                <div className="text-sm font-medium">
                                                    Reward: {item.challenge.points} pts
                                                </div>
                                                {item.status !== 'completed' && (
                                                    <button
                                                        onClick={() => handleUnjoin(item.challenge._id)}
                                                        className="text-red-500 text-xs hover:underline"
                                                    >
                                                        Unjoin
                                                    </button>
                                                )}
                                            </div>
                                            {item.challenge.recipe && (
                                                <Link to={`/recipes/${item.challenge.recipe._id}`} className="mt-3 block text-center bg-orange-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-orange-600">
                                                    Go to Recipe
                                                </Link>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </section>

                    {/* Available Challenges */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                            <span>🚀</span> Available Challenges
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {availableChallenges.map(challenge => (
                                <div key={challenge._id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full hover:shadow-md transition-shadow">
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="font-bold text-xl text-gray-800">{challenge.title}</h3>
                                        <div className="text-center">
                                            <div className="text-2xl">{challenge.badge?.icon || '🏆'}</div>
                                        </div>
                                    </div>
                                    <p className="text-gray-600 mb-4 flex-grow">{challenge.description}</p>

                                    <div className="flex flex-wrap gap-2 mb-6">
                                        <span className="px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-600">
                                            {challenge.difficulty}
                                        </span>
                                        <span className="px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-600">
                                            {challenge.scheduleType}
                                        </span>
                                        <span className="px-3 py-1 bg-orange-100 rounded-full text-xs text-orange-600 font-bold">
                                            {challenge.points} pts
                                        </span>
                                    </div>

                                    <Button onClick={() => handleJoin(challenge._id)} className="w-full">
                                        Join Challenge
                                    </Button>
                                </div>
                            ))}
                            {availableChallenges.length === 0 && (
                                <div className="col-span-full text-center py-12 text-gray-500">
                                    No new challenges available right now. Check back later!
                                </div>
                            )}
                        </div>
                    </section>

                </div>

                {/* Sidebar (Leaderboard) */}
                <div className="lg:col-span-1">
                    <div className="sticky top-24">
                        <Leaderboard />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChallengeList;
