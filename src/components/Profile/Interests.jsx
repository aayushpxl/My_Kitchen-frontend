// src/components/profile/Interests.jsx
import React from 'react';

const cuisines = [
  "Italian", "Mexican", "Asian", "Mediterranean", "Indian",
  "French", "Japanese", "American", "Thai", "Vegan", "Desserts", "Baking"
];

const Interests = ({ selectedInterests = [], onChange }) => {
  const toggleInterest = (cuisine) => {
    if (!onChange) return;
    const currentInterests = Array.isArray(selectedInterests) ? selectedInterests : [];
    const newInterests = currentInterests.includes(cuisine)
      ? currentInterests.filter(i => i !== cuisine)
      : [...currentInterests, cuisine];
    onChange(newInterests);
  };

  const currentInterests = Array.isArray(selectedInterests) ? selectedInterests : [];

  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 mt-8">
      <h3 className="text-xl font-black text-gray-900 mb-2">Interests & Preferences</h3>
      <p className="text-gray-400 text-sm mb-6">Select your favorite cuisine types to get better recommendations 🥘</p>

      <div className="flex flex-wrap gap-3">
        {cuisines.map((cuisine) => {
          const isSelected = currentInterests.includes(cuisine);
          return (
            <button
              key={cuisine}
              onClick={() => toggleInterest(cuisine)}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all border active:scale-95 ${isSelected
                ? 'bg-orange-500 text-white border-orange-500 shadow-lg shadow-orange-100'
                : 'bg-white text-gray-500 border-gray-200 hover:border-orange-500 hover:text-orange-500'
                }`}
            >
              {cuisine}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Interests;