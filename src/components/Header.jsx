import React, { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { Menu, X, LogIn, MonitorCheck, LogOut, User } from "lucide-react";
import AuthContext from "./context/AuthContext"; // Import your AuthContext
import LoginModal from "./LoginModal";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLoggedIn, logout } = useContext(AuthContext); //
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <motion.header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-charcoal/80 backdrop-blur-md py-3 shadow-neon"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            <MonitorCheck className="w-8 h-8 text-neon-green mr-2 " />
            <span className="font-orbitron font-bold text-xl text-white">
              TECHNICAL <span className="text-neon-green">HUB</span>
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink href="#dashboard">Dashboard</NavLink>
            <NavLink href="#devices">Devices</NavLink>
            <NavLink href="#about">About</NavLink>
            <NavLink href="#support">Support</NavLink>

            {/* <ActionButton
              icon={<Bell size={16} />}
              text="Report Issue"
              className="flex items-center px-4 py-2 rounded-full bg-cool-blue/20 hover:bg-cool-blue/30 border border-cool-blue/50 text-white transition duration-300 "
            /> */}

            {isLoggedIn ? (
              <motion.button
                onClick={logout}
                className="flex items-center px-4 py-2 rounded-full bg-cool-blue/20 hover:bg-cool-blue/30 border border-cool-blue/50 text-white transition duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </motion.button>
            ) : (
              <motion.button
                onClick={() => {
                  toggleMenu(); // close menu
                  setShowLoginModal(true); // open modal
                }}
                className="flex items-center px-4 py-2 rounded-full bg-neon-green/20 hover:bg-neon-green/30 border border-neon-green/50 text-white transition duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <User className="w-4 h-4 mr-2" />
                Login
              </motion.button>
            )}

            {/* <ActionButton
              icon={<UserPlus size={16} />}
              text="Register"
              href="/register"
              className="flex items-center px-4 py-2 rounded-full bg-neon-green/20 hover:bg-neon-green/30 border border-neon-green/50 text-white transition duration-300"
            /> */}
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden text-white"
            onClick={toggleMenu}
            whileTap={{ scale: 0.9 }}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-charcoal/95 backdrop-blur-md"
        >
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              <MobileNavLink href="#dashboard" onClick={toggleMenu}>
                Dashboard
              </MobileNavLink>
              <MobileNavLink href="#devices" onClick={toggleMenu}>
                Devices
              </MobileNavLink>
              <MobileNavLink href="#about" onClick={toggleMenu}>
                About
              </MobileNavLink>
              <MobileNavLink href="#support" onClick={toggleMenu}>
                Support
              </MobileNavLink>
              {/* <MobileActionButton
                icon={<Bell size={16} />}
                text="Report Issue"
                className="flex items-center py-2 text-white hover:text-cool-blue transition duration-300"
              /> */}
              <MobileActionButton
                icon={<LogIn size={16} />}
                text="Login"
                href="/login"
                className="flex items-center py-2 text-white hover:text-neon-green transition duration-300"
              />
              {/* <MobileActionButton
                icon={<UserPlus size={16} />}
                text="Register"
                href="/register"
                className="flex items-center py-2 text-white hover:text-neon-green transition duration-300"
              /> */}
            </nav>
          </div>
        </motion.div>
      )}

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-lg font-bold mb-4">Login</h2>
            {/* Example login form */}
            <form>
              <input
                type="text"
                placeholder="Username"
                className="block mb-2 border p-2 w-full"
              />
              <input
                type="password"
                placeholder="Password"
                className="block mb-4 border p-2 w-full"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Submit
              </button>
            </form>
            <button
              className="mt-4 px-4 py-2 bg-gray-300 rounded"
              onClick={() => setShowLoginModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </motion.header>
  );
};

// Desktop nav links
const NavLink = ({ href, children }) => (
  <motion.a
    href={href}
    className="text-white hover:text-neon-green transition duration-300 "
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    {children}
  </motion.a>
);

// Desktop buttons
const ActionButton = ({ icon, text, href = "#", className }) => (
  <motion.a
    href={href}
    className={className}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
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
    className="text-white hover:text-neon-green transition duration-300 py-2"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    {children}
  </motion.a>
);

// Mobile buttons
const MobileActionButton = ({ icon, text, href = "#", className }) => (
  <motion.a
    href={href}
    className={className}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    {icon}
    <span>{text}</span>
  </motion.a>
);

export default Header;
