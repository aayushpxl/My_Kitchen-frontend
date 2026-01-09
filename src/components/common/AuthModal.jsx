import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { X, LogIn, UserPlus, Lock } from 'lucide-react';
import Button from '../ui/Button';

const AuthModal = ({ isOpen, onClose }) => {
    const navigate = useNavigate();

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                />

                {/* Modal Content */}
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    className="relative w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/20"
                >
                    {/* Header with Pattern */}
                    <div className="relative h-32 bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center overflow-hidden">
                        <div className="absolute inset-0 opacity-10">
                            <svg className="w-full h-full" width="100%" height="100%">
                                <pattern id="pattern-circles" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                                    <circle cx="10" cy="10" r="1" fill="#fff" />
                                </pattern>
                                <rect width="100%" height="100%" fill="url(#pattern-circles)" />
                            </svg>
                        </div>
                        <div className="relative z-10 bg-white/20 backdrop-blur-md p-4 rounded-3xl border border-white/30">
                            <Lock className="text-white" size={32} />
                        </div>

                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    <div className="p-8 text-center">
                        <h2 className="text-2xl font-black text-gray-900 mb-2">Login to Access</h2>
                        <p className="text-gray-500 font-medium mb-8 leading-relaxed">
                            Join our community to unlock full recipes, save your favorites, and start your culinary journey!
                        </p>

                        <div className="space-y-4">
                            <Button
                                variant="primary"
                                className="w-full py-4 rounded-2xl flex items-center justify-center gap-3 text-sm font-black uppercase tracking-widest shadow-xl shadow-orange-200"
                                onClick={() => {
                                    onClose();
                                    navigate('/login');
                                }}
                            >
                                <LogIn size={18} />
                                Login Now
                            </Button>

                            <button
                                className="w-full py-4 rounded-2xl flex items-center justify-center gap-3 text-sm font-black uppercase tracking-widest text-gray-700 hover:bg-gray-50 transition-colors"
                                onClick={() => {
                                    onClose();
                                    navigate('/register');
                                }}
                            >
                                <UserPlus size={18} />
                                Create Account
                            </button>
                        </div>

                        <p className="mt-8 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                            Discover thousands of recipes today
                        </p>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default AuthModal;
