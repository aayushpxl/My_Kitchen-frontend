import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";

import Home from "../pages/Home";
import Welcome from "../pages/Welcome";
import Register from "../pages/Register";
// import Dashboard from "../pages/Dashboard"; // Deprecated/Removed
import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";
import RecipeDetail from "../pages/recipes/RecipeDetail";
import AddRecipe from "../pages/admin/AddRecipe";
import Recipes from "../pages/Recipes";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Welcome />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/recipes/:id" element={<RecipeDetail />} />

        {/* Auth Pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/dashboard" element={<Home />} /> {/* Alias for backward compatibility if needed */}
        </Route>

        {/* Admin Routes */}
        <Route element={<AdminRoute />}>
          <Route path="/admin/add-recipe" element={<AddRecipe />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
