import { useEffect, useState } from "react";
import { getMyChallenges } from "../../api/challengeApi";

export const useMyChallenges = () => {
  const [myChallenges, setMyChallenges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyChallenges = async () => {
      try {
        const data = await getMyChallenges();
        setMyChallenges(data);
      } finally {
        setLoading(false);
      }
    };

    fetchMyChallenges();
  }, []);

  return { myChallenges, loading };
};
