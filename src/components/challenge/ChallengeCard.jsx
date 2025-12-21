export default function ChallengeCard({ challenge, onJoin }) {
  const duration =
    challenge.startDate && challenge.endDate
      ? Math.ceil(
          (new Date(challenge.endDate) - new Date(challenge.startDate)) /
            (1000 * 60 * 60 * 24)
        )
      : challenge.type === "daily"
      ? 1
      : 7;

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border">
      <h3 className="text-lg font-semibold">{challenge.title}</h3>

      <p className="text-sm text-gray-600 mt-1">
        {challenge.description || "No description"}
      </p>

      <div className="flex justify-between mt-4 text-sm">
        <span>⏳ {duration} days</span>
        <span>🏆 {challenge.rewardPoints} pts</span>
      </div>

      {challenge.joined ? (
        <button
          disabled
          className="mt-4 w-full bg-gray-300 text-gray-600 py-2 rounded"
        >
          Joined
        </button>
      ) : (
        <button
          onClick={() => onJoin(challenge._id)}
          className="mt-4 w-full bg-black text-white py-2 rounded hover:opacity-90"
        >
          Join Challenge
        </button>
      )}
    </div>
  );
}
