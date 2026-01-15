import React, { useEffect } from 'react';
import { io } from 'socket.io-client';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const SOCKET_URL = import.meta.env.VITE_API_BASE_URL?.replace('/api', '') || 'http://localhost:5000';

const NotificationListener = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const socket = io(SOCKET_URL);

        socket.on('connect', () => {
            console.log('📡 Connected to notification server');
        });

        socket.on('new_recipe', (data) => {
            toast.info(
                <div className="flex flex-col gap-1">
                    <span className="font-bold text-gray-900">New Recipe Added! 🍳</span>
                    <span className="text-sm text-gray-600 line-clamp-1">"{data.title}" by {data.chef}</span>
                    <button
                        onClick={() => navigate(`/recipes/${data.id}`)}
                        className="text-xs font-bold text-orange-600 hover:text-orange-700 mt-1 self-start"
                    >
                        VIEW RECIPE →
                    </button>
                </div>,
                {
                    position: "bottom-right",
                    autoClose: 8000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    icon: "👨‍🍳"
                }
            );
        });

        socket.on('new_challenge', (data) => {
            toast.success(
                <div className="flex flex-col gap-1">
                    <span className="font-bold text-gray-900">New Challenge Live! 🏆</span>
                    <span className="text-sm text-gray-600 line-clamp-1">"{data.title}" has been added!</span>
                    <button
                        onClick={() => navigate(`/challenges/${data.id}`)}
                        className="text-xs font-bold text-blue-600 hover:text-blue-700 mt-1 self-start"
                    >
                        JOIN NOW →
                    </button>
                </div>,
                {
                    position: "bottom-right",
                    autoClose: 10000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    icon: "🔥"
                }
            );
        });

        return () => {
            socket.disconnect();
        };
    }, [navigate]);

    return null; // This component doesn't render anything visually
};

export default NotificationListener;
