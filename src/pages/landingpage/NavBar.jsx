import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Button from '../../components/ui/Button';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const NavBar = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [active, setActive] = useState('Features');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Smart Scroll Tracking for Home Page
      if (location.pathname === '/') {
        const sections = ['hero', 'popular-recipes', 'reviews'];
        const scrollPosition = window.scrollY + 100;

        // If at the very top, always show Features
        if (window.scrollY < 300) {
          setActive('Features');
          return;
        }

        for (const sectionId of sections) {
          const element = document.getElementById(sectionId);
          if (element) {
            const { offsetTop, offsetHeight } = element;
            if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
              if (sectionId === 'hero') setActive('Features');
              else if (sectionId === 'popular-recipes') setActive('View Recipes');
              else if (sectionId === 'reviews') setActive('Reviews');
              break;
            }
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Features', path: '/', id: 'hero' },
    { name: 'View Recipes', path: '/#popular-recipes', id: 'popular-recipes' },
    { name: 'Reviews', path: '/#reviews', id: 'reviews' },
  ];

  const handleNavClick = (e, link) => {
    if (location.pathname === '/') {
      e.preventDefault();
      if (link.id === 'hero') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const element = document.getElementById(link.id);
        if (element) {
          const offset = 80; // Account for fixed NavBar
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = element.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
      setActive(link.name);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 md:px-12 lg:px-24 flex items-center justify-between ${isScrolled
        ? 'bg-white/80 backdrop-blur-lg shadow-md py-4'
        : 'bg-white/60 backdrop-blur-md py-6'
        }`}
    >
      <Link
        to="/"
        onClick={(e) => handleNavClick(e, { id: 'hero', name: 'Features' })}
        className="group flex items-center gap-2"
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="text-3xl font-serif font-bold text-gray-900"
        >
          My <span className="text-orange-500 italic transition-colors group-hover:text-orange-600">Kitchen</span>
        </motion.div>
      </Link>

      <div className="hidden md:flex items-center gap-10">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            onClick={(e) => handleNavClick(e, link)}
            className="relative group py-1"
          >
            <span className={`text-lg font-semibold transition-all duration-300 ${active === link.name ? 'text-orange-500' : 'text-gray-600 group-hover:text-gray-900 text-opacity-80 group-hover:text-opacity-100'
              }`}>
              {link.name}
            </span>
            {active === link.name && (
              <motion.div
                layoutId="activeNav"
                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-orange-500 rounded-full"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gray-900 transition-all duration-300 group-hover:w-full opacity-10" />
          </Link>
        ))}
      </div>

      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="hidden md:block"
      >
        <Link to="/login">
          <Button variant="primary" className="text-lg px-8 py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 border-none shadow-orange-200/50 hover:shadow-orange-400/40">
            Login now
          </Button>
        </Link>
      </motion.div>
    </motion.nav>
  );
};

export default NavBar;
