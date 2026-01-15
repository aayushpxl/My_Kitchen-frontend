import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createChallenge, getChallengeById, updateChallenge } from '../../api/challengeApi';
import { getAllRecipes } from '../../api/recipeApi';
import Button from '../../components/ui/Button';

const CreateChallenge = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditMode = !!id;

    const [loading, setLoading] = useState(false);
    const [recipes, setRecipes] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        recipe: '', // Recipe ID
        difficulty: 'Medium',
        points: 50,
        scheduleType: 'weekly',
        startDate: '',
        endDate: '',
        category: 'Cooking',
        badgeName: '',
        badgeIcon: '🏆'
    });

    useEffect(() => {
        // Load recipes for dropdown
        getAllRecipes().then(setRecipes).catch(console.error);

        if (isEditMode) {
            getChallengeById(id).then(data => {
                const challenge = data.data || data; // Handle potential API response wrapper
                setFormData({
                    title: challenge.title,
                    description: challenge.description,
                    recipe: challenge.recipe?._id || challenge.recipe,
                    difficulty: challenge.difficulty || 'Medium',
                    points: challenge.points,
                    scheduleType: challenge.scheduleType,
                    startDate: challenge.startDate ? new Date(challenge.startDate).toISOString().split('T')[0] : '',
                    endDate: challenge.endDate ? new Date(challenge.endDate).toISOString().split('T')[0] : '',
                    category: challenge.category || 'Cooking',
                    badgeName: challenge.badge?.name || '',
                    badgeIcon: challenge.badge?.icon || '🏆'
                });
            }).catch(console.error);
        }
    }, [id, isEditMode]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const payload = {
            title: formData.title,
            description: formData.description,
            recipe: formData.recipe,
            difficulty: formData.difficulty,
            points: Number(formData.points),
            scheduleType: formData.scheduleType,
            startDate: formData.startDate,
            endDate: formData.endDate,
            category: formData.category,
            badge: {
                name: formData.badgeName,
                icon: formData.badgeIcon
            }
        };

        try {
            if (isEditMode) {
                await updateChallenge(id, payload);
            } else {
                await createChallenge(payload);
            }
            navigate('/admin/challenges');
        } catch (error) {
            console.error("Failed to save challenge", error);
            alert("Failed to save challenge");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">{isEditMode ? 'Edit Challenge' : 'Create New Challenge'}</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Challenge Title</label>
                    <input
                        type="text"
                        name="title"
                        required
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="e.g. Pancake Master"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                        name="description"
                        required
                        rows="3"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="Explain the challenge..."
                    ></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Target Recipe</label>
                        <select
                            name="recipe"
                            required
                            value={formData.recipe}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        >
                            <option value="">Select a recipe...</option>
                            {recipes.map(recipe => (
                                <option key={recipe._id} value={recipe._id}>{recipe.title}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Points Reward</label>
                        <input
                            type="number"
                            name="points"
                            required
                            value={formData.points}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                        <select
                            name="category"
                            required
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        >
                            <option value="Trending">Trending</option>
                            <option value="Cooking">Cooking</option>
                            <option value="Baking">Baking</option>
                            <option value="Healthy">Healthy</option>
                            <option value="Quick Meals">Quick Meals</option>
                            <option value="Seasonal">Seasonal</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
                        <select
                            name="difficulty"
                            value={formData.difficulty}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        >
                            <option value="Easy">Easy</option>
                            <option value="Medium">Medium</option>
                            <option value="Hard">Hard</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Schedule Type</label>
                        <select
                            name="scheduleType"
                            value={formData.scheduleType}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        >
                            <option value="daily">Daily</option>
                            <option value="weekly">Weekly</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                        <input
                            type="date"
                            name="startDate"
                            required
                            value={formData.startDate}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                        <input
                            type="date"
                            name="endDate"
                            required
                            value={formData.endDate}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                    </div>
                </div>

                <div className="border-t border-gray-100 pt-6">
                    <h3 className="text-sm font-medium text-gray-900 mb-3">Badge Reward</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Badge Name</label>
                            <input
                                type="text"
                                name="badgeName"
                                required
                                value={formData.badgeName}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                placeholder="e.g. Breakfast King"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Badge Icon (Emoji)</label>
                            <input
                                type="text"
                                name="badgeIcon"
                                value={formData.badgeIcon}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                placeholder="🏆"
                            />
                        </div>
                    </div>
                </div>

                <div className="pt-4 flex gap-4">
                    <Button type="button" onClick={() => navigate('/admin/challenges')} className="flex-1 bg-gray-100 text-gray-700 hover:bg-gray-200">
                        Cancel
                    </Button>
                    <Button type="submit" disabled={loading} className="flex-1">
                        {loading ? 'Saving...' : 'Save Challenge'}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default CreateChallenge;
