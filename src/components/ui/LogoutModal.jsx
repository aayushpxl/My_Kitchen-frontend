import React from 'react';

const LogoutModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center px-4">
      
      {/* Backdrop - Blur reduced to sm */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-sm bg-white rounded-[2rem] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-50 animate-in fade-in zoom-in duration-200">
        
        {/* Modern Minimalist Icon */}
        <div className="mx-auto mb-6 w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center">
          <svg
            className="w-8 h-8 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
        </div>

        {/* Text Section */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-2 tracking-tight">
            Log out?
          </h3>
          <p className="text-sm text-gray-500 leading-relaxed">
            Are you sure you want to leave your <span className="text-gray-800 font-semibold">Kitchen</span>? We'll save your recipes for when you return.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <button
            onClick={onConfirm}
            className="w-full h-14 rounded-2xl bg-gray-900 text-white text-sm font-bold hover:bg-red-600 active:scale-[0.98] transition-all duration-200"
          >
            Yes, Log out
          </button>

          <button
            onClick={onClose}
            className="w-full h-14 rounded-2xl bg-white text-gray-500 text-sm font-bold hover:bg-gray-50 active:scale-[0.98] transition-all duration-200"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;