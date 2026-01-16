import React from 'react';
import { AlertTriangle, UserCheck, X } from 'lucide-react';

const BanModal = ({ isOpen, onClose, onConfirm, username, isBanned }) => {
    if (!isOpen) return null;

    const isBanning = !isBanned;

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center px-4">

            {/* Backdrop */}
            <div
                onClick={onClose}
                className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
            />

            {/* Modal Card */}
            <div className={`relative w-full max-w-md bg-white rounded-[2rem] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.15)] border ${isBanning ? 'border-red-100' : 'border-green-100'} animate-in fade-in zoom-in duration-200`}>

                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <X size={20} />
                </button>

                {/* Icon */}
                <div className={`mx-auto mb-6 w-16 h-16 rounded-2xl flex items-center justify-center border-4 ${isBanning ? 'bg-red-50 border-red-50' : 'bg-green-50 border-green-50'}`}>
                    {isBanning ? (
                        <AlertTriangle className="w-8 h-8 text-red-600" />
                    ) : (
                        <UserCheck className="w-8 h-8 text-green-600" />
                    )}
                </div>

                {/* Text Section */}
                <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2 tracking-tight">
                        {isBanning ? "Ban User?" : "Unban User?"}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed mb-4">
                        Are you sure you want to {isBanning ? 'ban' : 'allow'} <span className="font-bold text-gray-800">{username}</span>?
                    </p>
                    <div className={`p-3 rounded-xl ${isBanning ? 'bg-red-50' : 'bg-green-50'}`}>
                        <p className={`text-xs font-medium ${isBanning ? 'text-red-700' : 'text-green-700'}`}>
                            {isBanning
                                ? "They will immediately lose access to their account."
                                : "They will regain access to their account immediately."}
                        </p>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3">
                    <button
                        onClick={onConfirm}
                        className={`w-full h-14 rounded-2xl text-white text-sm font-bold active:scale-[0.98] transition-all duration-200 shadow-lg ${isBanning ? 'bg-red-600 hover:bg-red-700 shadow-red-200' : 'bg-green-600 hover:bg-green-700 shadow-green-200'}`}
                    >
                        {isBanning ? "Yes, Ban User" : "Yes, Unban User"}
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

export default BanModal;
