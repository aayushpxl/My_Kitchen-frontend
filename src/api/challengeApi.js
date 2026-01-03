import axios from 'axios';

const API_URL = 'http://localhost:5000/api/challenges';

const getAuthHeader = () => {
    const token = sessionStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
};

// Public/User
export const getActiveChallenges = async () => {
    const response = await axios.get(`${API_URL}`);
    return response.data;
};

export const getChallengeById = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};

export const joinChallenge = async (id) => {
    const response = await axios.post(`${API_URL}/${id}/join`, {}, {
        headers: getAuthHeader()
    });
    return response.data;
};

export const getMyChallenges = async () => {
    const response = await axios.get(`${API_URL}/my`, {
        headers: getAuthHeader()
    });
    return response.data;
};

export const completeChallenge = async (id) => {
    const response = await axios.put(`${API_URL}/complete/${id}`, {}, {
        headers: getAuthHeader()
    });
    return response.data;
};

// Admin
export const getAllChallengesAdmin = async () => {
    const response = await axios.get(`${API_URL}/admin/all`, {
        headers: getAuthHeader()
    });
    return response.data;
};

export const createChallenge = async (data) => {
    const response = await axios.post(API_URL, data, {
        headers: getAuthHeader()
    });
    return response.data;
};

export const updateChallenge = async (id, data) => {
    const response = await axios.put(`${API_URL}/${id}`, data, {
        headers: getAuthHeader()
    });
    return response.data;
};

export const deleteChallenge = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`, {
        headers: getAuthHeader()
    });
    return response.data;
};

export const unjoinChallenge = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}/unjoin`, {
        headers: getAuthHeader()
    });
    return response.data;
};

export const getLeaderboard = async () => {
    const response = await axios.get(`${API_URL}/leaderboard`);
    return response.data;
};

export const checkChallengeCompletion = async (recipeId) => {
    const response = await axios.post(`${API_URL}/complete-by-recipe`, { recipeId }, {
        headers: getAuthHeader()
    });
    return response.data;
};

export const getChallengeParticipants = async (challengeId) => {
    const response = await axios.get(`${API_URL}/${challengeId}/participants`, {
        headers: getAuthHeader()
    });
    return response.data;
};

export const getChallengeLockStatus = async (recipeId) => {
    const response = await axios.get(`${API_URL}/recipe/${recipeId}/lock-status`, {
        headers: getAuthHeader()
    });
    return response.data;
};