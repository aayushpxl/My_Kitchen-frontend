import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Button from '../../components/ui/Button';

const AddRecipe = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // Get ID if editing
    const isEditing = !!id;

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        image: '',
        cookingTime: '',
        difficulty: 'Medium',
        isPrivate: false,
        nutrition: {
            calories: '',
            protein: '',
            carbs: '',
            fat: ''
        }
    });

    const [ingredients, setIngredients] = useState([
        { name: '', quantity: '', unit: '' }
    ]);

    const [steps, setSteps] = useState(['']);

    useEffect(() => {
        if (isEditing) {
            fetchRecipe();
        }
    }, [id]);

    const fetchRecipe = async () => {
        try {
            const token = sessionStorage.getItem('token');
            const res = await axios.get(`http://localhost:5000/api/recipes/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const recipe = res.data;

            setFormData({
                title: recipe.title,
                description: recipe.description,
                image: recipe.image,
                cookingTime: recipe.cookingTime || '',
                difficulty: recipe.difficulty || 'Medium',
                isPrivate: recipe.status === 'private',
                nutrition: recipe.nutrition || { calories: '', protein: '', carbs: '', fat: '' }
            });
            setIngredients(recipe.ingredients || []);
            setSteps(recipe.steps || []);
        } catch (err) {
            console.error(err);
            setError("Failed to load recipe for editing");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith('nutrition.')) {
            const field = name.split('.')[1];
            setFormData(prev => ({
                ...prev,
                nutrition: { ...prev.nutrition, [field]: value }
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    // Ingredient Handlers
    const handleIngredientChange = (index, field, value) => {
        const newIngredients = [...ingredients];
        newIngredients[index][field] = value;
        setIngredients(newIngredients);
    };

    const addIngredient = () => {
        setIngredients([...ingredients, { name: '', quantity: '', unit: '' }]);
    };

    const removeIngredient = (index) => {
        if (ingredients.length > 1) {
            setIngredients(ingredients.filter((_, i) => i !== index));
        }
    };

    // Step Handlers
    const handleStepChange = (index, value) => {
        const newSteps = [...steps];
        newSteps[index] = value;
        setSteps(newSteps);
    };

    const addStep = () => {
        setSteps([...steps, '']);
    };

    const removeStep = (index) => {
        if (steps.length > 1) {
            setSteps(steps.filter((_, i) => i !== index));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const token = sessionStorage.getItem('token');

            // Validate basic requirements
            if (ingredients.some(i => !i.name.trim())) {
                throw new Error("All ingredients must have a name");
            }
            if (steps.some(s => !s.trim())) {
                throw new Error("All steps must have content");
            }

            const payload = {
                ...formData,
                status: formData.isPrivate ? 'private' : 'pending', // Reset to pending if edited and public
                ingredients: ingredients,
                steps: steps.filter(s => s.trim())
            };

            const url = isEditing
                ? `http://localhost:5000/api/recipes/${id}`
                : 'http://localhost:5000/api/recipes';

            const method = isEditing ? 'put' : 'post';

            await axios[method](url, payload, {
                headers: { Authorization: `Bearer ${token}` }
            });

            // Redirect based on intent and source
            if (window.location.pathname.includes('admin')) {
                navigate('/admin/recipes');
            } else {
                navigate('/profile');
            }
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || err.message || 'Failed to save recipe');
            // Check if validation errors exist
            if (err.response?.data?.errors) {
                const validationErrors = err.response.data.errors.fieldErrors;
                const errorMsg = Object.values(validationErrors).flat().join(', ');
                setError(errorMsg);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm p-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">{isEditing ? 'Edit Recipe' : 'Add New Recipe'}</h1>
                    <p className="text-gray-500 mt-2">Share your culinary masterpiece with the world.</p>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 border border-red-100">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Basic Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Recipe Title</label>
                            <input
                                type="text"
                                name="title"
                                required
                                value={formData.title}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-shadow"
                                placeholder="e.g. Classic Pancakes"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                            <input
                                type="url"
                                name="image"
                                // required // Optional in schema but good to have
                                value={formData.image}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                                placeholder="https://example.com/image.jpg"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea
                                name="description"
                                required
                                rows="3"
                                value={formData.description}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                                placeholder="Tell us about your recipe..."
                            ></textarea>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Cooking Time</label>
                            <input
                                type="text"
                                name="cookingTime"
                                value={formData.cookingTime}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 outline-none"
                                placeholder="e.g. 45 mins"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
                            <select
                                name="difficulty"
                                value={formData.difficulty}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 outline-none"
                            >
                                <option value="Easy">Easy</option>
                                <option value="Medium">Medium</option>
                                <option value="Hard">Hard</option>
                            </select>
                        </div>
                    </div>

                    {/* Nutrition - Optional Section */}
                    <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-3">Nutrition (Optional)</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {['calories', 'protein', 'carbs', 'fat'].map((field) => (
                                <div key={field}>
                                    <label className="block text-xs font-medium text-gray-500 uppercase mb-1">{field}</label>
                                    <input
                                        type="text"
                                        name={`nutrition.${field}`}
                                        value={formData.nutrition[field]}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-1 focus:ring-red-500 outline-none text-sm"
                                        placeholder="e.g. 20g"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Ingredients Dynamic List */}
                    <div>
                        <div className="flex justify-between items-center mb-3">
                            <h3 className="text-lg font-medium text-gray-900">Ingredients</h3>
                            <button
                                type="button"
                                onClick={addIngredient}
                                className="text-sm text-red-600 hover:text-red-700 font-medium flex items-center gap-1"
                            >
                                + Add Ingredient
                            </button>
                        </div>
                        <div className="space-y-3">
                            {ingredients.map((ing, index) => (
                                <div key={index} className="flex gap-3 items-start">
                                    <div className="flex-1">
                                        <input
                                            type="text"
                                            value={ing.name}
                                            onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
                                            className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-1 focus:ring-red-500 outline-none"
                                            placeholder="Ingredient name"
                                            required
                                        />
                                    </div>
                                    <div className="w-24">
                                        <input
                                            type="text"
                                            value={ing.quantity}
                                            onChange={(e) => handleIngredientChange(index, 'quantity', e.target.value)}
                                            className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-1 focus:ring-red-500 outline-none"
                                            placeholder="Qty"
                                        />
                                    </div>
                                    <div className="w-24">
                                        <input
                                            type="text"
                                            value={ing.unit}
                                            onChange={(e) => handleIngredientChange(index, 'unit', e.target.value)}
                                            className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-1 focus:ring-red-500 outline-none"
                                            placeholder="Unit"
                                        />
                                    </div>
                                    {ingredients.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeIngredient(index)}
                                            className="p-2 text-gray-400 hover:text-red-500"
                                        >
                                            ✕
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Steps Dynamic List */}
                    <div>
                        <div className="flex justify-between items-center mb-3">
                            <h3 className="text-lg font-medium text-gray-900">Preparation Steps</h3>
                            <button
                                type="button"
                                onClick={addStep}
                                className="text-sm text-red-600 hover:text-red-700 font-medium flex items-center gap-1"
                            >
                                + Add Step
                            </button>
                        </div>
                        <div className="space-y-3">
                            {steps.map((step, index) => (
                                <div key={index} className="flex gap-3 items-start">
                                    <div className="pt-2 text-sm font-medium text-gray-400 w-6">
                                        {index + 1}.
                                    </div>
                                    <div className="flex-1">
                                        <textarea
                                            value={step}
                                            onChange={(e) => handleStepChange(index, e.target.value)}
                                            className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-1 focus:ring-red-500 outline-none"
                                            placeholder="Describe this step..."
                                            rows="2"
                                            required
                                        ></textarea>
                                    </div>
                                    {steps.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeStep(index)}
                                            className="p-2 text-gray-400 hover:text-red-500"
                                        >
                                            ✕
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-6">
                        <Button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-3 text-lg font-bold shadow-md hover:shadow-lg transition-all ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {loading ? 'Saving...' : (isEditing ? 'Update Recipe' : 'Publish Recipe')}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddRecipe;
