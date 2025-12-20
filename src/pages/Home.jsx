import React from 'react';
import { useRecipes } from '../hooks/useRecipes';
import Navbar from '../components/common/Navbar';
import RecipeCard from '../components/recipes/RecipeCard';
import Button from '../components/ui/Button';
import Footer from '../components/landing/Footer';
import Testimonials from '../components/Feedback/Testimonials';
import ScrollFade from '../components/ui/ScrollFade';

const Home = () => {
  const { data: recipes, isLoading, error } = useRecipes();

  if (isLoading)
    return <div className="min-h-screen flex items-center justify-center">Loading Recipes...</div>;

  if (error)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-red-500">
        <p>Error loading recipes</p>
        <p className="text-sm text-gray-500">{error.message}</p>
      </div>
    );

  const topChoices = recipes?.slice(0, 4) || [];
  const allRecipes = recipes || [];

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />

      {/* Hero */}
      <ScrollFade>
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
            <Button className="bg-red-600 text-white px-8 py-3 rounded-full hover:bg-red-700 shadow-lg shadow-red-200">
              Start Now
            </Button>
          </div>

          <div className="md:w-1/2 relative">
            <img
              src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c"
              alt="Healthy Salad"
              className="w-full max-w-md mx-auto rounded-full shadow-2xl border-4 border-white object-cover aspect-square"
            />
          </div>
        </section>
      </ScrollFade>

      {/* Top Choices */}
      <ScrollFade delay={0.1}>
        <section className="container mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">Top Choices</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {topChoices.map(recipe => (
              <RecipeCard key={recipe._id} recipe={recipe} />
            ))}
          </div>
        </section>
      </ScrollFade>

      {/* Categories */}
      <ScrollFade delay={0.15}>
        <section className="container mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
            Our Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Cake', 'Snacks', 'Beverage', 'Pizza'].map(cat => (
              <div key={cat} className="h-32 rounded-2xl bg-orange-100 flex items-end p-4 font-bold">
                {cat}
              </div>
            ))}
          </div>
        </section>
      </ScrollFade>

      {/* All Recipes */}
      <ScrollFade delay={0.2}>
        <section className="container mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">All Recipes</h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
            {allRecipes.map(recipe => (
              <RecipeCard key={recipe._id} recipe={recipe} />
            ))}
          </div>
        </section>
      </ScrollFade>

      {/* Testimonials */}
      <ScrollFade delay={0.25}>
        <Testimonials
          testimonials={[
            {
    message:
      "I think this is the best camping service I have ever tried and I recommend it to you.",
    name: "Theresa Jordan",
    role: "Traveler",
    avatar: "https://i.pravatar.cc/100?img=12",
    rating: 5,
  },
  {
    message:
      "Campty helps me a lot in finding interesting camping destinations.",
    name: "James Wilson",
    role: "Climber",
    avatar: "https://i.pravatar.cc/100?img=32",
    rating: 5,
  },
  {
    message:
      "Fun, from the city of waters not too far. Beautiful views, pretty and cool!",
    name: "Jhon Tosan",
    role: "Adventurer",
    avatar: "https://i.pravatar.cc/100?img=45",
    rating: 5,
  },
  {
    message:
      "Campty helps me a lot in finding interesting camping destinations.",
    name: "rambahadur",
    role: "Climber",
    avatar: "https://i.pravatar.cc/100?img=32",
    rating: 5,
  },
          ]}
        />
      </ScrollFade>

      <Footer />
    </div>
  );
};

export default Home;
