import React, { useState } from 'react';
import { useRecipes } from '../hooks/useRecipes';
import Navbar from '../components/common/Navbar';
import RecipeGridCard from '../components/recipes/RecipeGridCard';
import Footer from '.././components/landing/Footer';

const Recipes = () => {
  const { data: recipes, isLoading, error } = useRecipes();
  const [searchTerm, setSearchTerm] = useState('');
  const [ingredientInput, setIngredientInput] = useState('');
  const [ingredientTags, setIngredientTags] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All Types');

  const handleIngredientKeyDown = (e) => {
    if (e.key === 'Enter' && ingredientInput.trim()) {
      e.preventDefault();
      if (!ingredientTags.includes(ingredientInput.trim().toLowerCase())) {
        setIngredientTags([...ingredientTags, ingredientInput.trim().toLowerCase()]);
      }
      setIngredientInput('');
    }
  };

  const removeIngredientTag = (tag) => {
    setIngredientTags(ingredientTags.filter(t => t !== tag));
  };

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

    // Category Filter
    const matchesCategory = activeFilter === 'All Types' ||
      (recipe.category && recipe.category.toLowerCase() === activeFilter.toLowerCase());

    // Ingredient Filter
    const matchesIngredients = ingredientTags.length === 0 ||
      ingredientTags.every(tag =>
        recipe.ingredients?.some(ing => ing.name.toLowerCase().includes(tag))
      );

    return matchesSearch && matchesCategory && matchesIngredients;
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

          {/* Unified Search Bar */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex items-center p-1.5 md:p-2 transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
              {/* Left: Name Search */}
              <div className="flex-1 flex items-center min-w-0 pl-4 md:pl-6">
                <span className="text-gray-400 mr-3">
                  <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </span>
                <input
                  type="text"
                  placeholder="Search recipes by name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full py-3 bg-transparent outline-none text-gray-700 placeholder:text-gray-400 font-medium text-sm md:text-base"
                />
              </div>

              {/* Divider */}
              <div className="h-8 w-[1px] bg-gray-200 mx-1 md:mx-4 hidden sm:block"></div>

              {/* Right: Ingredient Search & Tags */}
              <div className="flex-[1.5] flex items-center min-w-0 px-2 md:px-4">
                <span className="text-orange-500 mr-2 shrink-0 hidden sm:block">
                  <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </span>

                <div className="flex flex-1 items-center gap-1.5 overflow-x-auto no-scrollbar scroll-smooth">
                  {ingredientTags.map(tag => (
                    <span
                      key={tag}
                      className="bg-orange-50 text-orange-600 px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap flex items-center gap-1.5 shrink-0 animate-in zoom-in-95 group"
                    >
                      {tag}
                      <button
                        onClick={() => removeIngredientTag(tag)}
                        className="hover:text-orange-800 transition-colors"
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </span>
                  ))}
                  <input
                    type="text"
                    placeholder={ingredientTags.length > 0 ? "Add more..." : "Search by ingredients..."}
                    value={ingredientInput}
                    onChange={(e) => setIngredientInput(e.target.value)}
                    onKeyDown={handleIngredientKeyDown}
                    className="bg-transparent outline-none text-gray-700 placeholder:text-gray-400 font-medium text-sm md:text-base min-w-[120px] flex-1"
                  />
                </div>
              </div>

              {/* Search Action Button */}
              <button className="w-12 h-12 md:w-14 md:h-14 bg-orange-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-orange-200 hover:bg-orange-600 transition-all active:scale-95 shrink-0">
                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>

            {/* Clear All Link */}
            {ingredientTags.length > 0 && (
              <div className="flex justify-center mt-3 animate-fade-in text-[10px] font-black uppercase tracking-widest">
                <button
                  onClick={() => setIngredientTags([])}
                  className="text-gray-400 hover:text-orange-500 transition-colors"
                >
                  Clear all ingredients
                </button>
              </div>
            )}
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
                setIngredientTags([]);
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
