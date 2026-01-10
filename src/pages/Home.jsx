import React, { useState } from 'react';
import { useRecipes } from '../hooks/useRecipes';
import Navbar from '../components/common/Navbar';
import RecipeCard from '../components/recipes/RecipeCard';
import HomeHeroSection from '../components/home/HomeHeroSection';
import TopChoices from '../components/home/TopChoices'; // New Import
import Footer from '../components/landing/Footer';
import Testimonials from '../components/Feedback/Testimonials';
import ScrollFade from '../components/ui/ScrollFade';
import { getImageUrl } from '../utils/imageUtils';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Utensils,
  CakeSlice,
  Cookie,
  Coffee,
  Pizza,
  LayoutGrid,
  SearchX
} from 'lucide-react';

const Home = () => {
  const { data: recipes, isLoading, error } = useRecipes();
  const [selectedCategory, setSelectedCategory] = useState('All');

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <div className="w-12 h-12 border-4 border-orange-100 border-t-orange-500 rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-400 font-bold uppercase tracking-widest text-xs">Loading Kitchen...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-red-500 p-6 text-center">
        <span className="text-5xl mb-4">⚠️</span>
        <h2 className="text-xl font-bold text-gray-800">Error loading recipes</h2>
        <p className="text-sm text-gray-500 mt-2">{error.message}</p>
      </div>
    );
  }

  const topChoices = recipes?.slice(0, 4) || [];

  // Filtering logic
  const filteredRecipes = selectedCategory === 'All'
    ? (recipes || [])
    : (recipes || []).filter(recipe => recipe.category?.toLowerCase() === selectedCategory.toLowerCase());

  // Extract real reviews for Testimonials
  const allReviews = recipes?.flatMap(recipe =>
    (recipe.reviews || []).map(review => ({
      message: review.comment,
      name: review.user?.username || 'Community Member',
      role: review.user?.bio || 'no bio yet',
      avatar: getImageUrl(review.user?.profilePic, `https://ui-avatars.com/api/?name=${review.user?.username || 'C'}&background=random`),
      rating: review.rating,
      createdAt: review.createdAt
    }))
  ) || [];

  const displayTestimonials = allReviews.length > 0
    ? [...allReviews].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 8)
    : [
      {
        message: "The recipes here are so easy to follow, my family loves the Sunday brunches now!",
        name: "Theresa Jordan",
        role: "Home Cook",
        avatar: "https://i.pravatar.cc/100?img=12",
        rating: 5,
      },
      {
        message: "Finally a website that focuses on healthy yet tasty meal planning.",
        name: "James Wilson",
        role: "Nutritionist",
        avatar: "https://i.pravatar.cc/100?img=32",
        rating: 5,
      },
      {
        message: "The community challenges kept me motivated to cook every single day.",
        name: "Jhon Tosan",
        role: "Adventurer",
        avatar: "https://i.pravatar.cc/100?img=45",
        rating: 5,
      },
      {
        message: "I've improved my baking skills tremendously thanks to the detailed guides.",
        name: "Ram Bahadur",
        role: "Student",
        avatar: "https://i.pravatar.cc/100?img=11",
        rating: 5,
      },
    ];

  const categories = [
    { name: 'All', icon: LayoutGrid },
    { name: 'Cake', icon: CakeSlice },
    { name: 'Snacks', icon: Cookie },
    { name: 'Beverage', icon: Coffee },
    { name: 'Pizza', icon: Pizza }
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans overflow-x-hidden">
      <Navbar />

      {/* Main content starts here */}
      <main>
        <ScrollFade>
          <HomeHeroSection />
        </ScrollFade>

        <ScrollFade delay={0.1}>
          <TopChoices recipes={topChoices} />
        </ScrollFade>

        <ScrollFade delay={0.15}>
          <section className="container mx-auto px-6 md:px-12 lg:px-24 pt-16 pb-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">
                Explore <span className="text-orange-500">Categories</span>
              </h2>
              <p className="text-gray-400 max-w-lg mx-auto font-medium text-sm md:text-base">
                Discover filtered variety tailored to your cravings.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6 max-w-5xl mx-auto">
              {categories.map((cat) => (
                <motion.div
                  key={cat.name}
                  whileHover={{ y: -4, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.05), 0 8px 10px -6px rgb(0 0 0 / 0.05)" }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`group cursor-pointer rounded-2xl p-6 flex flex-col items-center justify-center gap-3 transition-all duration-300 border ${selectedCategory === cat.name
                    ? 'bg-orange-500 border-orange-500 text-white shadow-lg shadow-orange-100'
                    : 'bg-white border-gray-100 text-gray-500 hover:border-orange-200'
                    }`}
                >
                  <div className={`transition-colors duration-300 ${selectedCategory === cat.name ? 'text-white' : 'text-gray-400 group-hover:text-orange-500'
                    }`}>
                    <cat.icon size={28} strokeWidth={2} />
                  </div>
                  <span className={`font-bold text-sm md:text-base tracking-tight ${selectedCategory === cat.name ? 'text-white' : 'text-gray-900'
                    }`}>
                    {cat.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </section>
        </ScrollFade>

        <ScrollFade delay={0.2}>
          <section className="container mx-auto px-6 md:px-12 lg:px-24 py-12 min-h-[500px]">
            <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4 border-b border-gray-100 pb-8">
              <div className="text-center md:text-left">
                <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-1">
                  {selectedCategory === 'All' ? 'All Masterpieces' : `${selectedCategory} Selection`}
                </h3>
                <p className="text-gray-400 text-sm font-medium">Showing {filteredRecipes.length} premium recipes in {selectedCategory.toLowerCase()}.</p>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-orange-500 bg-orange-50 px-4 py-2 rounded-full border border-orange-100 shadow-sm">
                <Utensils size={14} />
                Live Kitchen
              </div>
            </div>

            <AnimatePresence mode="wait">
              {filteredRecipes.length > 0 ? (
                <motion.div
                  key={selectedCategory}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12"
                >
                  {filteredRecipes.map(recipe => (
                    <RecipeCard key={recipe._id} recipe={recipe} />
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="no-recipes"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="w-full flex flex-col items-center justify-center py-24 bg-white rounded-3xl border border-gray-100 shadow-sm"
                >
                  <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6 text-gray-300">
                    <SearchX size={40} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">No recipes found</h3>
                  <p className="text-gray-400 text-center max-w-xs">We are currently perfecting our {selectedCategory.toLowerCase()} recipes. Please check back later!</p>
                  <button
                    onClick={() => setSelectedCategory('All')}
                    className="mt-8 bg-gray-900 text-white px-8 py-3 rounded-xl font-bold text-sm hover:bg-orange-500 transition-colors shadow-lg shadow-gray-200"
                  >
                    View All Recipes
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </section>
        </ScrollFade>

        <ScrollFade delay={0.25}>
          <div className="py-16">
            <Testimonials testimonials={displayTestimonials} />
          </div>
        </ScrollFade>
      </main>

      <Footer />
    </div>
  );
};

export default Home;