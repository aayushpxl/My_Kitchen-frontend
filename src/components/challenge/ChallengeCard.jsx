import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ChallengeCard({ challenge, onJoin, loading }) {
  const navigate = useNavigate();
  const [isJoined, setIsJoined] = useState(false);

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

  const handleCardClick = () => {
    navigate(`/challenges/${challenge._id}`);
  };

  const handleJoinClick = async (e) => {
    e.stopPropagation(); // Prevents navigating to details page
    if (isJoined) return;

    const success = await onJoin(challenge._id);
    if (success) {
      setIsJoined(true);
    }
  };

  return (
    <div 
      onClick={handleCardClick}
      className="cursor-pointer bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 flex flex-col h-full hover:shadow-md transition-shadow duration-300"
    >
      <div className="h-48 w-full overflow-hidden bg-gray-100">
        <img
          src={challenge.image || "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=500&q=80"}
          alt={challenge.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight">
          {challenge.title}
        </h3>

        <p className="text-gray-500 text-sm mb-4 line-clamp-2">
          {challenge.description}
        </p>

        <div className="flex items-center gap-2 text-gray-500 mb-4">
          <span className="text-xs font-medium">📅 {dateRange}</span>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div className="bg-orange-100 text-orange-600 px-3 py-1.5 rounded-full flex items-center gap-1.5">
            <span className="text-xs font-bold">🪙 {challenge.points || 0} Points</span>
          </div>

          <div className="flex items-center gap-2">
            {challenge.badge?.icon && (
               <img src={challenge.badge.icon} alt="badge" className="w-6 h-6" />
            )}
            <span className="text-[10px] font-bold text-gray-400">{challenge.badge?.name}</span>
          </div>
        </div>

        <div className="mt-auto">
          <button
            onClick={handleJoinClick}
            disabled={loading || isJoined}
            className={`w-full py-3 rounded-2xl font-bold shadow-lg transition-all active:scale-[0.98] ${
              isJoined 
                ? "bg-green-100 text-green-600 cursor-default" 
                : "bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white"
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Joining...
              </span>
            ) : isJoined ? (
              "✓ Joined"
            ) : (
              "Join Now"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}