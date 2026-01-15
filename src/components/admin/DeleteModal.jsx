import React from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const DeleteModal = ({ isOpen, onClose, onConfirm, title, message, itemName }) => {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                {/* Backdrop with a softer blur */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-gray-900/40 backdrop-blur-[2px]"
                />

                {/* Modal Content - More compact and refined */}
                <motion.div
                    initial={{ scale: 0.95, opacity: 0, y: 10 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.95, opacity: 0, y: 10 }}
                    className="relative bg-white w-full max-w-sm rounded-2xl shadow-xl overflow-hidden"
                >
                    <div className="p-6">
                        <div className="flex items-start gap-4">
                            {/* Danger Icon - Smaller and more integrated */}
                            <div className="flex-shrink-0 w-10 h-10 bg-red-50 rounded-full flex items-center justify-center">
                                <AlertTriangle size={20} className="text-red-600" />
                            </div>

                            <div className="flex-1">
                                <h3 className="text-lg font-bold text-gray-900 mb-1">{title || 'Confirm Deletion'}</h3>
                                <p className="text-sm text-gray-500 leading-relaxed">
                                    {message || 'Are you sure you want to delete this? This action cannot be undone.'}
                                </p>

                                {itemName && (
                                    <div className="mt-3 p-2 bg-gray-50 rounded-lg border border-gray-100 italic text-sm text-gray-600 truncate">
                                        "{itemName}"
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex gap-3 mt-8">
                            <button
                                onClick={onClose}
                                className="flex-1 px-4 py-2.5 rounded-xl font-semibold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 transition-all active:scale-95"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={onConfirm}
                                className="flex-1 px-4 py-2.5 rounded-xl font-semibold text-white bg-red-600 hover:bg-red-700 shadow-sm transition-all active:scale-95"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default DeleteModal;
