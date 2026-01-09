import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getImageUrl } from "../../utils/imageUtils";

export default function ChallengeCard({ challenge, onJoin, onUnjoin, isJoined: initialJoined, loading }) {
  const navigate = useNavigate();
  // If initialJoined is provided (from parent), use it. Otherwise default false.
  // Ideally, parent controls this fully, but we kept local state previously.
  // Let's rely on props if passed, or just use the prop directly if we are confident data refetch works.

  // Actually, to make "Unjoin" work dynamically, we should rely on the parent's data. 
  // "initialJoined" suggests it's just initial. Let's rename prop to `joined` for clarity in usage.
  const joined = initialJoined;

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
    // Always go to challenge details first
    navigate(`/challenges/${challenge._id}`);
  };

  const handleActionClick = async (e) => {
    e.stopPropagation();
    if (loading) return;

    if (joined) {
      if (onUnjoin) onUnjoin(challenge._id);
    } else {
      if (onJoin) onJoin(challenge._id);
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className="cursor-pointer bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 flex flex-col h-full hover:shadow-md transition-shadow duration-300 group"
    >
      <div className="h-48 w-full overflow-hidden bg-gray-100 relative">
        <img
          src={getImageUrl(challenge.recipe?.image || challenge.image)}
          alt={challenge.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {joined && (
          <div className="absolute top-4 right-4 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
            Active
          </div>
        )}
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
              <img src={getImageUrl(challenge.badge.icon)} alt="badge" className="w-6 h-6" />
            )}
            <span className="text-[10px] font-bold text-gray-400">{challenge.badge?.name}</span>
          </div>
        </div>

        <div className="mt-auto">
          <button
            onClick={handleActionClick}
            disabled={loading}
            className={`w-full py-3 rounded-2xl font-bold shadow-lg transition-all active:scale-[0.98] ${joined
              ? "bg-red-50 text-red-500 hover:bg-red-100 border border-red-100"
              : "bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white"
              }`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                Processing...
              </span>
            ) : joined ? (
              "Unjoin Challenge"
            ) : (
              "Join Now"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}