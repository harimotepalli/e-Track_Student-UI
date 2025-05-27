import React from 'react';
import {
  Monitor,
  WifiIcon,
  Keyboard,
  Mouse,
  Fan,
  Lightbulb,
  AirVent,
} from 'lucide-react';
import { motion } from 'framer-motion';

// import ComplaintModal from './ComplaintModal';

// Placeholder for ComplaintButton (replace with actual import if available)
// import ComplaintButton from './ComplaintButton';

const Hero = () => {
  // Define icon mapping for electronic items
  const electronicItems = {
    MONITOR: { icon: Monitor, name: 'Monitor' },
    KEYBOARD: { icon: Keyboard, name: 'Keyboard' },
    MOUSE: { icon: Mouse, name: 'Mouse' },
    FAN: { icon: Fan, name: 'Fan' },
    LIGHT: { icon: Lightbulb, name: 'Light' },
    WIFI_ROUTER: { icon: WifiIcon, name: 'Wi-Fi Router' },
    AC: { icon: AirVent, name: 'Air Conditioner' },
  };

  // Animation variants for icons
  const iconVariants = {
    initial: { scale: 1, rotate: 0, opacity: 0.8 },
    hover: {
      scale: 1.2,
      rotate: 10,
      opacity: 1,
      transition: { duration: 0.3, ease: 'easeInOut' },
    },
  };

  // Placeholder for handleComplaintClick (replace with actual logic if needed)
  const handleComplaintClick = () => {
    console.log('Complaint button clicked');
    // Add logic here or import from context/props
  };

  // Placeholder for ComplaintButton with styling to match LandingPage
  const ComplaintButton = ({ onClick }) => (
    <button
      onClick={onClick}
      className="px-8 py-4 bg-neon-green text-charcoal font-orbitron font-bold text-lg rounded-xl shadow-neon-green hover:bg-neon-green/90 hover:shadow-neon-green/80 transition animate-glow"
    >
      File a Complaint
    </button>
  );

  return (
    <section className="min-h-screen w-full relative">
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/40 to-charcoal z-0"></div>

      <div className="container mx-auto px-4 py-24 relative z-10">
        <div className="flex flex-col items-center justify-center h-[70vh] text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl font-orbitron font-bold mb-6 glow-text"
            >
            ETRACK <span className="text-neon-green">SYSTEM</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-xl md:text-2xl font-exo mb-12 max-w-3xl text-white"
          >
            Advanced IoT monitoring system for electronic devices across campus
          </motion.p>

          {/* Icons Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex flex-wrap justify-center gap-6 mb-12"
          >
            {Object.entries(electronicItems).map(([key, { icon: Icon, name }]) => (
              <motion.div
                key={key}
                variants={iconVariants}
                initial="initial"
                whileHover="hover"
                className="flex flex-col items-center p-4 rounded-lg bg-charcoal/50 hover:bg-charcoal/80 transition-colors shadow-neon-green/50 ">
                <Icon className="w-10 h-10 text-neon-green" />
                <span className="text-sm font-exo text-white mt-2"></span>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <ComplaintButton onClick={handleComplaintClick} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;