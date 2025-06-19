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
  Smartphone,
  Tablet,
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

  // Split electronic items into two groups for larger screens
  const electronicItemsGroup1 = [
    Monitor,
    Keyboard,
    Mouse,
    Fan,
    Lightbulb,
    WifiIcon,
    Tv,
    Speaker,
    Camera,
    Cpu,
    Projector,
  ];
  const electronicItemsGroup2 = [
    AirVent,
    Printer,
    HardDrive,
    Router,
    BatteryCharging,
    Usb,
    Server,
    Laptop,
    Plug,
    Smartphone,
    Tablet,
  ];

  // Subset of icons for responsive views (8 icons, 4 per side)
  const responsiveIcons = [
    Monitor,
    Keyboard,
    Fan,
    Lightbulb,
    AirVent,
    Router,
    Usb,
    Smartphone,
  ];

  // Define animation for icons
  const floatAnimation = {
    animate: {
      y: [0, -15, 0, 15, 0],
      x: [0, 10, 0, -10, 0],
      opacity: [0, 0.3, 0.6, 0.3, 0],
      transition: {
        repeat: Infinity,
        duration: 10,
        ease: 'easeInOut',
        times: [0, 0.2, 0.5, 0.8, 1],
      },
    },
    initial: { opacity: 0 },
  };

  // Define animation for responsive icons (from top)
  const responsiveFloatAnimation = {
    animate: {
      y: [-50, -15, 0, 15, 0],
      x: [0, 5, 0, -5, 0],
      opacity: [0, 0.5, 0.8, 0.5, 0],
      transition: {
        repeat: Infinity,
        duration: 8,
        ease: 'easeInOut',
        times: [0, 0.2, 0.5, 0.8, 1],
      },
    },
    initial: { y: -50, opacity: 0 },
  };

  // Define fixed positions for larger screens with 5% margins
  const iconPositionsGroup1 = [
    { top: '5%', left: '3%' },
    { top: '60%', left: '25%' },
    { top: '55%', left: '5%' },
    { top: '20%', left: '15%' },
    { top: '75%', left: '2%' },
    { top: '30%', left: '3%' },
    { top: '35%', left: '25%' },
    { top: '60%', left: '45%' },
    { top: '45%', left: '15%' },
    { top: '70%', left: '35%' },
    { top: '95%', left: '5%' },
  ];
  const iconPositionsGroup2 = [
    { top: '90%', left: '85%' },
    { top: '10%', left: '85%' },
    { top: '15%', left: '75%' },
    { top: '30%', left: '55%' },
    { top: '45%', left: '85%' },
    { top: '69%', left: '55%' },
    { top: '45%', left: '75%' },
    { top: '72%', left: '15%' },
    { top: '55%', left: '85%' },
    { top: '65%', left: '65%' },
    { top: '85%', left: '75%' },
  ];

  // Define positions for responsive icons (4 left, 4 right, 5% margins)
  const responsiveIconPositions = [
    { top: '10%', left: '5%' }, // Left
    { top: '20%', left: '15%' }, // Left
    { top: '30%', left: '5%' }, // Left
    { top: '40%', left: '15%' }, // Left
    { top: '10%', left: '75%' }, // Right
    { top: '20%', left: '85%' }, // Right
    { top: '30%', left: '75%' }, // Right
    { top: '40%', left: '85%' }, // Right
  ];

  return (
    <main className="flex-grow overflow-x-hidden relative mt-4">
      <section className="min-h-[80vh] w-full relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/40 to-charcoal z-0" />

        {/* Animated Background Icons */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          {/* Icons for larger screens */}
          {electronicItemsGroup1.map((Icon, index) => {
            const position = iconPositionsGroup1[index % iconPositionsGroup1.length];
            return (
              <motion.div
                key={`group1-${index}`}
                variants={floatAnimation}
                animate="animate"
                initial={floatAnimation.initial}
                style={{ top: position.top, left: position.left }}
                className="absolute p-14 m-4 rounded-full bg-charcoal/40 border-neon-green/20 shadow-md flex items-center justify-center backdrop-blur-sm hidden md:block"
              >
                <Icon className="w-7 h-7 text-neon-green/50 drop-shadow-md" />
              </motion.div>
            );
          })}
          {electronicItemsGroup2.map((Icon, index) => {
            const position = iconPositionsGroup2[index % iconPositionsGroup2.length];
            return (
              <motion.div
                key={`group2-${index}`}
                variants={floatAnimation}
                animate="animate"
                initial={floatAnimation.initial}
                style={{ top: position.top, left: position.left }}
                className="absolute p-14 m-4 rounded-full bg-charcoal/40 border-neon-green/20 shadow-md flex items-center justify-center backdrop-blur-sm hidden md:block"
              >
                <Icon className="w-7 h-7 text-neon-green/50 drop-shadow-md" />
              </motion.div>
            );
          })}
          {/* Icons for responsive views */}
          {responsiveIcons.map((Icon, index) => {
            const position = responsiveIconPositions[index % responsiveIconPositions.length];
            return (
              <motion.div
                key={`responsive-${index}`}
                variants={responsiveFloatAnimation}
                animate="animate"
                initial={responsiveFloatAnimation.initial}
                style={{ top: position.top, left: position.left }}
                className="absolute p-10 m-2 rounded-full bg-charcoal/40 border-neon-green/20 shadow-md flex items-center justify-center backdrop-blur-sm block md:hidden"
              >
                <Icon className="w-6 h-6 text-neon-green/50 drop-shadow-md" />
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