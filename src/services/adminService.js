import axios from 'axios';

const API_URL = 'http://localhost:5000/api/admin';

// Get auth header helper
const getAuthHeader = () => {
    const token = sessionStorage.getItem('token');
    if (token) {
        return { Authorization: `Bearer ${token}` };
    }
    return {};
};

const getDashboardStats = async () => {
    const response = await axios.get(`${API_URL}/stats`, {
        headers: getAuthHeader().headers // getAuthHeader returns helper object, or we adjust usage
    });
    return response.data;
};

// Fixing helper usage - getAuthHeader returns { Authorization: ... } usually
// Let's make it return the full headers object as axios expects
const getHeaders = () => {
    const token = sessionStorage.getItem('token');
    return {
        headers: {
            Authorization: token ? `Bearer ${token}` : ''
        }
    };
};

const getDashboardStatsFixed = async () => {
    const response = await axios.get(`${API_URL}/stats`, getHeaders());
    return response.data;
};

const getDashboardAnalytics = async () => {
    const response = await axios.get(`${API_URL}/analytics`, getHeaders());
    return response.data;
};

const getRecentActivity = async () => {
    const response = await axios.get(`${API_URL}/recent-activity`, getHeaders());
    return response.data;
};

const getAllUsers = async () => {
    const response = await axios.get(`${API_URL}/users`, getHeaders());
    return response.data;
};

const getUserById = async (id) => {
    const response = await axios.get(`${API_URL}/users/${id}`, getHeaders());
    return response.data;
};

const toggleBanUser = async (id) => {
    const response = await axios.put(`${API_URL}/users/${id}/ban`, {}, getHeaders());
    return response.data;
};

const adminService = {
    getDashboardStats: getDashboardStatsFixed,
    getAllUsers,
    getUserById,
    getDashboardAnalytics,
    getRecentActivity,
    toggleBanUser
};

export default adminService;
