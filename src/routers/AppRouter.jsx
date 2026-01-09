import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import { Navigate } from "react-router-dom";
import AdminLayout from "../components/layout/AdminLayout";

import Home from "../pages/Home";
import Welcome from "../pages/Welcome";
import Register from "../pages/Register";
// import Dashboard from "../pages/Dashboard"; // Deprecated/Removed
import ProtectedRoute from "./ProtectedRoute";
import ChallengeList from "../pages/challenges/ChallengeList";
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
import AdminModeration from "../pages/admin/AdminModeration";
import AdminRecipeDetail from "../pages/admin/AdminRecipeDetail";
import PublicProfile from "../pages/PublicProfile";
import AdminUserDetail from "../pages/admin/AdminUserDetail";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/recipes/:id" element={<RecipeDetail />} />
        <Route path="/challenges" element={<Challenges />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/users/:id" element={<PublicProfile />} />


        {/* challange route */}
        <Route path="/challenges/:id" element={<ChallengeDetails />} />
        <Route path="/challenges/recipe/:id" element={<RecipeDetail />} />


        <Route path="/meal-planning" element={<MealPlanner />} />




        {/* Auth Pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/dashboard" element={<Home />} />
          {/* Moved Add/Edit Recipe to Profile sub-routes for better organization, as requested */}
          <Route path="/profile/create-recipe" element={<AddRecipe />} />
          <Route path="/profile/edit-recipe/:id" element={<AddRecipe />} />
        </Route>

        {/* Admin Routes */}
        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<AdminHome />} />
            <Route path="recipes" element={<AdminRecipes />} />
            <Route path="recipes/edit-recipe/:id" element={<AddRecipe />} />
            <Route path="recipe/:id" element={<AdminRecipeDetail source="recipes" />} />
            <Route path="moderation" element={<AdminModeration />} />
            <Route path="moderation/:id" element={<AdminRecipeDetail source="moderation" />} />
            <Route path="add-recipe" element={<AddRecipe />} /> {/* Existing add-recipe route */}
            <Route path="challenges" element={<AdminChallenges />} />
            <Route path="create-challenge" element={<CreateChallenge />} />
            <Route path="edit-challenge/:id" element={<CreateChallenge />} />

            <Route path="users" element={<AdminUsers />} />
            <Route path="users/:id" element={<AdminUserDetail />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
