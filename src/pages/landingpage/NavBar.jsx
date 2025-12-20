import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Button from '../../components/ui/Button';

const NavBar = () => {
  const location = useLocation(); // get current route
  const [active, setActive] = useState('Features');

  useEffect(() => {
    // Highlight based on route
    if (location.pathname === '/recipes') setActive('Recipes');
    else if (location.pathname === '/') setActive('Features'); // Default for landing page
    else setActive(''); // No highlight for other routes
  }, [location.pathname]);

  return (
    <nav className="bg-white px-6 md:px-12 lg:px-24 py-5 flex items-center justify-between shadow-sm">
      <Link to="/" className="text-2xl font-serif font-bold text-gray-900">
        My <span className="text-orange-500 italic">Kitchen</span>
      </Link>

      <div className="hidden md:flex items-center gap-8">
        <Link
          to="/"
          className={`font-medium transition ${active === 'Features' ? 'text-orange-500' : 'text-gray-600 hover:text-orange-500'}`}
        >
          Features
        </Link>
        <Link
          to="/view-recipes"
          className={`font-medium transition ${active === 'Recipes' ? 'text-orange-500' : 'text-gray-600 hover:text-orange-500'}`}
        >
          View Recipes
        </Link>
        <Link
          to="/#reviews"
          className={`font-medium transition ${active === 'Reviews' ? 'text-orange-500' : 'text-gray-600 hover:text-orange-500'}`}
        >
          Reviews
        </Link>
      </div>

      <div className="hidden md:block">
        <Link to="/login">
          <Button variant="primary">Login now</Button>
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
