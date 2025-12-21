import React from "react";

export default function ChallengeCard({ challenge, onJoin }) {
  // Calculate formatted dates for the display
  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const dateRange = challenge.startDate && challenge.endDate 
    ? `${formatDate(challenge.startDate)} - ${formatDate(challenge.endDate)}`
    : "Flexible Dates";

  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 flex flex-col h-full hover:shadow-md transition-shadow duration-300">
      {/* 1. Challenge Image */}
      <div className="h-48 w-full overflow-hidden bg-gray-100">
        <img
          src={challenge.image || "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=500&q=80"}
          alt={challenge.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* 2. Content Container */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight">
          {challenge.title}
        </h3>

        <p className="text-gray-500 text-sm mb-4 line-clamp-2">
          {challenge.description || "Share your culinary journey and compete for exciting prizes."}
        </p>

        {/* 3. Date Info */}
        <div className="flex items-center gap-2 text-gray-500 mb-4">
          <div className="w-4 h-4 bg-gray-400 rounded-sm flex-shrink-0"></div>
          <span className="text-xs font-medium">{dateRange}</span>
        </div>

        {/* 4. Reward Badge & Participants */}
        <div className="flex items-center justify-between mb-6">
          <div className="bg-orange-100 text-orange-600 px-3 py-1.5 rounded-full flex items-center gap-1.5">
            <span className="text-sm">🪙</span>
            <span className="text-xs font-bold">${challenge.rewardPoints || 0} Prize</span>
          </div>

          {/* Participant Avatars (Mockup) */}
          <div className="flex -space-x-2 overflow-hidden">
            {[1, 2, 3].map((i) => (
              <img
                key={i}
                className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                src={`https://i.pravatar.cc/100?img=${i + 10}`}
                alt="participant"
              />
            ))}
            <span className="flex items-center justify-center h-6 w-6 rounded-full bg-gray-50 ring-2 ring-white text-[10px] text-gray-500 font-bold">
              +12
            </span>
          </div>
        </div>

        {/* 5. Action Button */}
        <div className="mt-auto">
          {challenge.joined ? (
            <button
              disabled
              className="w-full bg-gray-100 text-gray-400 py-3 rounded-2xl font-bold cursor-not-allowed border border-gray-200"
            >
              Already Joined
            </button>
          ) : (
            <button
              onClick={() => onJoin(challenge._id)}
              className="w-full bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white py-3 rounded-2xl font-bold shadow-lg shadow-orange-100 transition-all active:scale-[0.98]"
            >
              Join Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
}