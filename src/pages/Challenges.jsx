import React from "react";
import ChallengeCard from "../components/challenge/ChallengeCard";
import { useChallenges } from "../hooks/useChallenges";
import Navbar from "../components/common/Navbar";
import Footer from "../components/landing/Footer";
// Reuse the animation component you used in Home for consistency
import ScrollFade from "../components/ui/ScrollFade"; 

export default function Challenges() {
  const { challenges, loading, handleJoin } = useChallenges();

  // Helper function to render content to keep the main return clean
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

    return (
      <ScrollFade>
        <div className="flex-1 w-full max-w-6xl mx-auto px-6 py-10">
          <h1 className="text-3xl font-bold mb-2 text-center text-gray-900">
            Cooking <span className="text-red-600">Challenges</span>
          </h1>
          <p className="text-center text-gray-500 mb-10 max-w-2xl mx-auto">
            Join our weekly cooking battles and earn badges!
          </p>

          {challenges.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
              <p className="text-gray-500 text-lg">No challenges available at the moment.</p>
              <p className="text-sm text-gray-400 mt-2">Check back later!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {challenges.map((challenge) => (
                <ChallengeCard
                  key={challenge._id}
                  challenge={challenge}
                  onJoin={handleJoin}
                />
              ))}
            </div>
          )}
        </div>
      </ScrollFade>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
      {/* Navbar is rendered ONCE here. It will not flicker when loading changes. */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col">
        {renderContent()}
      </main>

      <Footer />
    </div>
  );
}