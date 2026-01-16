import axios from 'axios';

const API_URL = 'http://localhost:5000/api/general';

const getPublicStats = async () => {
    const response = await axios.get(`${API_URL}/stats`);
    return response.data;
};

const publicService = {
    getPublicStats
};

export default publicService;
