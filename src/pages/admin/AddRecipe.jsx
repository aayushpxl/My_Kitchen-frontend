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
        image: '', // URL
        cookingTime: '',
        difficulty: 'Medium',
        category: '',
        servings: '',
        isPrivate: false,
        status: '', // Changed to empty string to detect new recipes
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
    const [tags, setTags] = useState(['']);
    const [proTips, setProTips] = useState(['']);
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

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
                category: recipe.category || '',
                servings: recipe.servings || '',
                isPrivate: recipe.status === 'private',
                status: recipe.status || 'pending',
                nutrition: recipe.nutrition || { calories: '', protein: '', carbs: '', fat: '' }
            });
            setIngredients(recipe.ingredients || []);
            setSteps(recipe.steps || []);
            setTags(recipe.tags || ['']);
            setProTips(recipe.proTips || ['']);
            if (recipe.image && !recipe.image.startsWith('http')) {
                setImagePreview(`http://localhost:5000${recipe.image}`);
            } else if (recipe.image) {
                setImagePreview(recipe.image);
            }
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

    // Array Field Handlers (Tags, Pro Tips)
    const handleArrayChange = (setter, index, value) => {
        setter(prev => {
            const next = [...prev];
            next[index] = value;
            return next;
        });
    };

    const addArrayField = (setter) => {
        setter(prev => [...prev, '']);
    };

    const removeArrayField = (setter, index, min = 1) => {
        setter(prev => {
            if (prev.length > min) {
                return prev.filter((_, i) => i !== index);
            }
            return prev;
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
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

            const data = new FormData();

            // Basic fields
            data.append('title', formData.title);
            data.append('description', formData.description);
            data.append('cookingTime', formData.cookingTime);
            data.append('difficulty', formData.difficulty);
            data.append('category', formData.category);
            data.append('servings', formData.servings);

            // Determine and append status
            let finalStatus = formData.isPrivate ? 'private' : 'pending';

            // If admin is creating or editing a non-private recipe, make it approved
            const user = JSON.parse(sessionStorage.getItem('user'));
            if (user?.role === 'admin' && !formData.isPrivate) {
                finalStatus = 'approved';
            } else if (isEditing && !formData.isPrivate && formData.status === 'approved') {
                // If editing and it was already approved, keep it approved
                finalStatus = 'approved';
            }
            data.append('status', finalStatus);

            // Image (File or URL)
            if (imageFile) {
                data.append('image', imageFile);
            } else {
                data.append('image', formData.image);
            }

            // Complex fields (Stringified for Multer)
            data.append('ingredients', JSON.stringify(ingredients.filter(i => i.name.trim())));
            data.append('steps', JSON.stringify(steps.filter(s => s.trim())));
            data.append('tags', JSON.stringify(tags.filter(t => t.trim())));
            data.append('proTips', JSON.stringify(proTips.filter(p => p.trim())));
            data.append('nutrition', JSON.stringify(formData.nutrition));

            const url = isEditing
                ? `http://localhost:5000/api/recipes/${id}`
                : 'http://localhost:5000/api/recipes';

            const method = isEditing ? 'put' : 'post';

            const headers = {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            };

            await axios[method](url, data, { headers });

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
                            <label className="block text-sm font-medium text-gray-700 mb-1">Recipe Image</label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-4">
                                    <div className="relative group cursor-pointer border-2 border-dashed border-gray-300 rounded-xl p-4 hover:border-red-500 hover:bg-red-50 transition-all text-center">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                        />
                                        <div className="text-gray-400 group-hover:text-red-500">
                                            <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            <span className="text-xs font-medium uppercase tracking-wider">Browse Image</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="h-[1px] flex-1 bg-gray-200"></div>
                                        <span className="text-[10px] text-gray-400 font-bold uppercase">OR</span>
                                        <div className="h-[1px] flex-1 bg-gray-200"></div>
                                    </div>
                                    <input
                                        type="text"
                                        name="image"
                                        value={formData.image}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none text-sm"
                                        placeholder="Paste image URL here..."
                                    />
                                </div>
                                <div className="aspect-video bg-gray-50 rounded-xl border border-gray-200 overflow-hidden flex items-center justify-center relative shadow-inner">
                                    {imagePreview ? (
                                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                    ) : (
                                        <span className="text-gray-300 text-sm font-medium italic">No preview available</span>
                                    )}
                                    {imagePreview && (
                                        <button
                                            type="button"
                                            onClick={() => { setImageFile(null); setImagePreview(null); setFormData(p => ({ ...p, image: '' })) }}
                                            className="absolute top-2 right-2 bg-white/80 backdrop-blur-md p-1.5 rounded-full text-gray-500 hover:text-red-500 shadow-sm"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                        </button>
                                    )}
                                </div>
                            </div>
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

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                            <input
                                type="text"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 outline-none"
                                placeholder="e.g. Breakfast, Dessert"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Servings</label>
                            <input
                                type="number"
                                name="servings"
                                value={formData.servings}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 outline-none"
                                placeholder="e.g. 4"
                            />
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

                    {/* Tags Section */}
                    <div>
                        <div className="flex justify-between items-center mb-3">
                            <h3 className="text-lg font-medium text-gray-900">Tags</h3>
                            <button
                                type="button"
                                onClick={() => addArrayField(setTags)}
                                className="text-sm text-red-600 hover:text-red-700 font-medium"
                            >
                                + Add Tag
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            {tags.map((tag, index) => (
                                <div key={index} className="flex-1 min-w-[150px] relative">
                                    <input
                                        type="text"
                                        value={tag}
                                        onChange={(e) => handleArrayChange(setTags, index, e.target.value)}
                                        className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-1 focus:ring-red-500 outline-none pr-8"
                                        placeholder="e.g. Vegan"
                                    />
                                    {tags.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeArrayField(setTags, index)}
                                            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500"
                                        >
                                            ✕
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Pro Tips Section */}
                    <div>
                        <div className="flex justify-between items-center mb-3">
                            <h3 className="text-lg font-medium text-gray-900">Pro Tips</h3>
                            <button
                                type="button"
                                onClick={() => addArrayField(setProTips)}
                                className="text-sm text-red-600 hover:text-red-700 font-medium"
                            >
                                + Add Pro Tip
                            </button>
                        </div>
                        <div className="space-y-3">
                            {proTips.map((tip, index) => (
                                <div key={index} className="flex gap-3 items-center">
                                    <div className="flex-1">
                                        <input
                                            type="text"
                                            value={tip}
                                            onChange={(e) => handleArrayChange(setProTips, index, e.target.value)}
                                            className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-1 focus:ring-red-500 outline-none"
                                            placeholder="A useful tip for best results..."
                                        />
                                    </div>
                                    {proTips.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeArrayField(setProTips, index)}
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
