import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

// Centralized API instance
const api = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Attach token automatically
  api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  // Fetch logged-in user
  const fetchUser = async () => {
    try {
      const response = await api.get("/auth/me");

      if (response.data?.success) {
        setUser(response.data.user);
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }
    } catch (error) {
      console.error("Failed to fetch user", error);
      if (error.response?.status === 401) {
        logout();
      }
    }
  };

  // Initialize auth on app load
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");

      if (token && storedUser) {
        setUser(JSON.parse(storedUser));
        await fetchUser();
      }

      setLoading(false);
    };

    initAuth();
  }, []);

  // LOGIN
  const login = async (email, password) => {
    try {
      const response = await api.post("/auth/login", {
        email: email.toLowerCase().trim(),
        password,
      });

      const { user, token } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);

      return { success: true, user };
    } catch (error) {
      console.error("Login failed", error);
      return {
        success: false,
        message: error.response?.data?.message || "Invalid email or password",
      };
    }
  };

  // REGISTER
  const register = async (userData) => {
    try {
      await api.post("/auth/register", {
        ...userData,
        email: userData.email.toLowerCase().trim(),
      });

      return { success: true };
    } catch (error) {
      console.error("Registration failed", error);

      return {
        success: false,
        message:
          error.response?.data?.message ||
          error.response?.data?.errors?.username?.[0] ||
          error.response?.data?.errors?.email?.[0] ||
          "Registration failed",
      };
    }
  };

  // LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        loading,
        fetchUser,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
