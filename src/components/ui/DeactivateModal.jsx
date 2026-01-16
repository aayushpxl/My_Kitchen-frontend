import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

const DeactivateModal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center px-4">

            {/* Backdrop */}
            <div
                onClick={onClose}
                className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
            />

            {/* Modal Card */}
            <div className="relative w-full max-w-sm bg-white rounded-[2rem] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-red-100 animate-in fade-in zoom-in duration-200">

                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <X size={20} />
                </button>

                {/* Warning Icon */}
                <div className="mx-auto mb-6 w-16 h-16 rounded-2xl bg-red-100 flex items-center justify-center border-4 border-red-50">
                    <AlertTriangle className="w-8 h-8 text-red-600" />
                </div>

                {/* Text Section */}
                <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2 tracking-tight">
                        Deactivate Account?
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed mb-4">
                        This will disable your profile and prevent you from logging in.
                    </p>
                    <div className="bg-red-50 p-3 rounded-xl">
                        <p className="text-xs text-red-700 font-medium">
                            Tip: You can reactivate your account anytime by simply logging back in.
                        </p>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3">
                    <button
                        onClick={onConfirm}
                        className="w-full h-14 rounded-2xl bg-red-600 text-white text-sm font-bold hover:bg-red-700 active:scale-[0.98] transition-all duration-200 shadow-lg shadow-red-200"
                    >
                        Yes, Deactivate
                    </button>

                    <button
                        onClick={onClose}
                        className="w-full h-14 rounded-2xl bg-white text-gray-500 text-sm font-bold hover:bg-gray-50 active:scale-[0.98] transition-all duration-200 border border-gray-100"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeactivateModal;
