// src/components/profile/Interests.jsx
import React from 'react';

const cuisines = [
  "Italian", "Mexican", "Asian", "Mediterranean", "Indian", 
  "French", "Japanese", "American", "Thai", "Vegan", "Desserts", "Baking"
];

const Interests = ({ selectedInterests = ["Italian", "Mexican", "Mediterranean"] }) => {
  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 mt-8">
      <h3 className="text-xl font-black text-gray-900 mb-2">Interests & Preferences</h3>
      <p className="text-gray-400 text-sm mb-6">Select your favorite cuisine types</p>
      
      <div className="flex flex-wrap gap-3">
        {cuisines.map((cuisine) => {
          const isSelected = selectedInterests.includes(cuisine);
          return (
            <button
              key={cuisine}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all border ${
                isSelected 
                  ? 'bg-gray-900 text-white border-gray-900' 
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