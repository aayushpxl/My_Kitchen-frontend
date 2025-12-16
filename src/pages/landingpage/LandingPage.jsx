// src/components/LandingPage.jsx
import React from 'react';
import NavBar from './NavBar';
import HeroSection from '../../components/landing/HeroSection';
import FeaturesSection from '../../components/landing/FeaturesSection';
import PopularDishesSection from '../../components/landing/PopularDishesSection';
import WeeklyChallengeSection from '../../components/landing/WeeklyChallengeSection';
import Footer from '../../components/landing/Footer';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      <NavBar />
      <HeroSection />
      <FeaturesSection />
      <PopularDishesSection />
      <WeeklyChallengeSection />
      <Footer />
    </div>
  );
};

export default LandingPage;