import React from 'react';
import Button from '../ui/Button';

const HeroSection = () => {
    return (
        <section className="relative px-6 pt-12 pb-24 md:px-12 lg:px-24 flex flex-col md:flex-row items-center justify-between gap-12 bg-white overflow-hidden">

            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-green-50 rounded-bl-[100px] -z-10 hidden md:block"></div>

            {/* Text Content */}
            <div className="flex-1 space-y-6 md:max-w-xl">
                <p className="text-orange-500 font-medium tracking-wide">
                    Your smart cooking companion
                </p>
                <h1 className="text-4xl md:text-6xl font-serif font-bold text-gray-900 leading-tight">
                    Taste the joy of <span className="text-green-600 block">homemade cooking.</span>
                </h1>
                <p className="text-gray-500 text-lg leading-relaxed">
                    My Kitchen is your personal assistant designed to make meal preparation easier and more
                    inspiring. Browse thousands of curated recipes, search by ingredients you already have,
                    and discover healthy, quick, and budget-friendly meal ideas.
                </p>

                <div className="flex items-center gap-6 pt-4">
                    <Button variant="primary" className="px-8 py-3 text-lg">
                        Visit now
                    </Button>

                    <div className="flex items-center gap-3">
                        <div className="flex -space-x-3">
                            {/* Avatars placeholder */}
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-xs text-gray-500">
                                    U{i}
                                </div>
                            ))}
                        </div>
                        <div>
                            <p className="text-sm font-bold text-gray-800">Our Happy Users</p>
                            <div className="flex text-yellow-400 text-sm">
                                {'★'.repeat(5)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Hero Image */}
            <div className="flex-1 relative flex justify-center md:justify-end">
                <div className="relative w-72 h-72 md:w-[500px] md:h-[500px]">
                    {/* Main Dish Image Placeholder */}
                    <div className="w-full h-full rounded-full bg-orange-100 border-8 border-white shadow-2xl overflow-hidden flex items-center justify-center relative z-10">
                        <span className="text-orange-300 text-6xl">🥘</span>
                        {/* If real image exists, use <img src="..." /> */}
                    </div>

                    {/* Decor Elements */}
                    <div className="absolute -top-10 -right-10 w-24 h-24 bg-yellow-100 rounded-full blur-xl z-0"></div>
                    <div className="absolute bottom-10 -left-10 w-32 h-32 bg-green-100 rounded-full blur-xl z-0"></div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
