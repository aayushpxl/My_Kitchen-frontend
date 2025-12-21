// src/services/challengeService.js
import {
  fetchChallengesApi,
  joinChallengeApi,
  fetchMyChallengesApi,
} from "../api/challengeApi";

export const getAllChallenges = async () => {
  const res = await fetchChallengesApi();
  return res.data;
};

export const joinChallenge = async (id) => {
  const res = await joinChallengeApi(id);
  return res.data;
};

export const getMyChallenges = async () => {
  const res = await fetchMyChallengesApi();
  return res.data;
};
