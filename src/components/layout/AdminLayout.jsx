import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LayoutDashboard, UtensilsCrossed, Trophy, Users, LogOut, Settings } from 'lucide-react';

const AdminLayout = () => {
    const { user, logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const sidebarItems = [
        { name: 'Dashboard', path: '/admin/dashboard', icon: <LayoutDashboard size={20} /> },
        { name: 'Recipes', path: '/admin/recipes', icon: <UtensilsCrossed size={20} /> },
        { name: 'Challenges', path: '/admin/challenges', icon: <Trophy size={20} /> },
        { name: 'Users', path: '/admin/users', icon: <Users size={20} /> },
    ];

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-md flex-shrink-0 hidden md:flex flex-col">
                <div className="p-6 border-b border-gray-100">
                    <h1 className="text-2xl font-bold text-orange-600">MyKitchen<span className="text-gray-400 text-sm block font-normal">Admin Panel</span></h1>
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

            {/* Mobile Sidebar Overlay (Simplified for now, can be expanded) */}

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top Header */}
                <header className="bg-white shadow-sm z-10 p-4 flex justify-between items-center md:hidden">
                    <h1 className="font-bold text-orange-600">Admin Panel</h1>
                    {/* Add mobile menu toggle here if needed */}
                </header>

                <main className="flex-1 overflow-y-auto p-6 md:p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
