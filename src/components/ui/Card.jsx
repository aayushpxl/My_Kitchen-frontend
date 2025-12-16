import React from 'react';

const Card = ({ children, className = "", ...props }) => {
    return (
        <div
            className={`bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 p-4 ${className}`}
            {...props}
        >
            {children}
        </div>
    );
};

export default Card;
