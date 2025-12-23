import { useEffect, useState } from "react";
import { getActiveChallenges } from "../../api/challengeApi";

export const useChallenges = () => {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        setLoading(true);
        const response = await getActiveChallenges();
        
        // Axios returns data in response.data
        const result = response.data;

        // If backend sends a single object, wrap it in an array [object]
        // If it's already an array, use it as is
        if (Array.isArray(result)) {
          setChallenges(result);
        } else if (result && typeof result === "object") {
          setChallenges([result]);
        } else {
          setChallenges([]);
        }

      } catch (err) {
        console.error("Fetch Error:", err);
        setError("Failed to load challenges");
      } finally {
        setLoading(false);
      }
    };

    fetchChallenges();
  }, []);

  return { challenges, loading, error };
};