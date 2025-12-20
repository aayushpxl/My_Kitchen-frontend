import React from 'react';
import NavBar from './landingpage/NavBar'; // Public Navbar
import HeroSection from '../components/landing/HeroSection';
import FeaturesSection from '../components/landing/FeaturesSection';
import WeeklyChallengeSection from '../components/landing/WeeklyChallengeSection';
import PopularDishesSection from '../components/landing/PopularDishesSection';
import Footer from '../components/landing/Footer';
import ScrollFade from '../components/ui/ScrollFade'; // adjust the path if needed

const Welcome = () => {
    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <NavBar />

            {/* Wrap sections in ScrollFade */}
            <ScrollFade>
                <HeroSection />
            </ScrollFade>

            <ScrollFade delay={0.2}>
                <FeaturesSection />
            </ScrollFade>

            <ScrollFade delay={0.4}>
                <PopularDishesSection />
            </ScrollFade>

            <ScrollFade delay={0.6}>
                <WeeklyChallengeSection />
            </ScrollFade>

            <ScrollFade delay={0.8}>
                <Footer />
            </ScrollFade>
        </div>
    );
};

export default Welcome;
