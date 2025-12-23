import { useState } from "react";
import { completeChallenge } from "../../api/challengeApi";

export const useCompleteChallenge = () => {
  const [loading, setLoading] = useState(false);

  const complete = async (userChallengeId) => {
    try {
      setLoading(true);
      const data = await completeChallenge(userChallengeId);
      return data;
    } finally {
      setLoading(false);
    }
  };

  return { complete, loading };
};
