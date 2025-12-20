import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white px-6 md:px-12 lg:px-24 py-5 flex items-center justify-between relative shadow-sm z-50">
      {/* Logo */}
      <div className="text-2xl font-serif font-bold text-gray-900 tracking-tight">
        My <span className="text-orange-500 italic">Kitchen</span>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-8">
        <a href="#" className="font-medium text-gray-600 hover:text-orange-500 transition">Features</a>
        <a href="#" className="font-medium text-orange-500">Recipes</a>
        <a href="#" className="font-medium text-gray-600 hover:text-orange-500 transition">Reviews</a>
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
          <a href="#" className="text-gray-600">Features</a>
          <a href="#" className="text-orange-500 font-bold">Recipes</a>
          <a href="#" className="text-gray-600">Reviews</a>
          <Link to="/login" className="w-full">
            <Button variant="primary" className="w-full">Login now</Button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
