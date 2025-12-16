import React from 'react';

const Badge = ({ children, color = "green", className = "" }) => {
    const colors = {
        green: "bg-green-100 text-green-700",
        red: "bg-red-100 text-red-700",
        orange: "bg-orange-100 text-orange-700",
        gray: "bg-gray-100 text-gray-700",
    };

    return (
        <span className={`px-2 py-0.5 text-xs font-medium rounded-md ${colors[color] || colors.gray} ${className}`}>
            {children}
        </span>
    );
};

export default Badge;
