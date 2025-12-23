import React, { useState } from 'react';
import { useRecipes } from '../hooks/useRecipes';
import Navbar from '../components/common/Navbar';
import RecipeGridCard from '../components/recipes/RecipeGridCard';
import Footer from '.././components/landing/Footer';

const Recipes = () => {
    const { data: recipes, isLoading, error } = useRecipes();
    const [searchTerm, setSearchTerm] = useState('');
    const [activeFilter, setActiveFilter] = useState('All Types');

    const filters = [
        { label: 'All Types', icon: '♨️' },
        { label: 'Appetizers', icon: '🥪' },
        { label: 'Main Courses', icon: '🍽️' },
        { label: 'Salads & Sides', icon: '🥗' },
        { label: 'Vegetarian Delights', icon: '🥑' },
        { label: 'International Flavors', icon: '🌐' },
        { label: 'Desserts & Sweets', icon: '🍦' },
        { label: 'Healthy Eats', icon: '💚' },
        { label: 'Quick & Easy Supper', icon: '🕒' }
    ];

    // Filter Logic
    const filteredRecipes = recipes?.filter(recipe => {
        const matchesSearch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = activeFilter === 'All Types' ||
            (recipe.category && recipe.category.toLowerCase() === activeFilter.toLowerCase()) || // Exact match
            (activeFilter === 'Vegetarian Delights' && recipe.category === 'Vegan') || // Map Vegan to Vegetarian
            true; // For demo purposes, we might want to return true to show layout if categories don't match exactly yet

        // Strict filtering for production:
        // const matchesCategory = activeFilter === 'All Types' || recipe.category === activeFilter;

        return matchesSearch;
    });

    return (
        <div className="min-h-screen bg-white font-sans">
            <Navbar />

            {/* Hero Section */}
            <div className="relative bg-gradient-to-r from-orange-50 to-pink-50 py-16 md:py-24 overflow-hidden">
                {/* Floating Background Elements */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -translate-x-1/2 translate-y-1/2"></div>

                <div className="container mx-auto px-4 text-center relative z-10">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Explore <span className="text-orange-500">Culinary</span> insights
                    </h1>
                    <p className="text-gray-500 max-w-2xl mx-auto mb-10 text-lg">
                        Discover a world of flavors with our curated collection of recipes. From quick weeknight dinners to gourmet weekend feasts.
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-2xl mx-auto relative">
                        <input
                            type="text"
                            placeholder="Search for recipes...."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 rounded-full border border-gray-200 shadow-sm focus:ring-2 focus:ring-orange-100 focus:border-orange-500 outline-none transition-all text-gray-600 bg-white"
                        />
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-gray-400">
                            🔍
                        </span>
                    </div>
                </div>

                {/* Right Side Image (Abstract crop as per design) */}
                <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-1/4 h-full">
                    <img
                        src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                        alt="Culinary"
                        className="w-full h-full object-cover object-left rounded-l-full shadow-2xl opacity-90"
                    />
                </div>
            </div>

            {/* Filter Pills */}
            <div className="container mx-auto px-4 py-8 overflow-x-auto">
                <div className="flex flex-wrap justify-center gap-3 min-w-max md:min-w-0">
                    {filters.map((filter) => (
                        <button
                            key={filter.label}
                            onClick={() => setActiveFilter(filter.label)}
                            className={`px-6 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 transition-all duration-300 whitespace-nowrap ${activeFilter === filter.label
                                    ? 'bg-black text-white shadow-lg transform scale-105'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                        >
                            <span>{filter.icon}</span>
                            {filter.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Recipe Grid */}
            {/* Recipe Grid */}
<div className="container mx-auto px-4 py-8 pb-24">
  <div className="flex justify-between items-center mb-6">
    <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest">
      All recipes
    </h2>
    <span className="text-sm text-gray-400">
      {filteredRecipes?.length || 0} results
    </span>
  </div>

  {isLoading ? (
    <div className="text-center py-20">Loading...</div>
  ) : error ? (
    <div className="text-center py-20 text-red-500">
      Error loading recipes
    </div>
  ) : (
    <div
      className="
        grid
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-4
        gap-5
      "
    >
      {filteredRecipes?.map(recipe => (
        <RecipeGridCard key={recipe._id} recipe={recipe} />
      ))}
    </div>
  )}

  {/* Empty State */}
  {!isLoading && filteredRecipes?.length === 0 && (
    <div className="text-center py-16 bg-gray-50 rounded-2xl mt-10">
      <p className="text-gray-500 text-base">
        No recipes found matching your criteria.
      </p>
      <button
        onClick={() => {
          setSearchTerm('');
          setActiveFilter('All Types');
        }}
        className="mt-3 text-orange-500 hover:text-orange-600 font-semibold"
      >
        Clear filters
      </button>
    </div>
  )}
</div>

             {/* Footer */}
        <Footer />
        </div>
    );
};

export default Recipes;
