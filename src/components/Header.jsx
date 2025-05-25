import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Shield, Bell, LogIn, UserPlus } from 'lucide-react';
import { Navigation } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-darker-blue/90 backdrop-blur-md py-2 shadow-lg' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <motion.div className="flex items-center space-x-2" whileHover={{ scale: 1.05 }}>
          <Shield className="text-neon-green" size={28} />
          <h1 className="text-white font-orbitron text-xl font-bold tracking-wider">
            <span className="text-cool-blue">E</span>TRACK
          </h1>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <NavLink href="#features">Features</NavLink>
          <NavLink href="#devices">Devices</NavLink>
          <NavLink href="#about">About</NavLink>

          <ActionButton icon={<Bell size={16} />} text="Report Issue" />
          <ActionButton icon={<LogIn size={16} />} text="Login" href="/login" />
          <ActionButton icon={<UserPlus size={16} />} text="Register" href="/register" />
        </nav>

        {/* Mobile Menu Button */}
        <motion.button
          className="md:hidden text-white p-2"
          onClick={toggleMobileMenu}
          whileTap={{ scale: 0.9 }}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-darker-blue/95 backdrop-blur-md"
        >
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <MobileNavLink href="#features" onClick={toggleMobileMenu}>Features</MobileNavLink>
            <MobileNavLink href="#devices" onClick={toggleMobileMenu}>Devices</MobileNavLink>
            <MobileNavLink href="#about" onClick={toggleMobileMenu}>About</MobileNavLink>
            <MobileActionButton icon={<Bell size={16} />} text="Report Issue" />
            <MobileActionButton icon={<LogIn size={16} />} text="Login" href="/login" />
            <MobileActionButton icon={<UserPlus size={16} />} text="Register" href="/register" />
          </div>
        </motion.div>
      )}
    </motion.header>
  );
};

// Desktop nav links
const NavLink = ({ href, children }) => (
  <motion.a
    href={href}
    className="text-deep-gray hover:text-white transition-colors duration-300 font-exo"
    whileHover={{ color: '#00ffcc' }}
    transition={{ duration: 0.2 }}
  >
    {children}
  </motion.a>
);

// Desktop buttons
const ActionButton = ({ icon, text, href = '#' }) => (
  <motion.a
    href={href}
    className="flex items-center space-x-1 px-4 py-2 rounded-md bg-cool-blue text-white font-orbitron text-sm tracking-wide"
    whileHover={{ scale: 1.05, backgroundColor: '#00ffcc', color: '#0d1117' }}
    transition={{ duration: 0.2 }}
  >
    {icon}
    <span>{text}</span>
  </motion.a>
);

// Mobile links
const MobileNavLink = ({ href, onClick, children }) => (
  <motion.a
    href={href}
    onClick={onClick}
    className="text-deep-gray hover:text-white py-2 border-b border-cool-blue/20 font-exo"
    whileTap={{ scale: 0.98 }}
  >
    {children}
  </motion.a>
);

// Mobile buttons
const MobileActionButton = ({ icon, text, href = '#' }) => (
  <motion.a
    href={href}
    className="flex items-center justify-center space-x-2 px-4 py-3 rounded-md bg-cool-blue text-white font-orbitron text-sm tracking-wide"
    whileTap={{ scale: 0.95 }}
  >
    {icon}
    <span>{text}</span>
  </motion.a>
);

export default Header;
