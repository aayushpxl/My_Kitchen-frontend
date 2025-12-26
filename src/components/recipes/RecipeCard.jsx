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
      {recipe.nutrition && (
        <div className="flex flex-wrap gap-2 mb-4">
          {calories && (
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-orange-100 text-orange-700">
              {calories} Kcal
            </span>
          )}
          {protein && (
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-green-100 text-green-700">
              {protein}g Protein
            </span>
          )}
          {carbs && (
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-100 text-blue-700">
              {carbs}g Carbs
            </span>
          )}
          {fat && (
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-pink-100 text-pink-700">
              {fat}g Fat
            </span>
          )}
        </div>
      )}

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
