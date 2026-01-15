import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LayoutDashboard, UtensilsCrossed, Trophy, Users, LogOut, Settings, Menu, X } from 'lucide-react';
import { useState } from 'react';
import logo from '../../assets/mykitchenlogo.png';

const AdminLayout = () => {
    const { user, logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    const sidebarItems = [
        { name: 'Dashboard', path: '/admin/dashboard', icon: <LayoutDashboard size={20} /> },
        { name: 'Recipes', path: '/admin/recipes', icon: <UtensilsCrossed size={20} /> },
        { name: 'Moderation', path: '/admin/moderation', icon: <Settings size={20} /> }, // Using Settings icon for now or check if Shield exists
        { name: 'Challenges', path: '/admin/challenges', icon: <Trophy size={20} /> },
        { name: 'Users', path: '/admin/users', icon: <Users size={20} /> },
    ];

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-md flex-shrink-0 hidden md:flex flex-col">
                <div className="p-8 border-b border-gray-100 flex flex-col items-center justify-center gap-2">
                    <img src={logo} alt="MyKitchen Logo" className="h-14 w-auto object-contain" />
                    <span className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.2em]">Admin Panel</span>
                </div>

                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                    {sidebarItems.map((item) => {
                        const isActive = location.pathname.startsWith(item.path);
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${isActive
                                    ? 'bg-orange-50 text-orange-600'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                    }`}
                            >
                                <span className="mr-3">{item.icon}</span>
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-gray-100">
                    <div className="flex items-center px-4 py-3 mb-2">
                        <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold mr-3">
                            {user?.username?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-900">{user?.username}</p>
                            <p className="text-xs text-gray-500">Administrator</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                        <LogOut size={18} className="mr-3" />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Mobile Sidebar */}
            <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out md:hidden ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                    <div className="flex flex-col items-start gap-1">
                        <img src={logo} alt="MyKitchen Logo" className="h-10 w-auto object-contain" />
                        <span className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">Admin Panel</span>
                    </div>
                    <button onClick={() => setIsSidebarOpen(false)} className="p-2 text-gray-400 hover:text-orange-500">
                        <X size={24} />
                    </button>
                </div>

                <nav className="flex-1 p-4 space-y-1 overflow-y-auto mt-4">
                    {sidebarItems.map((item) => {
                        const isActive = location.pathname.startsWith(item.path);
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setIsSidebarOpen(false)}
                                className={`flex items-center px-4 py-3 text-sm font-semibold rounded-2xl transition-all ${isActive
                                    ? 'bg-orange-50 text-orange-600 shadow-sm'
                                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                                    }`}
                            >
                                <span className="mr-3">{item.icon}</span>
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-6 border-t border-gray-100 mt-auto">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-50 rounded-2xl transition-colors"
                    >
                        <LogOut size={18} className="mr-3" />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top Header for Mobile */}
                <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 h-16 px-4 flex items-center justify-between md:hidden relative z-30">
                    <button
                        onClick={toggleSidebar}
                        className="p-2 text-gray-600 hover:bg-orange-50 hover:text-orange-600 rounded-xl transition-all"
                    >
                        <Menu size={24} />
                    </button>
                    <h1 className="font-extrabold text-gray-900">Admin Dashboard</h1>
                    <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold shadow-sm">
                        {user?.username?.charAt(0).toUpperCase()}
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto p-4 md:p-10 bg-[#f8fbff]">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
