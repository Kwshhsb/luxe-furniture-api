import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, LayoutDashboard, LogOut, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import { cn } from '../lib/utils';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobMenuOpen, setMobMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
      isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-primary-500 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:rotate-12 transition-transform">
            <Heart size={24} fill="currentColor" />
          </div>
          <span className="font-display text-2xl font-black text-primary-900 tracking-tight">ElderCare</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 font-medium">
          <Link to="/services" className="hover:text-primary-500 transition-colors">Services</Link>
          <Link to="/caregivers" className="hover:text-primary-500 transition-colors">Our Specialists</Link>
          {user ? (
            <>
              <Link to="/dashboard" className="flex items-center gap-2 text-primary-900">
                <LayoutDashboard size={18} />
                Dashboard
              </Link>
              <button 
                onClick={logout}
                className="flex items-center gap-2 text-red-500 hover:text-red-700 transition-colors"
              >
                <LogOut size={18} />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-primary-500 transition-colors">Login</Link>
              <Link to="/register" className="btn-primary">Get Started</Link>
            </>
          )}
        </div>

        <button className="md:hidden" onClick={() => setMobMenuOpen(!mobMenuOpen)}>
          {mobMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white shadow-xl p-6 flex flex-col gap-4 md:hidden"
          >
            <Link to="/services" onClick={() => setMobMenuOpen(false)}>Services</Link>
            <Link to="/caregivers" onClick={() => setMobMenuOpen(false)}>Caregivers</Link>
            {user ? (
              <Link to="/dashboard" onClick={() => setMobMenuOpen(false)}>Dashboard</Link>
            ) : (
              <>
                <Link to="/login" onClick={() => setMobMenuOpen(false)}>Login</Link>
                <Link to="/register" onClick={() => setMobMenuOpen(false)}>Register</Link>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
