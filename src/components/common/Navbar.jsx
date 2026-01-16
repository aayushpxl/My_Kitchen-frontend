import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Search, User, UtensilsCrossed, X } from 'lucide-react';
import axios from 'axios';
import Button from '../ui/Button';
import logo from '../../assets/mykitchenlogo.png';

const Navbar = () => {
    const { user, logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Search State
    const [searchQuery, setSearchQuery] = useState('');
    const [searchType, setSearchType] = useState('recipes'); // 'recipes' or 'people'
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [searchDebounce, setSearchDebounce] = useState(null);

    // Clear search on route change
    useEffect(() => {
        setSearchQuery('');
        setSearchResults([]);
        setShowResults(false);
    }, [location.pathname]);

    const performSearch = async (query, type) => {
        if (!query.trim()) {
            setSearchResults([]);
            return;
        }

        setIsSearching(true);
        try {
            let res;
            if (type === 'people') {
                res = await axios.get(`http://localhost:5000/api/users/search?query=${query}`);
                setSearchResults(res.data);
            } else {
                // Assuming we might have a recipe search endpoint, or we can just mock for now if not ready
                // For now, let's keep it empty or try to search recipes if that endpoint exists
                res = await axios.get(`http://localhost:5000/api/recipes?search=${query}`); // Checking if this works
                // Note: The controller mentions getAllRecipes takes query params, but might not implement text search yet. 
                // We will test. If it returns all, we might filter client side if needed, or better, just show text "Search for..."
                setSearchResults(res.data);
            }
        } catch (err) {
            console.error("Search error:", err);
            setSearchResults([]);
        } finally {
            setIsSearching(false);
        }
    };

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        setShowResults(true);

        if (searchDebounce) clearTimeout(searchDebounce);

        const timeout = setTimeout(() => {
            performSearch(query, searchType);
        }, 300);
        setSearchDebounce(timeout);
    };

    const handleTypeChange = (type) => {
        setSearchType(type);
        setSearchResults([]); // Clear previous results
        if (searchQuery) {
            performSearch(searchQuery, type);
        }
    };

    const handleResultClick = (result) => {
        if (searchType === 'people') {
            navigate(`/users/${result._id}`);
        } else {
            navigate(`/recipes/${result._id}`);
        }
        setShowResults(false);
        setSearchQuery('');
    };

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
        { name: 'About', path: '/about' },
    ];

    return (
        <nav className={`fixed top-0 left-0 w-full transition-all duration-300 z-[100] px-6 md:px-12 lg:px-24 py-4 
            ${scrolled
                ? 'bg-white/80 backdrop-blur-md shadow-lg py-3'
                : 'bg-transparent py-5'}`}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between">

                {/* Logo Section */}
                <Link to="/home" className="flex items-center group">
                    <img
                        src={logo}
                        alt="My Kitchen Logo"
                        className="h-14 w-auto object-contain transition-transform group-hover:scale-105 duration-300"
                    />
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
                {/* Right Side: Search & User Profile */}
                <div className="hidden md:flex items-center gap-6">
                    {/* Enhanced Search Bar */}
                    <div className="relative group z-50">
                        <div className={`flex items-center bg-gray-100/50 border border-transparent rounded-2xl transition-all focus-within:bg-white focus-within:border-orange-200 focus-within:ring-4 focus-within:ring-orange-50 focus-within:shadow-lg ${showResults && searchQuery ? 'rounded-b-none border-orange-200 bg-white ring-4 ring-orange-50' : ''}`}>

                            {/* Search Type Selector */}
                            <div className="flex border-r border-gray-200">
                                <button
                                    onClick={() => handleTypeChange('recipes')}
                                    className={`p-2.5 rounded-l-2xl transition-colors ${searchType === 'recipes' ? 'text-orange-500 bg-orange-50' : 'text-gray-400 hover:text-gray-600'}`}
                                    title="Search Recipes"
                                >
                                    <UtensilsCrossed size={18} />
                                </button>
                                <button
                                    onClick={() => handleTypeChange('people')}
                                    className={`p-2.5 transition-colors ${searchType === 'people' ? 'text-orange-500 bg-orange-50' : 'text-gray-400 hover:text-gray-600'}`}
                                    title="Search Chefs"
                                >
                                    <User size={18} />
                                </button>
                            </div>

                            <div className="relative flex-1">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                    onFocus={() => setShowResults(true)}
                                    // onBlur={() => setTimeout(() => setShowResults(false), 200)} // Delay to allow clicks
                                    placeholder={searchType === 'people' ? "Find a chef..." : "Find a recipe..."}
                                    className="w-48 pl-3 pr-10 py-2.5 bg-transparent border-none text-sm text-gray-700 focus:outline-none focus:ring-0 transition-all focus:w-64 placeholder-gray-400"
                                />
                                {searchQuery && (
                                    <button
                                        onClick={() => { setSearchQuery(''); setSearchResults([]); }}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        <X size={14} />
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Search Results Dropdown */}
                        {showResults && searchQuery && (
                            <div className="absolute top-full left-0 w-full bg-white rounded-b-2xl border border-t-0 border-orange-200 shadow-xl max-h-80 overflow-y-auto overflow-x-hidden">
                                {isSearching ? (
                                    <div className="p-4 text-center text-gray-500 text-sm">Searching...</div>
                                ) : searchResults.length > 0 ? (
                                    <div className="py-2">
                                        {searchResults.map((result) => (
                                            <div
                                                key={result._id}
                                                onClick={() => handleResultClick(result)}
                                                className="px-4 py-3 hover:bg-orange-50 cursor-pointer flex items-center gap-3 transition-colors border-b border-gray-50 last:border-none"
                                            >
                                                {searchType === 'people' ? (
                                                    <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 shrink-0">
                                                        <img
                                                            src={result.profilePic ? `http://localhost:5000${result.profilePic}` : `https://ui-avatars.com/api/?name=${result.username}&background=random`}
                                                            alt={result.username}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                ) : (
                                                    <div className="w-8 h-8 rounded-lg overflow-hidden bg-gray-200 shrink-0">
                                                        <img
                                                            src={result.image ? `http://localhost:5000${result.image}` : "https://via.placeholder.com/50"}
                                                            alt={result.title}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                )}
                                                <div className="flex flex-col overflow-hidden">
                                                    <span className="text-sm font-medium text-gray-800 truncate">
                                                        {searchType === 'people' ? result.username : result.title}
                                                    </span>
                                                    {searchType === 'recipes' && (
                                                        <span className="text-xs text-gray-400 truncate">{result.category || result.difficulty}</span>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="p-4 text-center text-gray-500 text-sm">No results found</div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* User Profile - Clickable to /profile */}
                    <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                        <Link to="/profile" className="flex items-center gap-3 group/profile">
                            <div className="group relative">
                                <div className="w-10 h-10 rounded-2xl transition-all duration-300 group-hover/profile:scale-105">
                                    <div className="w-full h-full rounded-[14px] bg-white overflow-hidden p-0.5">
                                        <img
                                            src={user?.profilePic
                                                ? `http://localhost:5000${user.profilePic}`
                                                : `https://ui-avatars.com/api/?name=${user?.username || 'User'}&background=FF6B00&color=fff&bold=true`}
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
                                src={user?.profilePic
                                    ? `http://localhost:5000${user.profilePic}`
                                    : `https://ui-avatars.com/api/?name=${user?.username || 'User'}&background=FF6B00&color=fff`}
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