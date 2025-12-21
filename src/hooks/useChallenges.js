import { useState, useEffect } from "react";
import {
  getAllChallenges,
  joinChallenge,
} from "../services/challengeService";

export const useChallenges = () => {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
const fetchChallenges = async () => {
  try {
    const data = await getAllChallenges();

    // if data is an object with challenges property, use that
    const challengesArray = Array.isArray(data) ? data : data.challenges || [];

    setChallenges(
      challengesArray.map((c) => ({
        ...c,
        joined: false,
      }))
    );
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};


  const handleJoin = async (challengeId) => {
    await joinChallenge(challengeId);

    setChallenges((prev) =>
      prev.map((c) =>
        c._id === challengeId ? { ...c, joined: true } : c
      )
    );
  };

  useEffect(() => {
    fetchChallenges();
  }, []);

  return { challenges, loading, handleJoin };
};
