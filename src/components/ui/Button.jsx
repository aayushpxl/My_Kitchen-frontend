import React from 'react';

const Button = ({ children, variant = "primary", className = "", loading = false, ...props }) => {
    const baseStyles = "px-6 py-2.5 rounded-full font-semibold transition-all duration-300 shadow-md hover:shadow-lg active:scale-95 flex items-center justify-center gap-2";

    const variants = {
        primary: "bg-orange-500 hover:bg-orange-600 text-white border border-transparent disabled:opacity-70",
        secondary: "bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 disabled:opacity-70",
        outline: "bg-transparent text-gray-700 border border-gray-300 hover:bg-gray-50 disabled:opacity-70"
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${className}`}
            disabled={loading || props.disabled}
            {...props}
        >
            {loading ? (
                <>
                    <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Please wait...</span>
                </>
            ) : (
                children
            )}
        </button>
    );
};

export default Button;
