import React from 'react';
import { Link } from 'react-router-dom';
import { getImageUrl } from '../../utils/imageUtils';

const TopChoices = ({ recipes }) => {
  if (!recipes || recipes.length === 0) return null;

  const cardColors = [
    'bg-[#F28482]', // Soft Coral
    'bg-[#F2A65A]', // Muted Orange
    'bg-[#84D94F]', // Apple Green
    'bg-[#736CED]', // Royal Purple
  ];

  return (
    <section className="container mx-auto px-6 md:px-12 lg:px-24 py-16">
      {/* 1. Header Section */}
      <div className="flex items-end justify-between mb-12">
        <div>
          <span className="text-orange-500 font-black uppercase tracking-[0.2em] text-[10px]">
            Staff Picks
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mt-2">
            Top <span className="text-orange-600">Choices</span>
          </h2>
        </div>
        <Link
          to="/recipes"
          className="hidden md:block text-sm font-bold text-gray-400 hover:text-orange-500 transition-colors underline decoration-2 underline-offset-8"
        >
          View all recipes
        </Link>
      </div>

      {/* 2. Ticket-Shaped Outer Container */}
      <div className="relative bg-white rounded-[3.5rem] md:rounded-[5rem] p-8 md:p-14 shadow-sm border border-gray-50">
        <div className="absolute left-[-20px] top-1/2 -translate-y-1/2 w-10 h-20 bg-gray-50 rounded-full shadow-inner hidden lg:block"></div>
        <div className="absolute right-[-20px] top-1/2 -translate-y-1/2 w-10 h-20 bg-gray-50 rounded-full shadow-inner hidden lg:block"></div>

        {/* 3. The Grid of Dynamic Recipes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 relative z-10">
          {recipes.slice(0, 4).map((recipe, index) => (
            <div
              key={recipe._id}
              className="relative pt-16 group transition-all duration-300 hover:-translate-y-3"
            >
              {/* Floating Circular Image */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20 w-32 h-32 rounded-full p-1.5 bg-white shadow-xl group-hover:scale-110 transition-transform duration-500">
                <img
                  src={getImageUrl(recipe.image)}
                  alt={recipe.title}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>

              {/* Colorful Card Body */}
              <div className={`${cardColors[index % cardColors.length]} rounded-[3rem] p-6 pt-20 text-white shadow-lg flex flex-col items-center`}>

                {/* Dynamic Title */}
                <h3 className="text-lg font-black mb-1 text-center line-clamp-1 w-full">
                  {recipe.title}
                </h3>

                {/* Dynamic Calories Badge */}
                <div className="flex justify-between items-center w-full mt-4">
                  <div className="flex flex-col">
                    <span className="text-2xl font-black leading-none">
                      {recipe.nutrition?.calories || "0"}
                    </span>
                    <span className="text-[10px] uppercase font-bold tracking-widest opacity-80">Calories</span>
                  </div>

                  {/* Glassmorphism Heart */}
                  <div className="bg-white/20 backdrop-blur-md p-2 rounded-full hover:bg-white/40 transition-all cursor-pointer">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                    </svg>
                  </div>
                </div>

                {/* Dynamic Macros Stats (Protein, Carbs, Fat) */}
                <div className="grid grid-cols-3 w-full gap-2 mt-6 py-3 border-y border-white/20">
                  <div className="flex flex-col items-center">
                    <span className="text-[11px] font-black">{recipe.nutrition?.protein || '-'}</span>
                    <span className="text-[8px] uppercase font-bold opacity-70 tracking-tighter">Protein</span>
                  </div>
                  <div className="flex flex-col items-center border-x border-white/20">
                    <span className="text-[11px] font-black">{recipe.nutrition?.carbs || '-'}</span>
                    <span className="text-[8px] uppercase font-bold opacity-70 tracking-tighter">Carbs</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-[11px] font-black">{recipe.nutrition?.fat || '-'}</span>
                    <span className="text-[8px] uppercase font-bold opacity-70 tracking-tighter">Fat</span>
                  </div>
                </div>

                <div className="flex justify-between items-center w-full mt-6">
                  <Link
                    to={`/recipes/${recipe._id}`}
                    className="bg-white text-gray-800 text-[10px] font-black py-2 px-4 rounded-full flex items-center gap-1 hover:bg-gray-900 hover:text-white transition-all shadow-md group/btn"
                  >
                    View Recipe
                    <svg className="w-2.5 h-2.5 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>

                  <div className="flex items-center gap-1 opacity-90">
                    <span className="text-[10px] font-black tracking-tighter">Macro Fit</span>
                    <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopChoices;