import React from 'react';
import { useRecipes } from '../hooks/useRecipes';
import Navbar from '../components/common/Navbar';
import RecipeCard from '../components/recipes/RecipeCard';
import HomeHeroSection from '../components/home/HomeHeroSection';
import TopChoices from '../components/home/TopChoices'; // New Import
import Footer from '../components/landing/Footer';
import Testimonials from '../components/Feedback/Testimonials';
import ScrollFade from '../components/ui/ScrollFade';

const Home = () => {
  const { data: recipes, isLoading, error } = useRecipes();

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
  const allRecipes = recipes || [];

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans overflow-x-hidden">
      <Navbar />

      {/* Main content starts here */}
      <main>
        {/* Hero Section */}
        <ScrollFade>
          <HomeHeroSection />
        </ScrollFade>

        {/* 1. Top Choices Component (New) */}
        <ScrollFade delay={0.1}>
          <TopChoices recipes={topChoices} />
        </ScrollFade>

        {/* 2. Categories Section */}
        <ScrollFade delay={0.15}>
          <section className="container mx-auto px-6 md:px-12 lg:px-24 py-16">
            <h2 className="text-2xl font-black text-gray-800 mb-10 text-center uppercase tracking-widest">
              Explore <span className="text-orange-500">Categories</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {['Cake', 'Snacks', 'Beverage', 'Pizza'].map((cat) => (
                <div 
                  key={cat} 
                  className="group h-40 rounded-[2rem] bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-orange-100 transition-all duration-300 flex flex-col items-center justify-center gap-3 cursor-pointer overflow-hidden relative"
                >
                  <div className="absolute inset-0 bg-orange-50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <span className="text-3xl relative z-10">
                    {cat === 'Cake' && '🍰'}
                    {cat === 'Snacks' && '🍿'}
                    {cat === 'Beverage' && '🍹'}
                    {cat === 'Pizza' && '🍕'}
                  </span>
                  <span className="font-black text-gray-700 relative z-10">{cat}</span>
                </div>
              ))}
            </div>
          </section>
        </ScrollFade>

        {/* 3. All Recipes Section */}
        <ScrollFade delay={0.2}>
          <section className="container mx-auto px-6 md:px-12 lg:px-24 py-16">
            <h2 className="text-3xl font-black text-gray-900 mb-10">All Recipes</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {allRecipes.map(recipe => (
                <RecipeCard key={recipe._id} recipe={recipe} />
              ))}
            </div>
          </section>
        </ScrollFade>

        {/* 4. Testimonials */}
        <ScrollFade delay={0.25}>
          <div className="py-16">
            <Testimonials
              testimonials={[
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
              ]}
            />
          </div>
        </ScrollFade>
      </main>

      <Footer />
    </div>
  );
};

export default Home;