import React from 'react';
import { useRecipes } from '../hooks/useRecipes';
import Navbar from '../components/common/Navbar';
import RecipeCard from '../components/recipes/RecipeCard';
import Button from '../components/ui/Button';

const Home = () => {
  const { data: recipes, isLoading, error } = useRecipes();
  console.log("RECIPES DATA:", recipes);
  console.log("IS LOADING:", isLoading);
  console.log("ERROR:", error);

  if (isLoading) return <div className="min-h-screen flex items-center justify-center">Loading Recipes...</div>;
  if (error) return (
    <div className="min-h-screen flex flex-col items-center justify-center text-red-500">
      <p>Error loading recipes</p>
      <p className="text-sm text-gray-500">{error.message}</p>
    </div>
  );

  // Categorize (Simulated for now based on limited data)
  const topChoices = recipes?.slice(0, 4) || [];
  const allRecipes = recipes || [];

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 md:py-20 flex flex-col md:flex-row items-center gap-12">
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
            Healthy <span className="text-red-600">Eating</span> is <br />
            an <span className="text-orange-400">Important</span> Part <br />
            of Lifestyle
          </h1>
          <p className="text-gray-500 text-lg max-w-md">
            View recipe and start to make one.
            We have complete recipes for your daily needs.
          </p>
          <div className="flex gap-4">
            <Button className="bg-red-600 text-white px-8 py-3 rounded-full hover:bg-red-700 shadow-lg shadow-red-200">
              Start Now
            </Button>
          </div>
        </div>
        <div className="md:w-1/2 relative">
          {/* Decorative Elements mimicking the design */}
          <div className="absolute -top-10 -right-10 w-64 h-64 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>

          <img
            src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            alt="Healthy Salad"
            className="relative z-10 w-full max-w-md mx-auto rounded-full shadow-2xl border-4 border-white object-cover aspect-square"
          />

          {/* Floating Badges */}
          <div className="absolute top-1/4 left-10 bg-white p-3 rounded-xl shadow-lg flex items-center gap-2 z-20">
            <span className="text-xl">⏱️</span>
            <div>
              <p className="text-xs font-bold text-gray-800">Less Time</p>
              <p className="text-[10px] text-gray-400">Under 30 min</p>
            </div>
          </div>
          <div className="absolute bottom-1/4 right-0 bg-white p-3 rounded-xl shadow-lg flex items-center gap-2 z-20">
            <span className="text-xl">🏃</span>
            <div>
              <p className="text-xs font-bold text-gray-800">Healthy</p>
              <p className="text-[10px] text-gray-400">Low Calorie</p>
            </div>
          </div>
        </div>
      </section>

      {/* Top Choices */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-8">Top Choices</h2>
        {topChoices.length === 0 ? (
          <div className="text-center py-10 bg-white rounded-xl shadow-sm">
            <p className="text-gray-500">No recipes found. Seed the database to view recipes.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {topChoices.map(recipe => (
              <RecipeCard key={recipe._id} recipe={recipe} />
            ))}
          </div>
        )}
      </section>

      {/* Categories (Static for Visual) */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Our Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['Cake', 'Snacks', 'Beverage', 'Pizza'].map((cat, idx) => (
            <div key={idx} className="relative h-32 rounded-2xl overflow-hidden cursor-pointer group shadow-sm hover:shadow-md transition">
              <div className={`absolute inset-0 ${idx === 0 ? 'bg-pink-100' : idx === 1 ? 'bg-blue-100' : idx === 2 ? 'bg-red-100' : 'bg-orange-100'
                }`}></div>
              <span className="absolute bottom-4 left-4 font-bold text-xl text-gray-800 z-10">{cat}</span>
              {/* In a real app, we'd have images here */}
            </div>
          ))}
        </div>
      </section>

      {/* All Recipes */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-8">All Recipes</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {allRecipes.map(recipe => (
            <RecipeCard key={recipe._id} recipe={recipe} />
          ))}
        </div>
      </section>

      {/* Testimonials (Static) */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">What Our Community Says</h2>
        <p className="text-gray-500 mb-12">Real stories from home-cooks who transformed their cooking skills</p>

        <div className="grid md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-left">
              <div className="flex gap-1 text-yellow-400 mb-4">★★★★★</div>
              <p className="text-gray-600 text-sm mb-6">
                "This kitchen app completely changed how I approach cooking. The recipes are easy to follow and delicious!"
              </p>
              <div className="flex items-center gap-3">
                <img src={`https://ui-avatars.com/api/?name=User+${i}&background=random`} className="w-10 h-10 rounded-full" alt="User" />
                <div>
                  <p className="font-bold text-sm text-gray-800">Happy User {i}</p>
                  <p className="text-xs text-gray-400">New York, USA</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>


    </div>
  );
};

export default Home;