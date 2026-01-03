import { useEffect, useState } from "react";
import { getActiveChallenges, getMyChallenges, joinChallenge, unjoinChallenge } from "../../api/challengeApi"; // Added imports
import { toast } from "react-toastify";

export const useChallenges = () => {
  const [challenges, setChallenges] = useState([]);
  const [myChallenges, setMyChallenges] = useState([]); // Added myChallenges state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [activeData, myData] = await Promise.all([
        getActiveChallenges(),
        getMyChallenges()
      ]);

      // Handle active challenges
      const activeResult = activeData; // activeData is already the array
      if (Array.isArray(activeResult)) {
        setChallenges(activeResult);
      } else {
        setChallenges([]);
      }

      // Handle my challenges
      const myResult = myData; // myData is already the array
      if (Array.isArray(myResult)) {
        setMyChallenges(myResult);
      } else {
        setMyChallenges([]);
      }

    } catch (err) {
      console.error("Fetch Error:", err);
      setError("Failed to load challenges");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleJoin = async (id) => {
    try {
      await joinChallenge(id);
      toast.success("Challenge joined successfully!");
      fetchData(); // Refresh data
    } catch (err) {
      console.error("Join Error:", err);
      toast.error(err.response?.data?.message || "Failed to join challenge");
    }
  };

  const handleUnjoin = async (id) => {
    if (!window.confirm("Are you sure you want to unjoin? Progress will be lost.")) return;
    try {
      await unjoinChallenge(id);
      toast.success("Unjoined challenge.");
      fetchData(); // Refresh data
    } catch (err) {
      console.error("Unjoin Error:", err);
      toast.error("Failed to unjoin challenge");
    }
  };

  return { challenges, myChallenges, loading, error, handleJoin, handleUnjoin, refresh: fetchData };
};