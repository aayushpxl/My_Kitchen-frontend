import React, { useEffect } from "react";

export default function Snackbar({ message, isOpen, onClose }) {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => onClose(), 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 animate-bounce-in">
      <div className="bg-gray-900 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-gray-700">
        <span className="text-green-400 font-bold text-xl">🎉</span>
        <p className="font-medium">{message}</p>
      </div>
    </div>
  );
}