import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getChallengeById, joinChallenge, getMyChallenges } from "../../api/challengeApi";
import { useAuth } from "../../context/AuthContext";
import Navbar from "../../components/common/Navbar";
import { toast } from "react-toastify";
import Button from "../../components/ui/Button";
import { getImageUrl } from "../../utils/imageUtils";

export default function ChallengeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [challenge, setChallenge] = useState(null);
  const [isJoined, setIsJoined] = useState(false);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [details, myChallenges] = await Promise.all([
          getChallengeById(id),
          getMyChallenges() // To check if joined
        ]);

        setChallenge(details);

        // Check if user has already joined this challenge
        const joined = myChallenges.some(uc =>
          (typeof uc.challenge === 'string' ? uc.challenge === id : uc.challenge._id === id) &&
          uc.status !== 'completed' // If completed, maybe still show as joined or completed logic?
          // Actually, if completed, we might want to show "Completed".
        );

        // Better logic: Find the specific user challenge record
        const userChallengeRecord = myChallenges.find(uc =>
          (typeof uc.challenge === 'string' ? uc.challenge === id : uc.challenge._id === id)
        );

        if (userChallengeRecord) {
          setIsJoined(true);
          // We could store status here too if we want to show "Completed" differently
        }

      } catch (error) {
        console.error("Failed to fetch details", error);
        toast.error("Could not load challenge details");
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchData();
  }, [id, user]);

  const handleJoin = async () => {
    setActionLoading(true);
    try {
      await joinChallenge(id);
      setIsJoined(true);
      toast.success("Joined Successfully! Let's get cooking! 👨‍🍳");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to join");
    } finally {
      setActionLoading(false);
    }
  };

  const handleStart = () => {
    // Navigate to the LOCKABLE recipe page
    navigate(`/challenges/recipe/${challenge.recipe._id || challenge.recipe}`);
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!challenge) return <div className="min-h-screen flex items-center justify-center">Challenge not found</div>;

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 py-8 pt-24">
        {/* Back Link */}
        <button onClick={() => navigate('/challenges')} className="text-gray-500 hover:text-orange-600 mb-6 flex items-center gap-2 font-medium">
          ← Back to Challenges
        </button>

        <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
          {/* Hero Section with Image */}
          <div className="relative h-64 md:h-96 w-full">
            <img
              src={getImageUrl(challenge.recipe?.image || challenge.image)}
              alt={challenge.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 text-white">
              <div className="flex items-center gap-4 mb-4">
                <span className="bg-orange-500 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
                  {challenge.difficulty || "Medium"} Difficulty
                </span>
                <span className="bg-white/20 backdrop-blur px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-white/30">
                  {challenge.points} Points Reward
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black mb-4 leading-tight">{challenge.title}</h1>
              <p className="text-lg md:text-xl text-gray-200 max-w-2xl font-medium leading-relaxed">{challenge.description}</p>
            </div>
          </div>

          <div className="p-8 md:p-12 grid md:grid-cols-3 gap-12">
            {/* Left: Info & Actions */}
            <div className="md:col-span-2 space-y-10">
              {/* Badge Reward */}
              {challenge.badge && (
                <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-8 rounded-3xl border border-orange-100 flex items-center gap-6">
                  <div className="bg-white p-4 rounded-2xl shadow-sm text-4xl">
                    {challenge.badge.icon || "🏆"}
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-gray-900 mb-1">Earn the "{challenge.badge.name}" Badge</h3>
                    <p className="text-gray-600">Complete this challenge to add this exclusive badge to your profile.</p>
                  </div>
                </div>
              )}

              {/* About the Recipe */}
              <div>
                <h3 className="text-2xl font-black text-gray-900 mb-6">The Challenge Recipe</h3>
                <div className="flex items-start gap-6">
                  <img
                    src={getImageUrl(challenge.recipe?.image)}
                    className="w-24 h-24 rounded-2xl object-cover shadow-md"
                    alt="Recipe"
                  />
                  <div>
                    <h4 className="text-xl font-bold text-gray-800 mb-2">{challenge.recipe?.title}</h4>
                    <p className="text-gray-500 leading-relaxed mb-4 line-clamp-2">{challenge.recipe?.description}</p>
                    <div className="flex gap-4 text-sm font-bold text-gray-400">
                      <span>⏱️ {challenge.recipe?.cookingTime || "45m"}</span>
                      <span>🔥 {challenge.recipe?.nutrition?.calories || "400"} Kcal</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: CTA & Stats */}
            <div className="md:col-span-1 space-y-6">
              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-lg shadow-orange-50 sticky top-24">
                <div className="text-center mb-8">
                  <p className="text-gray-400 font-medium mb-1">Time Remaining</p>
                  <h3 className="text-3xl font-black text-gray-900">
                    {challenge.endDate ? new Date(challenge.endDate).toLocaleDateString() : "Ongoing"}
                  </h3>
                </div>

                {isJoined ? (
                  <Button
                    onClick={handleStart}
                    className="w-full py-4 text-lg bg-green-500 hover:bg-green-600 text-white rounded-2xl shadow-xl shadow-green-100 transition-all active:scale-95 mb-4"
                  >
                    Start Cooking Now 🍳
                  </Button>
                ) : (
                  <Button
                    onClick={handleJoin}
                    disabled={actionLoading}
                    className="w-full py-4 text-lg bg-orange-600 hover:bg-black text-white rounded-2xl shadow-xl shadow-orange-100 transition-all active:scale-95 mb-4"
                  >
                    {actionLoading ? "Joining..." : "Join Challenge"}
                  </Button>
                )}

                <p className="text-center text-xs text-gray-400 px-4">
                  {isJoined
                    ? "You have joined this challenge. Good luck!"
                    : "Join now to unlock the recipe steps and start earning rewards."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}