import React from 'react';
import NavBar from './landingpage/NavBar'; // Public Navbar
import HeroSection from '../components/landing/HeroSection';
import FeaturesSection from '../components/landing/FeaturesSection';
import WeeklyChallengeSection from '../components/landing/WeeklyChallengeSection';
import PopularDishesSection from '../components/landing/PopularDishesSection';
import ReviewsSection from '../components/landing/ReviewsSection';
import Footer from '../components/landing/Footer';

const Welcome = () => {
    return (
        <div className="min-h-screen bg-transparent font-sans">
            <NavBar />
            <HeroSection />
            <FeaturesSection />
            <PopularDishesSection />
            <WeeklyChallengeSection />
            <ReviewsSection />
            <Footer />
        </div>
    );
};

export default Welcome;
