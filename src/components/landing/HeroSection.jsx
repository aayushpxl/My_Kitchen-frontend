import React from 'react';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';
import landingImage from '../../assets/landing/man.png';

const HeroSection = () => {
    return (
        <section className="relative w-full min-h-screen bg-transparent overflow-hidden">
            {/* Background Decorative Elements - Connecting the design */}
            <div className="absolute top-[20%] right-[10%] w-[500px] h-[500px] bg-green-50 rounded-full blur-[120px] -z-10 opacity-60 animate-pulse"></div>
            <div className="absolute bottom-[10%] left-[5%] w-[400px] h-[400px] bg-orange-50 rounded-full blur-[100px] -z-10 opacity-60"></div>

            {/* Content Container - Symmetrical with NavBar */}
            <div className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-24 flex flex-col md:flex-row items-center justify-between gap-12 pt-32 md:pt-40 pb-20">

                {/* Text Content - Refined Hierarchy */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="md:flex-1 text-left z-10"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="space-y-8"
                    >
                        <div>
                            <p className="text-[#D98829] font-bold tracking-[0.2em] text-xs md:text-sm uppercase mb-3">
                                Your smart cooking companion
                            </p>

                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-gray-900 leading-[1.1] tracking-tight">
                                Taste the joy <br />
                                <span className="text-gray-900">of</span> <span className="text-[#7A9C59] italic relative inline-block">
                                    homemade
                                    <svg className="absolute w-full h-4 -bottom-1 left-0 text-[#7A9C59] opacity-30" viewBox="0 0 100 10" preserveAspectRatio="none">
                                        <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="none" />
                                    </svg>
                                </span> <br />
                                cooking.
                            </h1>
                        </div>

                        <p className="text-gray-600 text-lg md:text-xl leading-relaxed max-w-xl font-sans">
                            My Kitchen is your personal cooking assistant designed to make meal preparation easier and more
                            inspiring. Discover healthy, quick, and budget-friendly meal ideas.
                        </p>

                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-10 pt-4">
                            <motion.button
                                whileHover={{ scale: 1.05, shadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-[#D98829] text-white rounded-full px-12 py-5 text-xl font-bold shadow-2xl shadow-orange-200/50 transition-colors flex items-center gap-3 group"
                            >
                                Visit Now
                                <span className="bg-white/20 rounded-full p-1 group-hover:bg-white/30 transition-colors">→</span>
                            </motion.button>

                            <div className="flex items-center gap-5 cursor-default">
                                <div className="flex -space-x-4">
                                    {[1, 5, 9].map((img, i) => (
                                        <img
                                            key={i}
                                            src={`https://i.pravatar.cc/100?img=${img}`}
                                            alt="User"
                                            className="w-12 h-12 rounded-full border-2 border-white shadow-lg"
                                        />
                                    ))}
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-gray-800 uppercase tracking-widest">Happy Users</p>
                                    <div className="flex items-center gap-1 text-yellow-500">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
                                        ))}
                                        <span className="text-sm font-bold text-gray-500 ml-1">4.9</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Hero Image - Impactful & Integrated */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, x: 50 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                    className="md:flex-1 flex justify-center md:justify-end z-10"
                >
                    <div className="relative w-full max-w-[700px]">
                        <img
                            src={landingImage}
                            alt="Cooking Professional"
                            className="w-full h-auto max-h-[75vh] object-contain drop-shadow-[0_40px_80px_rgba(0,0,0,0.1)]"
                        />
                    </div>
                </motion.div>

            </div>
        </section>
    );
};

export default HeroSection;
