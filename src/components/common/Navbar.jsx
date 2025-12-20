import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';

const Navbar = () => {
    const { user, logout } = useAuth();
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const isActive = (path) => location.pathname === path;

    const navLinks = [
        { name: 'Home', path: '/home' },
        { name: 'Recipes', path: '/recipes' },
        { name: 'Challenge', path: '/challenges' },
        { name: 'Meal Planning', path: '/meal-planning' },
    ];

    return (
        <nav className="bg-white px-6 md:px-12 lg:px-24 py-4 flex items-center justify-between relative shadow-sm z-50">
            {/* Logo */}
            <Link to="/home" className="flex items-center gap-2">
                {/* Placeholder Logo Icon */}
                <div className="relative w-10 h-10">
                    <img
                        src="https://img.icons8.com/color/96/restaurant-.png" // Generic food icon
                        alt="Logo"
                        className="w-full h-full object-contain"
                    />
                </div>
                <div className="flex flex-col leading-tight">
                    <span className="text-xs text-gray-500 font-medium">My</span>
                    <span className="text-xl font-bold text-red-600 font-serif -mt-1">
                        Kitchen
                    </span>
                </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
                {user?.role === 'admin' && (
                    <Link
                        to="/admin/add-recipe"
                        className={`font-medium transition-colors ${isActive('/admin/add-recipe')
                            ? 'text-orange-500'
                            : 'text-gray-500 hover:text-orange-500'
                            }`}
                    >
                        Add Recipe
                    </Link>
                )}
                {navLinks.map((link) => (
                    <Link
                        key={link.name}
                        to={link.path}
                        className={`font-medium transition-colors ${isActive(link.path)
                            ? 'text-orange-500'
                            : 'text-gray-500 hover:text-orange-500'
                            }`}
                    >
                        {link.name}
                    </Link>
                ))}
            </div>

            {/* Right Side: Search & User */}
            <div className="hidden md:flex items-center gap-6">
                {/* Search Bar */}
                <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <input
                        type="text"
                        placeholder="Search"
                        className="pl-10 pr-4 py-2 bg-gray-100 rounded-full text-sm text-gray-700 focus:bg-white focus:ring-2 focus:ring-orange-100 focus:outline-none transition-all w-32 focus:w-48"
                    />
                </div>

                {/* User Avatar */}
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-100 border-2 border-white shadow-sm overflow-hidden p-1">
                        <img
                            src={`https://ui-avatars.com/api/?name=${user?.username || 'User'}&background=random`}
                            alt="User"
                            className="w-full h-full rounded-full object-cover"
                        />
                    </div>
                    {/* Logout Button (Small) */}
                    <button
                        onClick={logout}
                        className="text-xs text-gray-400 hover:text-red-500 underline"
                    >
                        Logout
                    </button>
                </div>
            </div>

            {/* Mobile Menu Button */}
            <button
                className="md:hidden text-gray-600 text-2xl"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                {isMenuOpen ? '✕' : '☰'}
            </button>

            {/* Mobile Menu Dropdown */}
            {isMenuOpen && (
                <div className="absolute top-full left-0 w-full bg-white shadow-xl border-t border-gray-100 p-6 flex flex-col gap-4 md:hidden animate-fade-in-down">
                    {user?.role === 'admin' && (
                        <Link
                            to="/admin/add-recipe"
                            className="text-lg font-medium text-gray-700 py-2 border-b border-gray-50"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Add Recipe
                        </Link>
                    )}
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className="text-lg font-medium text-gray-700 py-2 border-b border-gray-50 last:border-0"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <div className="pt-2 flex items-center justify-between">
                        <span className="font-bold text-gray-800">{user?.username}</span>
                        <Button onClick={logout} variant="outline" className="text-xs px-4 py-1">Logout</Button>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
