import axios from 'axios';

const API_URL = 'http://localhost:5000/api/recipes';

// Helper for auth headers
const getAuthHeader = () => {
    const token = sessionStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
};

export const getAllRecipes = async () => {
    const response = await axios.get(API_URL, {
        headers: getAuthHeader()
    });
    return response.data;
};

export const getRecipeById = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`, {
        headers: getAuthHeader()
    });
    return response.data;
};

export const createRecipe = async (recipeData) => {
    const response = await axios.post(API_URL, recipeData, {
        headers: {
            ...getAuthHeader(),
            'Content-Type': recipeData instanceof FormData ? 'multipart/form-data' : 'application/json'
        }
    });
    return response.data;
};

export const updateRecipe = async (id, recipeData) => {
    const response = await axios.put(`${API_URL}/${id}`, recipeData, {
        headers: {
            ...getAuthHeader(),
            'Content-Type': recipeData instanceof FormData ? 'multipart/form-data' : 'application/json'
        }
    });
    return response.data;
};

export const deleteRecipe = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`, {
        headers: getAuthHeader()
    });
    return response.data;
};

export const toggleSaveRecipe = async (id) => {
    const response = await axios.post(`${API_URL}/${id}/save`, {}, {
        headers: getAuthHeader()
    });
    return response.data;
};

export const getMyRecipes = async () => {
    const response = await axios.get(`${API_URL}/my-recipes`, {
        headers: getAuthHeader()
    });
    return response.data;
};

export const getSavedRecipes = async () => {
    const response = await axios.get(`${API_URL}/saved/all`, {
        headers: getAuthHeader()
    });
    return response.data;
};

export const addReview = async (id, reviewData) => {
    const response = await axios.post(`${API_URL}/${id}/review`, reviewData, {
        headers: getAuthHeader()
    });
    return response.data;
};

export const deleteReview = async (id, reviewId) => {
    const response = await axios.delete(`${API_URL}/${id}/review/${reviewId}`, {
        headers: getAuthHeader()
    });
    return response.data;
};
