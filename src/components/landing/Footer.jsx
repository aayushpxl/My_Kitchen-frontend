import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Github, Mail, ChefHat, Heart, Send } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-100 pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
                    {/* Brand Section */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center shadow-lg shadow-red-100">
                                <ChefHat className="text-white" size={24} />
                            </div>
                            <span className="text-2xl font-black text-gray-900 tracking-tight">
                                My Kitchen<span className="text-red-600">.</span>
                            </span>
                        </div>
                        <p className="text-gray-500 leading-relaxed max-w-xs">
                            Master your culinary skills with thousands of handpicked recipes, personalized meal plans, and community favorites.
                        </p>
                        <div className="flex items-center gap-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-red-50 hover:text-red-600 transition-all border border-transparent hover:border-red-100">
                                <Instagram size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-red-50 hover:text-red-600 transition-all border border-transparent hover:border-red-100">
                                <Facebook size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-red-50 hover:text-red-600 transition-all border border-transparent hover:border-red-100">
                                <Twitter size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h5 className="font-extrabold text-gray-900 mb-6 text-sm uppercase tracking-widest">Explore</h5>
                        <ul className="space-y-4">
                            <li><Link to="/home" className="text-gray-500 hover:text-red-600 transition-colors font-medium flex items-center gap-2 group">
                                <span className="w-1.5 h-1.5 rounded-full bg-transparent group-hover:bg-red-600 transition-all"></span> Home
                            </Link></li>
                            <li><Link to="/recipes" className="text-gray-500 hover:text-red-600 transition-colors font-medium flex items-center gap-2 group">
                                <span className="w-1.5 h-1.5 rounded-full bg-transparent group-hover:bg-red-600 transition-all"></span> Recipes
                            </Link></li>
                            <li><Link to="/challenges" className="text-gray-500 hover:text-red-600 transition-colors font-medium flex items-center gap-2 group">
                                <span className="w-1.5 h-1.5 rounded-full bg-transparent group-hover:bg-red-600 transition-all"></span> Weekly Challenges
                            </Link></li>
                            <li><Link to="/meal-planner" className="text-gray-500 hover:text-red-600 transition-colors font-medium flex items-center gap-2 group">
                                <span className="w-1.5 h-1.5 rounded-full bg-transparent group-hover:bg-red-600 transition-all"></span> Meal Planner
                            </Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h5 className="font-extrabold text-gray-900 mb-6 text-sm uppercase tracking-widest">Cooking Support</h5>
                        <ul className="space-y-4">
                            <li><Link to="/profile" className="text-gray-500 hover:text-red-600 transition-colors font-medium flex items-center gap-2 group">
                                <span className="w-1.5 h-1.5 rounded-full bg-transparent group-hover:bg-red-600 transition-all"></span> My Saved Recipes
                            </Link></li>
                            <li><a href="#" className="text-gray-500 hover:text-red-600 transition-colors font-medium flex items-center gap-2 group">
                                <span className="w-1.5 h-1.5 rounded-full bg-transparent group-hover:bg-red-600 transition-all"></span> Community Guidelines
                            </a></li>
                            <li><Link to="/about" className="text-gray-500 hover:text-red-600 transition-colors font-medium flex items-center gap-2 group">
                                <span className="w-1.5 h-1.5 rounded-full bg-transparent group-hover:bg-red-600 transition-all"></span> About Us
                            </Link></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h5 className="font-extrabold text-gray-900 mb-6 text-sm uppercase tracking-widest">Secret Recipes</h5>
                        <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                            Join our newsletter for exclusive recipes and pro-chef tips sent weekly.
                        </p>
                        <div className="relative group">
                            <input
                                type="email"
                                placeholder="Email address"
                                className="w-full bg-gray-50 border-2 border-transparent border-gray-100 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-red-500 focus:bg-white transition-all pr-12 font-medium"
                            />
                            <button className="absolute right-2 top-2 bottom-2 bg-red-600 text-white rounded-xl px-3 hover:bg-black transition-all shadow-md active:scale-95">
                                <Send size={18} />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-100 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-sm text-gray-400 font-medium">
                        © 2026 <span className="text-gray-900 font-bold">My Kitchen</span>. All rights reserved.
                    </p>
                    <div className="flex items-center gap-1 text-gray-400 text-sm font-medium">
                        Made with <Heart className="text-red-500 fill-red-500 mx-1" size={16} /> for food lovers everywhere.
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
