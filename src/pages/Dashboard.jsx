import React from 'react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';

const Dashboard = () => {
    const { user, logout } = useAuth();

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
            <div className="bg-white p-12 rounded-3xl shadow-xl text-center max-w-lg w-full space-y-6">
                <div className="text-6xl animate-bounce mb-4">
                    👋
                </div>

                <h1 className="text-4xl font-bold text-gray-800">
                    Welcome to Dashboard
                </h1>

                <p className="text-gray-500 text-lg">
                    Hello, <span className="font-bold text-orange-600">{user?.username || 'User'}</span>!
                    <br />
                    You have successfully logged in.
                </p>

                <div className="pt-6">
                    <Button onClick={logout} className="bg-red-50 text-red-600 hover:bg-red-100 border border-transparent">
                        Logout
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
