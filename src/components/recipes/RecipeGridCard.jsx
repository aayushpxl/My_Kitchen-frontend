import React from 'react';
import { Link } from 'react-router-dom';

const RecipeGridCard = ({ recipe }) => {
    return (
        <div className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 flex flex-col items-center text-center group border border-gray-50">
            {/* Circular Image Container */}
            <div className="relative mb-6">
                <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-lg mx-auto transform group-hover:scale-105 transition-transform duration-500">
                    <img
                        src={recipe.image || "https://placehold.co/400x400?text=No+Image"}
                        alt={recipe.title}
                        className="w-full h-full object-cover"
                    />
                </div>
                {/* Floating Badge (optional, based on design usually top-corner, but circular makes it tricky. Let's keep it clean or add a small tag) */}
                {recipe.nutrition?.calories && (
                    <span className="absolute bottom-2 right-2 bg-white px-3 py-1 rounded-full text-xs font-bold text-orange-600 shadow-md">
                        {recipe.nutrition.calories} kcal
                    </span>
                )}
            </div>

            {/* Content */}
            <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-orange-600 transition-colors">
                {recipe.title}
            </h3>

            <p className="text-gray-500 text-sm mb-3 line-clamp-2 max-w-[250px]">
                {recipe.description || "A delicious recipe waiting for you to cook."}
            </p>

            <div className="text-xs text-gray-400 mb-6 font-medium uppercase tracking-wider">
                with tomato sauce, cheese & meat
            </div>

            {/* Button */}
            <Link
                to={`/recipes/${recipe._id}`}
                className="mt-auto bg-gray-100 hover:bg-orange-500 hover:text-white text-gray-600 font-semibold py-2.5 px-8 rounded-full transition-all duration-300 text-sm uppercase tracking-wide"
            >
                Start Now
            </Link>
        </div>
    );
};

export default RecipeGridCard;
