import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';

const Navbar = () => {
    const { user, logout } = useAuth();
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isActive = (path) => location.pathname === path;

    const navLinks = [
        { name: 'Home', path: '/home' },
        { name: 'Recipes', path: '/recipes' },
        { name: 'Challenge', path: '/challenges' },
        { name: 'Meal Planning', path: '/meal-planning' },
    ];

    return (
        <nav className={`fixed top-0 left-0 w-full transition-all duration-300 z-[100] px-6 md:px-12 lg:px-24 py-4 
            ${scrolled
                ? 'bg-white/80 backdrop-blur-md shadow-lg py-3'
                : 'bg-transparent py-5'}`}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between">

                {/* Logo Section */}
                <Link to="/home" className="flex items-center gap-3 group">
                    <div className="relative w-11 h-11 transition-transform group-hover:scale-110 duration-300">
                        <div className="absolute inset-0 bg-orange-200 rounded-xl blur-lg opacity-0 group-hover:opacity-70 transition-opacity"></div>
                        <img
                            src="https://img.icons8.com/color/96/restaurant-.png"
                            alt="Logo"
                            className="relative w-full h-full object-contain"
                        />
                    </div>
                    <div className="flex flex-col leading-none">
                        <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold">My</span>
                        <span className="text-2xl font-black bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent font-serif">
                            Kitchen
                        </span>
                    </div>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-1">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className={`px-4 py-2 rounded-xl text-[18px] font-semibold transition-all duration-300 relative group ${isActive(link.path)
                                ? 'text-orange-600'
                                : 'text-gray-500 hover:text-gray-900'
                                }`}

                        >
                            {link.name}
                            <span className={`absolute bottom-1 left-1/2 -translate-x-1/2 h-1 bg-orange-500 rounded-full transition-all duration-300 ${isActive(link.path) ? 'w-4' : 'w-0 group-hover:w-4'}`}></span>
                        </Link>
                    ))}
                </div>

                {/* Right Side: Search & User Profile */}
                <div className="hidden md:flex items-center gap-6">
                    <div className="relative group">
                        <input
                            type="text"
                            placeholder="Find a recipe..."
                            className="pl-10 pr-4 py-2.5 bg-gray-100/50 border border-transparent rounded-2xl text-sm text-gray-700 focus:bg-white focus:border-orange-200 focus:ring-4 focus:ring-orange-50 focus:outline-none transition-all w-40 focus:w-64"
                        />
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                            <svg className="h-4 w-4 text-gray-400 group-focus-within:text-orange-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>

                    {/* User Profile - Clickable to /profile */}
                    <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                        <Link to="/profile" className="flex items-center gap-3 group/profile">
                            <div className="group relative">
                                <div className={`w-10 h-10 rounded-2xl p-[2px] shadow-md transition-all duration-300 group-hover/profile:rotate-6 ${isActive('/profile') ? 'bg-orange-500 rotate-6' : 'bg-gradient-to-tr from-orange-400 to-red-500'}`}>
                                    <div className="w-full h-full rounded-[14px] bg-white overflow-hidden p-0.5">
                                        <img
                                            src={`https://ui-avatars.com/api/?name=${user?.username || 'User'}&background=FF6B00&color=fff&bold=true`}
                                            alt="User"
                                            className="w-full h-full rounded-[12px] object-cover"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <span className={`text-sm font-bold leading-none transition-colors ${isActive('/profile') ? 'text-orange-600' : 'text-gray-800 group-hover/profile:text-orange-500'}`}>
                                    {user?.username || 'Guest'}
                                </span>
                                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">View Profile</span>
                            </div>
                        </Link>


                    </div>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden w-10 h-10 flex items-center justify-center bg-gray-100 rounded-xl text-gray-600"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    ) : (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" /></svg>
                    )}
                </button>
            </div>

            {/* Mobile Menu Dropdown */}
            <div className={`absolute top-full left-0 w-full transition-all duration-300 ease-in-out ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'} md:hidden`}>
                <div className="mx-6 my-4 p-6 bg-white/90 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl border border-white/50 flex flex-col gap-2">
                    {/* Add Profile to Mobile Menu */}
                    <Link
                        to="/profile"
                        className={`text-lg font-bold px-4 py-3 rounded-2xl transition-all ${isActive('/profile') ? 'bg-orange-500 text-white shadow-lg shadow-orange-200' : 'text-gray-700 hover:bg-gray-50'}`}
                        onClick={() => setIsMenuOpen(false)}
                    >
                        My Profile
                    </Link>
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className={`text-lg font-bold px-4 py-3 rounded-2xl transition-all ${isActive(link.path) ? 'bg-orange-500 text-white shadow-lg shadow-orange-200' : 'text-gray-700 hover:bg-gray-50'}`}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                        <Link to="/profile" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3">
                            <img
                                src={`https://ui-avatars.com/api/?name=${user?.username || 'User'}&background=FF6B00&color=fff`}
                                alt="User"
                                className="w-10 h-10 rounded-xl"
                            />
                            <span className="font-bold text-gray-800">{user?.username}</span>
                        </Link>
                        {/* <Button onClick={logout} className="rounded-xl px-6 py-2 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white border-none shadow-none text-sm">Logout</Button> */}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;