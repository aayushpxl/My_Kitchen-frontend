import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import { Navigate } from "react-router-dom";
import AdminLayout from "../components/layout/AdminLayout";

import Home from "../pages/Home";
import Welcome from "../pages/Welcome";
import Register from "../pages/Register";
// import Dashboard from "../pages/Dashboard"; // Deprecated/Removed
import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";
import RecipeDetail from "../pages/recipes/RecipeDetail";
import AddRecipe from "../pages/admin/AddRecipe";
import Recipes from "../pages/Recipes";
import Challenges from "../pages/Challenges";
import Profile from "../pages/Profile";
import ChallengeDetails from "../pages/challenges/ChallengeDetails";
import MealPlanner from "../pages/MealPlanner";
import AdminHome from "../pages/admin/AdminHome";
import AdminRecipes from "../pages/admin/AdminRecipes";
import AdminChallenges from "../pages/admin/AdminChallenges";
import CreateChallenge from "../pages/admin/CreateChallenge";
import AdminUsers from "../pages/admin/AdminUsers";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Welcome />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/recipes/:id" element={<RecipeDetail />} />
        <Route path="/challenges" element={<Challenges />} />
        <Route path="/profile" element={<Profile />} />


        {/* challange route */}
        <Route path="/challenges/:id" element={<ChallengeDetails />} />


        <Route path="/meal-planning" element={<MealPlanner />} />




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
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<AdminHome />} />
            <Route path="recipes" element={<AdminRecipes />} />
            <Route path="add-recipe" element={<AddRecipe />} />
            <Route path="challenges" element={<AdminChallenges />} />
            <Route path="create-challenge" element={<CreateChallenge />} />
            <Route path="edit-challenge/:id" element={<CreateChallenge />} />

            <Route path="users" element={<AdminUsers />} />
            {/* Future routes will be added here */}
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
