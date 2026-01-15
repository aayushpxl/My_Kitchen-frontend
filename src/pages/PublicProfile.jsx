import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/common/Navbar';
import { BookOpen, MapPin, Calendar, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getImageUrl } from '../utils/imageUtils';

const PublicProfile = () => {
    const { id } = useParams();
    const [profile, setProfile] = useState(null);
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                // Fetch basic user info
                // We might need a new endpoint for public user profile if /auth/me is definitely private/self only.
                // Assuming we don't have one, we'll try to fetch basic info + recipes.
                // Actually, let's assume we can fetch recipes by user ID.
                // And maybe we need to create a `getUserProfile` endpoint? 
                // For now, I'll allow fetching user details if I'm authenticated.

                // Since we don't have a dedicated "get public user info" endpoint yet, 
                // I will modify the backend to support this, or reuse what we can.
                // For now, let's fetch the recipes first which contains the user's name in `createdBy`.

                // Actually, I'll create a new endpoint in backend: GET /api/users/:id/profile

                const res = await axios.get(`http://localhost:5000/api/users/${id}/profile`);
                setProfile(res.data.user);
                setRecipes(res.data.recipes);
            } catch (err) {
                console.error(err);
                setError("User not found");
            } finally {
                setLoading(false);
            }
        };

        fetchProfileData();
    }, [id]);

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    if (error) return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;

    return (
        <div className="min-h-screen bg-gray-50 pt-20">
            <Navbar />

            <div className="bg-white border-b border-gray-200">
                <div className="max-w-6xl mx-auto px-4 py-12 flex flex-col md:flex-row items-center gap-8">
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg bg-orange-100">
                        <img
                            src={profile.profilePic ? `http://localhost:5000${profile.profilePic}` : `https://ui-avatars.com/api/?name=${profile.username}&background=orange&color=fff&size=200`}
                            alt={profile.username}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="text-center md:text-left">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">{profile.username}</h1>
                        <div className="flex flex-wrap justify-center md:justify-start gap-4 text-gray-500 text-sm">
                            <span className="flex items-center gap-1"><User size={16} /> {profile.role === 'admin' ? 'Master Chef' : 'Home Chef'}</span>
                            {profile.location && (
                                <span className="flex items-center gap-1"><MapPin size={16} /> {profile.location}</span>
                            )}
                            <span className="flex items-center gap-1"><Calendar size={16} /> Joined {new Date(profile.createdAt).getFullYear()}</span>
                        </div>
                        {profile.bio && (
                            <p className="mt-4 text-gray-600 max-w-xl italic">
                                "{profile.bio}"
                            </p>
                        )}
                    </div>
                    <div className="ml-auto flex gap-4">
                        <div className="text-center px-6 py-2 bg-orange-50 rounded-xl border border-orange-100">
                            <div className="text-2xl font-bold text-orange-600">{recipes.length}</div>
                            <div className="text-xs text-orange-600 font-medium uppercase tracking-wide">Recipes</div>
                        </div>
                        <div className="text-center px-6 py-2 bg-blue-50 rounded-xl border border-blue-100">
                            <div className="text-2xl font-bold text-blue-600">{profile.badges?.length || 0}</div>
                            <div className="text-xs text-blue-600 font-medium uppercase tracking-wide">Badges</div>
                        </div>
                        <div className="hidden md:block text-center px-6 py-2 bg-green-50 rounded-xl border border-green-100">
                            <div className="text-2xl font-bold text-green-600">{profile.points || 0}</div>
                            <div className="text-xs text-green-600 font-medium uppercase tracking-wide">Points</div>
                        </div>
                    </div>
                </div>
            </div>

            <main className="max-w-6xl mx-auto px-4 py-12 flex flex-col md:flex-row gap-12">
                {/* Achievements Sidebar */}
                <div className="w-full md:w-72 flex-shrink-0">
                    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm sticky top-28">
                        <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <span>🏆</span> Achievements
                        </h3>

                        {profile.badges?.length > 0 ? (
                            <div className="grid grid-cols-2 gap-4">
                                {profile.badges.map((badge, idx) => (
                                    <div key={idx} className="flex flex-col items-center bg-gray-50 p-3 rounded-xl border border-gray-100 group/badge hover:bg-orange-50 hover:border-orange-200 transition-all">
                                        <span className="text-3xl mb-1 filter group-hover/badge:drop-shadow-sm">{badge.icon}</span>
                                        <span className="text-[10px] text-center font-bold text-gray-700 uppercase tracking-tighter leading-tight">{badge.name}</span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-6 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                                <p className="text-xs text-gray-400 font-medium">No badges earned yet</p>
                            </div>
                        )}

                        <div className="mt-8 pt-6 border-t border-gray-100">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Cooking Level</span>
                                <span className="text-xs font-black text-orange-500">{profile.points >= 100 ? 'Master Chef' : 'Rising Star'}</span>
                            </div>
                            <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                                <div
                                    className="bg-orange-500 h-full transition-all duration-1000"
                                    style={{ width: `${Math.min((profile.points || 0) / 5, 100)}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recipes Feed */}
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-8">
                        <BookOpen className="text-orange-600" />
                        <h2 className="text-xl font-bold text-gray-900">Published Recipes</h2>
                    </div>

                    {recipes.length === 0 ? (
                        <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
                            <div className="text-4xl mb-4">🍳</div>
                            <h3 className="text-lg font-medium text-gray-900">No public recipes yet</h3>
                            <p className="text-gray-500">This chef is cooking up something special.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {recipes.map(recipe => (
                                <Link key={recipe._id} to={`/recipes/${recipe._id}`} className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300">
                                    <div className="h-48 overflow-hidden relative">
                                        <img
                                            src={getImageUrl(recipe.image)}
                                            alt={recipe.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur px-2 py-1 rounded-lg text-xs font-semibold shadow-sm text-gray-700">
                                            {recipe.difficulty || 'Medium'}
                                        </div>
                                    </div>
                                    <div className="p-5">
                                        <h3 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-orange-600 transition-colors line-clamp-1">{recipe.title}</h3>
                                        <p className="text-gray-500 text-sm line-clamp-2 mb-4">{recipe.description}</p>
                                        <div className="flex items-center justify-between text-xs text-gray-400 border-t border-gray-50 pt-4">
                                            <span>{recipe.cookingTime || '45 mins'}</span>
                                            <span className="text-orange-500 font-medium">View Recipe →</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default PublicProfile;
