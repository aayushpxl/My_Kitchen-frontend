import React from 'react';
import Button from '../ui/Button';
import pastaImage from '../../assets/landing/pasta_challenge.png';

const WeeklyChallengeSection = () => {
    return (
        <section className="py-20 px-6 max-w-7xl mx-auto">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800">Featured Weekly Challenge</h2>
                <p className="text-gray-500 mt-2">Join thousands of home cooks in this week's exciting culinary challenge.</p>
            </div>

            <div className="bg-green-50 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 md:gap-16">
                <div className="w-full md:w-1/3">
                    <div className="aspect-video bg-gray-300 rounded-xl overflow-hidden shadow-md relative group">
                        <img
                            src={pastaImage}
                            alt="Master Italian Pasta"
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                    </div>
                </div>

                <div className="flex-1 space-y-4">
                    <span className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                        Weekly Challenge
                    </span>
                    <h3 className="text-3xl font-bold text-gray-900">Master Italian Pasta Week</h3>
                    <p className="text-gray-600">
                        Learn to create authentic Italian pasta dishes from scratch. Complete 3 recipes this week to earn exclusive badges.
                    </p>

                    <div className="flex items-center gap-4 text-sm text-gray-500 py-2">
                        <span>📅 4 days remaining</span>
                        <span>👥 2,451 participants</span>
                    </div>

                    <Button variant="primary">Join Challenge</Button>
                </div>
            </div>
        </section>
    );
};

export default WeeklyChallengeSection;
