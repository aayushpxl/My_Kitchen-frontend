import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white px-6 md:px-12 lg:px-24 py-5 flex items-center justify-between relative shadow-sm z-50">
      
      {/* Logo → make it clickable but SPA-safe */}
      <Link
        to="/"
        className="text-2xl font-serif font-bold text-gray-900 tracking-tight"
      >
        My <span className="text-orange-500 italic">Kitchen</span>
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-8">
        <Link to="/#features" className="font-medium text-gray-600 hover:text-orange-500 transition">
          Features
        </Link>
        <Link to="/recipes" className="font-medium text-orange-500">
          Recipes
        </Link>
        <Link to="/#reviews" className="font-medium text-gray-600 hover:text-orange-500 transition">
          Reviews
        </Link>
      </div>

      {/* CTA */}
      <div className="hidden md:block">
        <Link to="/login">
          <Button variant="primary">Login now</Button>
        </Link>
      </div>

      {/* Mobile Button */}
      <button
        className="md:hidden text-gray-600"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        ☰
      </button>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-lg p-6 flex flex-col gap-4 border-t border-gray-100 md:hidden">
          <Link to="/#features" className="text-gray-600">Features</Link>
          <Link to="/recipes" className="text-orange-500 font-bold">Recipes</Link>
          <Link to="/#reviews" className="text-gray-600">Reviews</Link>

          <Link to="/login" className="w-full">
            <Button variant="primary" className="w-full">Login now</Button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
