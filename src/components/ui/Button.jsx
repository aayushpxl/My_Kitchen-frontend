import React from 'react';

const Button = ({ children, variant = "primary", className = "", ...props }) => {
    const baseStyles = "px-6 py-2.5 rounded-full font-semibold transition-all duration-300 shadow-md hover:shadow-lg active:scale-95";

    const variants = {
        primary: "bg-orange-500 hover:bg-orange-600 text-white border border-transparent",
        secondary: "bg-white hover:bg-gray-50 text-gray-800 border border-gray-200",
        outline: "bg-transparent text-gray-700 border border-gray-300 hover:bg-gray-50"
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
