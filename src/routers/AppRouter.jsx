import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import LandingPage from "../pages/landingpage/LandingPage";
import TailwindTest from "../pages/landingpage/TailwindTest";


const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing Page (default) */}
        <Route path="/" element={<LandingPage />} />

        {/* Login Page */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
