import React from 'react';

const StatsCard = ({ title, value, icon, color }) => {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
                <p className="text-gray-500 text-sm font-medium mb-1">{title}</p>
                <h3 className="text-3xl font-bold text-gray-800">{value}</h3>
            </div>
            <div className={`p-4 rounded-xl ${color}`}>
                {icon}
            </div>
        </div>
    );
};

export default StatsCard;
