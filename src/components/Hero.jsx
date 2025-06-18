import React, { useState, useContext } from 'react';
import {
  Monitor,
  WifiIcon,
  Keyboard,
  Mouse,
  Fan,
  Lightbulb,
  AirVent,
  Printer,
  HardDrive,
  Router,
  BatteryCharging,
  Usb,
  Tv,
  Speaker,
  Camera,
  Cpu,
  Projector,
  Server,
  Laptop,
  Plug,
  SatelliteDish,
  Settings,
  Smartphone,
  Tablet,
  Network,
  Database,
  Cloud,
  Shield,
  AlarmClock,
  Power,
  Bell,
  Bluetooth,
  Signal,
  Volume2,
  Radar
} from 'lucide-react';
import { motion } from 'framer-motion';
import BarcodeSearch from './BarcodeSearch';
import ComplaintModal from './ComplaintModal';
import LoginModal from './LoginModal';
import AuthContext from './context/AuthContext';

const Hero = () => {
  const [showComplaintModal, setShowComplaintModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useContext(AuthContext);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleComplaintClick = () => {
    isLoggedIn ? setShowComplaintModal(true) : setShowLoginModal(true);
  };

  const closeComplaintModal = () => setShowComplaintModal(false);
  const closeLoginModal = () => setShowLoginModal(false);

  const electronicItems = [
    Monitor,
    Keyboard,
    Mouse,
    Fan,
    Lightbulb,
    WifiIcon,
    AirVent,
    Printer,
    HardDrive,
    Router,
    BatteryCharging,
    Usb,
    Tv,
    Speaker,
    Camera,
    Cpu,
    Projector,
    Server,
    Laptop,
    Plug,
    SatelliteDish,
    Settings,
    Smartphone,
    Tablet,
    Network,
    Database,
    Cloud,
    Shield,
    AlarmClock,
    Power,
    Bell,
    Bluetooth,
    Signal,
    Volume2,
    Radar
  ];

  const floatAnimation = {
    animate: {
      y: [0, -15, 0, 15, 0],
      x: [0, 10, 0, -10, 0],
      opacity: [0, 0.3, 0.6, 0.3, 0],
      transition: {
        repeat: Infinity,
        duration: 10,
        ease: 'easeInOut',
        times: [0, 0.2, 0.5, 0.8, 1]
      },
    },
  };

  const getRandomPosition = () => {
    const margin = 10; // Fixed margin for consistent spacing
    const top = `${margin + Math.random() * (100 - 2 * margin)}%`;
    const left = `${margin + Math.random() * (100 - 2 * margin)}%`;
    return { top, left };
  };

  return (
    <main className="flex-grow overflow-x-hidden relative mt-4">
      <section className="min-h-[80vh] w-full relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/40 to-charcoal z-0" />

        {/* Animated Background Icons */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          {electronicItems.map((Icon, index) => {
            const { top, left } = getRandomPosition();
            return (
              <motion.div
                key={index}
                variants={floatAnimation}
                animate="animate"
                initial={{ opacity: 0 }}
                style={{ top, left }}
                className="absolute p-4 m-4 rounded-full bg-charcoal/40 border border-neon-green/20 shadow-md flex items-center justify-center backdrop-blur-sm" // Consistent margin
              >
                <Icon className="w-7 h-7 text-neon-green/50 drop-shadow-md" />
              </motion.div>
            );
          })}
        </div>

        <div className="container mx-auto px-4 sm:px-6 py-24 relative z-20">
          <div className="flex flex-col items-center justify-center text-center">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-orbitron font-bold mb-6 glow-text"
            >
              ETRACK <span className="text-neon-green">SYSTEM</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-lg sm:text-xl md:text-2xl font-exo mb-4 max-w-3xl text-white"
            >
              Advanced IoT monitoring system for electronic devices across campus
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-10"
            >
              <BarcodeSearch setSelectedProduct={setSelectedProduct} />
              {selectedProduct && <ProductCard product={selectedProduct} />}
            </motion.div>
          </div>
        </div>

        {showComplaintModal && <ComplaintModal onClose={closeComplaintModal} />}
        {showLoginModal && <LoginModal onClose={closeLoginModal} />}
      </section>
    </main>
  );
};

export default Hero;