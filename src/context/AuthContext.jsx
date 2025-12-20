import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
// import { loginUser, registerUser } from "../api/authApi"; // Will use direct axios for simplicity or integrate later

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Function to fetch fresh user data
    const fetchUser = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return;

            // Use axios directly or a dedicated api call (circular dependency warning with authApi if not careful)
            const response = await axios.get("http://localhost:5000/api/auth/me", {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.data.success) {
                setUser(response.data.user);
                localStorage.setItem("user", JSON.stringify(response.data.user));
            }
        } catch (error) {
            console.error("Failed to fetch user", error);
            if (error.response?.status === 401) logout();
        }
    };

    // Initialize Auth State from Token
    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem("token");
            const storedUser = localStorage.getItem("user");

            if (token) {
                if (storedUser) setUser(JSON.parse(storedUser));
                await fetchUser(); // Always refresh to get latest savedRecipes
            }
            setLoading(false);
        };
        checkAuth();
    }, []);

    const login = async (email, password) => {
        try {
            const response = await axios.post("http://localhost:5000/api/auth/login", { email, password });
            const { user, token } = response.data;

            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));
            setUser(user);
            return { success: true };
        } catch (error) {
            console.error("Login failed", error);
            return {
                success: false,
                message: error.response?.data?.message || "Login failed"
            };
        }
    };

    const register = async (userData) => {
        try {
            const response = await axios.post("http://localhost:5000/api/auth/register", userData);
            return { success: true };
        } catch (error) {
            console.error("Registration failed", error);
            return {
                success: false,
                message: error.response?.data?.message || error.response?.data?.errors?.username?.[0] || "Registration failed"
            };
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading, fetchUser }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
