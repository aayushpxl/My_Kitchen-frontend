import React, { useEffect, useState } from 'react';
import Layout from '../components/common/Layout';
import bannerImg from '../assets/aboutus/banner.png';
import manImg from '../assets/aboutus/aboutusman.png';
import logoImg from '../assets/mykitchenlogo.png';
import { Trophy, BookOpen, Target, Search, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import publicService from '../services/publicService';

const AboutUs = () => {
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalRecipes: 0,
        totalChallengesCompleted: 0,
        communityAvatars: []
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await publicService.getPublicStats();
                if (res.success) {
                    setStats(res.data);
                }
            } catch (error) {
                console.error("Error fetching stats:", error);
            }
        };
        fetchStats();
    }, []);

    const fadeIn = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const features = [
        {
            icon: <Trophy className="text-white" size={24} />,
            bg: "bg-orange-500",
            title: "Earn Rewards",
            desc: "Collect badges and achievements as you complete recipes and challenges."
        },
        {
            icon: <BookOpen className="text-white" size={24} />,
            bg: "bg-orange-500",
            title: "Cook Step-by-Step",
            desc: "Follow easy-to-understand instructions with photos and videos."
        },
        {
            icon: <Target className="text-white" size={24} />,
            bg: "bg-orange-500",
            title: "Join Challenges",
            desc: "Participate in daily and weekly cooking challenges with the community."
        },
        {
            icon: <Search className="text-white" size={24} />,
            bg: "bg-orange-500",
            title: "Discover Recipes",
            desc: "Browse thousands of recipes from various cuisines and difficulty levels."
        }
    ];

    const communityStats = [
        {
            label: "Active Home Cooks",
            value: stats.totalUsers || 0,
            avatars: stats.communityAvatars.length > 0 ? stats.communityAvatars.slice(0, 3).map(u => `http://localhost:5000${u.profilePic}`) : ["https://i.pravatar.cc/150?u=1", "https://i.pravatar.cc/150?u=2", "https://i.pravatar.cc/150?u=3"]
        },
        {
            label: "Daily Challenges Completed",
            value: stats.totalChallengesCompleted || 0,
            avatars: stats.communityAvatars.length > 3 ? stats.communityAvatars.slice(3, 6).map(u => `http://localhost:5000${u.profilePic}`) : ["https://i.pravatar.cc/150?u=4", "https://i.pravatar.cc/150?u=5", "https://i.pravatar.cc/150?u=6"]
        },
        {
            label: "Recipes Shared",
            value: stats.totalRecipes || 0,
            avatars: stats.communityAvatars.length > 6 ? stats.communityAvatars.slice(6, 9).map(u => `http://localhost:5000${u.profilePic}`) : ["https://i.pravatar.cc/150?u=7", "https://i.pravatar.cc/150?u=8", "https://i.pravatar.cc/150?u=9"]
        }
    ];

    return (
        <Layout>
            <div className="bg-white pb-20 overflow-hidden">
                {/* Hero Header */}
                <div
                    className="relative h-[400px] md:h-[450px] w-full flex flex-col items-center justify-center overflow-hidden bg-cover bg-center"
                    style={{ backgroundImage: `url(${bannerImg})` }}
                >
                    <div className="absolute inset-0 bg-white/70 backdrop-blur-[1px]"></div>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeIn}
                        className="relative z-10 text-center px-4"
                    >
                        <div className="mb-6">
                            <img src={logoImg} alt="MyKitchen Logo" className="h-20 md:h-24 mx-auto drop-shadow-lg" />
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-4 tracking-tight">
                            About MyKitchen
                        </h1>
                        <p className="max-w-2xl mx-auto text-gray-700 font-bold text-lg md:text-xl leading-relaxed">
                            Empowering home cooks to discover, learn, and master delicious recipes.
                        </p>
                    </motion.div>
                </div>

                {/* Our Mission */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeIn}
                    className="max-w-5xl mx-auto px-6 -mt-20 relative z-20"
                >
                    <div className="bg-white rounded-[40px] shadow-2xl shadow-gray-200/50 p-12 md:p-20 border border-gray-100 text-center">
                        <div className="mb-8">
                            <h2 className="text-4xl font-extrabold text-gray-900 mb-6">Our Mission</h2>
                            <div className="w-20 h-1.5 bg-orange-500 mx-auto rounded-full"></div>
                        </div>
                        <p className="text-gray-500 text-xl leading-relaxed font-semibold max-w-4xl mx-auto">
                            At MyKitchen, we believe cooking should be fun, accessible, and rewarding. Our platform helps users cook better by offering engaging cooking challenges, detailed step-by-step recipes, and a supportive community. Whether you're a beginner or an experienced chef, we're here to keep you motivated and inspired in your culinary journey.
                        </p>
                    </div>
                </motion.div>

                {/* Core Features */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                    className="max-w-7xl mx-auto px-6 py-24"
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
                        {features.map((f, i) => (
                            <motion.div
                                key={i}
                                variants={fadeIn}
                                className="text-center group p-8 rounded-3xl hover:bg-gray-50 transition-colors"
                            >
                                <div className={`${f.bg} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                                    {f.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{f.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed font-medium">{f.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Why Choose Us Section */}
                <div className="max-w-7xl mx-auto px-6 py-10">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeIn}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-3">Why Choose MyKitchen</h2>
                        <p className="text-gray-500 font-bold tracking-widest uppercase text-sm">What makes us different</p>
                    </motion.div>

                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        {/* Illustration */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="w-full lg:w-1/2 flex justify-center"
                        >
                            <div className="relative">
                                <div className="absolute -inset-10 bg-red-100 rounded-full blur-3xl opacity-20 animate-pulse"></div>
                                <img
                                    src={manImg}
                                    alt="About Us Chef"
                                    className="relative z-10 max-w-sm md:max-w-md w-full mix-blend-multiply"
                                />
                            </div>
                        </motion.div>

                        {/* Feature List */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={staggerContainer}
                            className="w-full lg:w-1/2 space-y-8"
                        >
                            {[
                                { title: "Fun Cooking Challenges", desc: "Engage with exciting daily and weekly challenges that make cooking an adventure." },
                                { title: "Rewards & Badges", desc: "Earn achievements and unlock special badges as you progress through your cooking journey." },
                                { title: "Easy Step Guides", desc: "Clear, detailed instructions with photos and videos to guide you every step of the way." },
                                { title: "Personalized Experience", desc: "Get recipe recommendations tailored to your taste preferences and skill level." }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    variants={fadeIn}
                                    className="flex gap-6 group items-start"
                                >
                                    <div className="flex-shrink-0 w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center text-red-600 group-hover:bg-red-600 group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-red-200">
                                        <CheckCircle2 size={24} />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-extrabold text-gray-900 mb-1 group-hover:text-red-600 transition-colors">{item.title}</h4>
                                        <p className="text-gray-500 leading-relaxed font-medium">{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>

                {/* Join Our Community */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeIn}
                    className="max-w-7xl mx-auto px-6 py-24 text-center"
                >
                    <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">Join Our Growing Community</h2>
                    <p className="text-gray-500 font-bold mb-16 tracking-wide">Thousands of home cooks cooking together</p>

                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    >
                        {communityStats.map((stat, i) => (
                            <motion.div
                                key={i}
                                variants={fadeIn}
                                className="bg-white border-2 border-gray-50 rounded-[40px] p-10 shadow-xl shadow-gray-100/50 hover:border-red-100 transition-all group"
                            >
                                <div className="flex justify-center -space-x-4 mb-8">
                                    {stat.avatars.map((avatar, idx) => (
                                        <img
                                            key={idx}
                                            src={avatar}
                                            alt="User"
                                            className="w-14 h-14 rounded-full border-4 border-white object-cover shadow-sm group-hover:scale-110 transition-transform"
                                        />
                                    ))}
                                </div>
                                <h4 className="text-3xl font-black text-gray-800 mb-2">{stat.value}+</h4>
                                <p className="font-extrabold text-gray-400 text-xs uppercase tracking-[3px] group-hover:text-red-600 transition-colors">{stat.label}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </Layout>
    );
};

export default AboutUs;
