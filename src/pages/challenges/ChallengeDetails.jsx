import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/api"; // Your Axios instance

export default function ChallengeDetails() {
  const { id } = useParams();
  const [challenge, setChallenge] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const fetchDetails = async () => {
      const { data } = await api.get(`/challenges/${id}`);
      setChallenge(data);
    };
    fetchDetails();
  }, [id]);

  if (!challenge) return <div>Loading...</div>;

  const steps = challenge.recipe?.instructions || [];
  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
      
      {/* LEFT COLUMN: Recipe Steps */}
      <div className="lg:col-span-8">
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm font-medium mb-2">
            <span>Your Progress</span>
            <span className="text-orange-500">Step {currentStep + 1} of {steps.length}</span>
          </div>
          <div className="w-full bg-gray-200 h-2 rounded-full">
            <div 
              className="bg-orange-500 h-2 rounded-full transition-all" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Step Card */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <span className="bg-orange-500 text-white px-4 py-1 rounded-full text-sm">
              Step {currentStep + 1}
            </span>
            <span className="text-gray-400 text-sm">⏱️ 8 minutes</span>
          </div>

          <img 
            src={challenge.recipe?.image} 
            className="w-full h-80 object-cover rounded-2xl mb-6" 
            alt="Step" 
          />

          <h2 className="text-2xl font-bold mb-4">{steps[currentStep]?.title || "Instructions"}</h2>
          <p className="text-gray-600 mb-8">{steps[currentStep]?.text}</p>

          {/* Navigation Buttons */}
          <div className="flex gap-4">
            <button 
              disabled={currentStep === 0}
              onClick={() => setCurrentStep(prev => prev - 1)}
              className="flex-1 py-4 bg-gray-50 text-gray-500 rounded-2xl font-bold disabled:opacity-50"
            >
              ← Previous Step
            </button>
            <button 
              onClick={() => currentStep < steps.length - 1 ? setCurrentStep(prev => prev + 1) : handleComplete()}
              className="flex-1 py-4 bg-orange-500 text-white rounded-2xl font-bold"
            >
              {currentStep === steps.length - 1 ? "Complete Challenge" : "Next Step →"}
            </button>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Reward Sidebar */}
      <div className="lg:col-span-4 space-y-6">
        {/* Unlock Reward Widget */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 text-center">
          <p className="text-xs uppercase text-gray-400 font-bold mb-2">Unlock Reward</p>
          <h3 className="text-lg font-bold mb-4">{challenge.badge?.name}</h3>
          <div className="bg-orange-50 w-32 h-32 mx-auto rounded-2xl flex items-center justify-center mb-4">
             <span className="text-5xl">🛡️</span>
          </div>
          <div className="text-right text-xs text-orange-500 font-bold mb-1">{Math.round(progress)}%</div>
          <div className="w-full bg-gray-100 h-1.5 rounded-full">
            <div className="bg-orange-500 h-1.5 rounded-full" style={{ width: `${progress}%` }}></div>
          </div>
        </div>

        {/* Leaderboard Mockup */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          <h3 className="font-bold mb-4">Top Participants</h3>
          {[1, 2, 3].map(i => (
            <div key={i} className="flex items-center gap-3 mb-4">
              <span className="text-orange-500 font-bold w-4">{i}</span>
              <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-bold">@chef_user{i}</p>
                <p className="text-xs text-gray-400">2,450 pts</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}