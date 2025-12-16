import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import LandingPage from "../pages/landingpage/LandingPage";
import TailwindTest from "../pages/landingpage/TailwindTest";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import ProtectedRoute from "./ProtectedRoute";


const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing Page (default) */}
        <Route path="/" element={<LandingPage />} />

        {/* Auth Pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
