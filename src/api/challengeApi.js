import api from "./api";

// Fetch all active challenges
export const getActiveChallenges = () => api.get("/challenges");

// Join a specific challenge
export const joinChallenge = (challengeId) => api.post(`/challenges/${challengeId}/join`);

// Get user's joined challenges
export const getMyChallenges = () => api.get("/challenges/my");