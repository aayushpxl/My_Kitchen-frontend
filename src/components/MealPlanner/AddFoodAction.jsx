import React from "react";

/**
 * Component to display when a specific meal slot is empty.
 * @param {Function} onAdd - Function to trigger the recipe search modal.
 */
export default function AddFoodAction({ onAdd }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed border-gray-100 rounded-[32px] bg-white transition-all hover:bg-gray-50/50">
      <div className="w-16 h-16 bg-yellow-50 rounded-full flex items-center justify-center mb-4 text-2xl shadow-sm">
        🥧
      </div>
      <h3 className="text-lg font-bold text-gray-900">No meals for this slot</h3>
      <p className="text-sm text-gray-400 mb-4">Start planning your day by adding a recipe.</p>
      <button
        onClick={onAdd}
        className="bg-[#00B488] text-white px-8 py-2 rounded-full font-bold hover:bg-[#009d76] active:scale-95 transition-all shadow-lg shadow-[#00B488]/20"
      >
        Add Food
      </button>
    </div>
  );
}