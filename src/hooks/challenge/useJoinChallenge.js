import { useState } from "react";
import { joinChallenge } from "../../api/challengeApi";

export const useJoinChallenge = () => {
  const [loading, setLoading] = useState(false);

  const join = async (challengeId) => {
    try {
      setLoading(true);
      await joinChallenge(challengeId);
      return true;
    } catch (error) {
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { join, loading };
};
