import React, { useState } from "react";
import ChallengeCard from "../components/challenge/ChallengeCard";
import ChallengeSearchBar from "../components/challenge/ChallengeSearchBar"; 
import { useChallenges } from "../hooks/challenge/useChallenges";
import Navbar from "../components/common/Navbar";
import Footer from "../components/landing/Footer";
import ScrollFade from "../components/ui/ScrollFade";

// --- Sidebar Components ---

const ActiveChallengesWidget = () => (
  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
    <div className="flex justify-between items-center mb-4">
      <h3 className="font-bold text-gray-900">Your Active Challenges</h3>
      <button className="text-xs text-gray-400 hover:text-orange-500">View All</button>
    </div>
    <div className="space-y-6">
      <div>
        <div className="flex justify-between text-sm mb-1">
          <span className="font-medium text-gray-700">30-Day Breakfast Challenge</span>
          <span className="text-green-500 font-bold">65%</span>
        </div>
        <p className="text-xs text-gray-400 mb-2">19 of 30 days</p>
        <div className="w-full bg-gray-100 rounded-full h-1.5">
          <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '65%' }}></div>
        </div>
      </div>
      <div>
        <div className="flex justify-between text-sm mb-1">
          <span className="font-medium text-gray-700">Healthy Bowl Competition</span>
          <span className="text-green-500 font-bold">40%</span>
        </div>
        <p className="text-xs text-gray-400 mb-2">2 of 5 recipes</p>
        <div className="w-full bg-gray-100 rounded-full h-1.5">
          <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '40%' }}></div>
        </div>
      </div>
    </div>
  </div>
);

const UpcomingDeadlinesWidget = () => (
  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
    <h3 className="font-bold text-gray-900 mb-4">Upcoming Deadlines</h3>
    <div className="space-y-4">
      {[
        { title: "Dessert Master Challenge", days: 3, color: "bg-orange-100 text-orange-600" },
        { title: "Healthy Bowl Competition", days: 5, color: "bg-red-100 text-red-600" },
        { title: "Quick Meals Sprint", days: 12, color: "bg-blue-100 text-blue-600" }
      ].map((item, idx) => (
        <div key={idx} className="flex items-start gap-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${item.color}`}>
            📅
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-800">{item.title}</h4>
            <p className="text-xs text-orange-500 font-medium">Ends in {item.days} days</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const CategoryPills = () => {
  const categories = ["Trending", "Cooking", "Baking", "Healthy", "Quick Meals", "Seasonal"];
  return (
    <div className="flex flex-wrap gap-2 my-6">
      {categories.map((cat, idx) => (
        <button
          key={cat}
          className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
            idx === 0 
              ? "bg-gray-900 text-white shadow-lg" 
              : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

// --- Main Page Component ---

export default function Challenges() {
  const { challenges, loading, handleJoin } = useChallenges();
  const [searchTerm, setSearchTerm] = useState("");

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex-1 flex items-center justify-center min-h-[50vh]">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-8 w-8 bg-orange-200 rounded-full mb-2"></div>
            <p className="text-gray-500 font-medium">Loading challenges...</p>
          </div>
        </div>
      );
    }

    const displayChallenges = challenges.filter(c => 
      c.title?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <ScrollFade>
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Challenges</h1>
            <p className="text-gray-500">Join and compete in community challenges</p>
          </div>

          <div className="mb-2">
            <ChallengeSearchBar value={searchTerm} onChange={setSearchTerm} />
          </div>

          <div className="mb-8">
            <h2 className="text-sm font-bold text-gray-900 mb-3">Categories</h2>
            <CategoryPills />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8">
              {displayChallenges.length === 0 ? (
                 <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
                   <p className="text-gray-500">No challenges found.</p>
                 </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {displayChallenges.map((challenge) => (
                    <ChallengeCard
                      key={challenge._id}
                      challenge={challenge}
                      onJoin={handleJoin}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="hidden lg:block lg:col-span-4 sticky top-24">
              <ActiveChallengesWidget />
              <UpcomingDeadlinesWidget />
            </div>
          </div>
        </div>
      </ScrollFade>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
      <Navbar />
      {/* FIX APPLIED HERE: 
        Added pt-24 (padding-top) to ensure the content starts 
        below the fixed navbar height.
      */}
      <main className="flex-1 flex flex-col pt-20 lg:pt-24">
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
}