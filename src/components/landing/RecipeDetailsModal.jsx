import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, Users, Flame, ChevronRight, Lock, Play, Utensils } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getImageUrl } from '../../utils/imageUtils';
import { useNavigate } from 'react-router-dom';

const RecipeDetailsModal = ({ recipe, isOpen, onClose }) => {
    const { user } = useAuth();
    const navigate = useNavigate();

    // Prevent background scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        // Cleanup function to ensure scroll is restored
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!recipe) return null;

    const isLocked = !user;

    const getBadgeStyle = (category) => {
        const lower = category?.toLowerCase() || '';
        if (lower.includes('vegan')) return 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20';
        if (lower.includes('healthy')) return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
        return 'bg-gray-100 text-gray-600 border-gray-200';
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Modal Content - More Compact max-w-4xl */}
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        className="relative w-full max-w-4xl bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[85vh]"
                    >
                        {/* High Contrast Close Button - Clearly Visible */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white shadow-lg text-gray-900 border border-gray-100 hover:bg-gray-50 transition-all duration-300"
                            aria-label="Close"
                        >
                            <X size={20} />
                        </button>

                        {/* Left Side: Visual Experience (Compact) */}
                        <div className="w-full md:w-[40%] relative min-h-[250px] md:min-h-0">
                            <img
                                src={getImageUrl(recipe.image)}
                                alt={recipe.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                            <div className="absolute bottom-6 left-6 right-6">
                                <div className="flex flex-wrap gap-2 mb-3">
                                    {recipe.category && (
                                        <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border backdrop-blur-sm ${getBadgeStyle(recipe.category)}`}>
                                            #{recipe.category}
                                        </span>
                                    )}
                                </div>
                                <h2 className="text-2xl md:text-3xl font-black text-white leading-tight drop-shadow-sm">
                                    {recipe.title}
                                </h2>
                            </div>
                        </div>

                        {/* Right Side: Details (Compact) */}
                        <div className="w-full md:w-[60%] flex flex-col bg-white overflow-y-auto no-scrollbar">
                            <div className="p-6 md:p-8">
                                {/* Compact Stats Bar */}
                                <div className="grid grid-cols-3 gap-3 mb-8">
                                    {[
                                        { icon: Clock, label: 'Time', value: recipe.cookingTime || "30 m" },
                                        { icon: Users, label: 'Serves', value: recipe.servings || "2" },
                                        { icon: Flame, label: 'Calories', value: recipe.nutrition?.calories || "450" }
                                    ].map((stat, i) => (
                                        <div key={i} className="flex flex-col items-center p-3 rounded-2xl bg-gray-50 border border-gray-100">
                                            <stat.icon size={16} className="text-orange-500 mb-1" />
                                            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{stat.label}</span>
                                            <span className="text-sm font-black text-gray-900">{stat.value}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Description */}
                                <div className="mb-8">
                                    <h3 className="text-[10px] font-black text-orange-500 uppercase tracking-widest mb-2">The Dish</h3>
                                    <p className="text-gray-600 text-base leading-relaxed line-clamp-3">
                                        {recipe.description || "A chef-curated recipe designed for flavor and simplicity."}
                                    </p>
                                </div>

                                {/* Gate or Ingredients */}
                                <div>
                                    <h3 className="text-[10px] font-black text-orange-500 uppercase tracking-widest mb-4">Preparation</h3>

                                    {isLocked ? (
                                        <div className="relative p-6 rounded-2xl bg-gray-900 overflow-hidden group shadow-xl">
                                            {/* Minimalist Lock Experience */}
                                            <div className="relative z-10 flex flex-col items-center text-center py-4">
                                                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-white mb-4 border border-white/10">
                                                    <Lock size={20} />
                                                </div>
                                                <h4 className="text-lg font-black text-white mb-2">Locked Preview</h4>
                                                <p className="text-white/50 text-xs mb-6 max-w-[200px]">Unlock ingredients and expert cooking steps by signing in.</p>

                                                <div className="flex gap-2 w-full max-w-[240px]">
                                                    <button
                                                        onClick={() => navigate('/login')}
                                                        className="flex-1 py-3 bg-orange-500 text-white rounded-xl font-bold text-[10px] uppercase tracking-wider hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/20"
                                                    >
                                                        Login
                                                    </button>
                                                    <button
                                                        onClick={() => navigate('/register')}
                                                        className="flex-1 py-3 bg-white/10 text-white border border-white/20 rounded-xl font-bold text-[10px] uppercase tracking-wider hover:bg-white/20 transition-all"
                                                    >
                                                        Join
                                                    </button>
                                                </div>
                                            </div>
                                            {/* Sparkle background effects */}
                                            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 blur-[60px] rounded-full" />
                                        </div>
                                    ) : (
                                        <div className="space-y-6">
                                            <div className="grid grid-cols-1 gap-2">
                                                {recipe.ingredients?.slice(0, 4).map((ing, idx) => (
                                                    <div key={idx} className="flex justify-between items-center p-3 bg-gray-50 rounded-xl border border-gray-100">
                                                        <span className="text-xs font-bold text-gray-700">{ing.name}</span>
                                                        <span className="text-[10px] font-black text-orange-600 uppercase">{ing.quantity} {ing.unit}</span>
                                                    </div>
                                                ))}
                                                {recipe.ingredients?.length > 4 && (
                                                    <p className="text-center text-[10px] font-bold text-gray-400 italic">And {recipe.ingredients.length - 4} more ingredients...</p>
                                                )}
                                            </div>

                                            <button
                                                onClick={() => navigate(`/recipes/${recipe._id}`)}
                                                className="w-full py-4 bg-gray-900 text-white rounded-2xl flex items-center justify-between px-6 group hover:bg-orange-600 transition-all duration-300"
                                            >
                                                <span className="font-black text-[10px] uppercase tracking-widest">Full Cooking Mode</span>
                                                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default RecipeDetailsModal;
