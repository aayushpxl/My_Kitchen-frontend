import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import { getImageUrl } from '../../utils/imageUtils';

const RecipeCard = ({ recipe }) => {
  const { calories, protein, carbs, fat } = recipe.nutrition || {};

  return (
    <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition p-5 border border-gray-100 flex flex-col h-full hover:-translate-y-1">

      {/* Image */}
      <div className="relative mb-5 h-52 rounded-2xl overflow-hidden">
        <img
          src={getImageUrl(recipe.image)}
          alt={recipe.title}
          className="w-full h-full object-cover transform hover:scale-105 transition duration-500"
        />
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">
        {recipe.title}
      </h3>

      {/* Nutrition Info */}
      <div className="flex flex-wrap gap-2 mb-4">
        {recipe.difficulty && (
          <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider ${recipe.difficulty === 'Easy' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : recipe.difficulty === 'Hard' ? 'bg-rose-50 text-rose-600 border border-rose-100' : 'bg-amber-50 text-amber-600 border border-amber-100'
            }`}>
            {recipe.difficulty}
          </span>
        )}
        {recipe.servings && (
          <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-gray-50 text-gray-500 border border-gray-100 uppercase tracking-wider">
            {recipe.servings} Servings
          </span>
        )}
        {calories && (
          <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-orange-50 text-orange-600 border border-orange-100 uppercase tracking-wider">
            {calories} kcal
          </span>
        )}
      </div>

      {/* Author + View Button */}
      <div className="mt-auto pt-3 border-t border-gray-100 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img
            src={`https://ui-avatars.com/api/?name=${recipe.createdBy?.username || 'User'}&background=random`}
            className="w-7 h-7 rounded-full"
            alt="Author"
          />
          <span className="text-sm text-gray-500 max-w-[90px] truncate">
            {recipe.createdBy?.username || "Chef"}
          </span>
        </div>
        <Link
          to={`/recipes/${recipe._id}`}
          className="text-sm font-bold text-orange-600 hover:text-orange-700 transition"
        >
          View Recipe →
        </Link>
      </div>
    </div>
  );
};

export default RecipeCard;
