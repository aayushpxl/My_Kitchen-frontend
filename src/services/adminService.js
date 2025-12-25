import axios from 'axios';

const API_URL = 'http://localhost:5000/api/admin';

// Get auth header helper
const getAuthHeader = () => {
    const token = localStorage.getItem('token'); // Consistent with other services
    // Or user object if that's how it's stored, checking others used localStorage.getItem('token')
    if (token) {
        return { Authorization: `Bearer ${token}` };
    }
    // Fallback if token is inside user object
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
        return { Authorization: `Bearer ${user.token}` };
    }
    return {};
};

const getDashboardStats = async () => {
    const response = await axios.get(`${API_URL}/stats`, {
        headers: getAuthHeader()
    });
    return response.data;
};

const getAllUsers = async () => {
    const response = await axios.get(`${API_URL}/users`, {
        headers: getAuthHeader()
    });
    return response.data;
};

const adminService = {
    getDashboardStats,
    getAllUsers
};

export default adminService;
