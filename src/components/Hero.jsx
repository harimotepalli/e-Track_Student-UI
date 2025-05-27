// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import Globe from './Globe';
// import ComplaintModal from './ComplaintModal';

// const Hero = () => {
//   const [showModal, setShowModal] = useState(false);

//   return (
//     <section className="relative min-h-screen grid-background pt-20 overflow-hidden">
//       {/* Background Elements */}
//       <div className="absolute top-0 left-0 w-full h-full">
//         <div className="absolute top-[20%] left-[10%] w-24 h-24 bg-cool-blue/5 rounded-full blur-xl"></div>
//         <div className="absolute bottom-[30%] right-[5%] w-32 h-32 bg-neon-green/5 rounded-full blur-xl"></div>
//       </div>

//       <div className="container mx-auto px-4 py-12 flex flex-col items-center justify-center">
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 1.5 }}
//           className="text-center mb-8"
//         >
//           <h1 className="font-orbitron text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-wider glow-text">
//             <span className="text-cool-blue">E</span>TRACK SYSTEM
//           </h1>
//           <p className="font-exo text-deep-gray text-lg md:text-xl max-w-2xl mx-auto">
//             The next generation IoT-based electronic devices management system for smart campus infrastructure.
//           </p>
//         </motion.div>

//         {/* Globe Component */}
//         <div className="relative w-full h-[40vh] md:h-[50vh] lg:h-[60vh] my-8">
//           <Globe />
//         </div>

//         {/* CTA Buttons */}
//         <motion.div 
//           className="flex flex-col sm:flex-row gap-4 mt-8 z-10"
//           initial={{ opacity: 0, y: 50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.5, duration: 0.5 }}
//         >
//           <motion.button
//             onClick={() => setShowModal(true)}
//             className="holographic-button px-8 py-3 rounded-lg font-orbitron text-lg border border-cool-blue/30 shadow-neon-blue"
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.98 }}
//           >
//             Report an Issue
//           </motion.button>
//           <motion.button
//             className="holographic-button px-8 py-3 rounded-lg font-orbitron text-lg border border-neon-green/30 shadow-neon-green"
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.98 }}
//           >
//             Monitor Devices
//           </motion.button>
//         </motion.div>

//         {/* Stats Container */}
//         <motion.div 
//           className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mt-16 w-full max-w-4xl"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.8, duration: 0.8 }}
//         >
//           <StatCard value="500+" label="Devices" />
//           <StatCard value="24/7" label="Monitoring" />
//           <StatCard value="98.7%" label="Uptime" />
//           <StatCard value="5" label="Campus Floors" />
//         </motion.div>

//         {/* Complaint Modal */}
//         {showModal && <ComplaintModal onClose={() => setShowModal(false)} />}
//       </div>
//     </section>
//   );
// };

// const StatCard = ({ value, label }) => (
//   <motion.div 
//     className="glassmorphism rounded-lg p-4 flex flex-col items-center justify-center neon-border"
//     whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 255, 204, 0.1)' }}
//   >
//     <h3 className="font-orbitron text-2xl md:text-3xl font-bold text-neon-green">{value}</h3>
//     <p className="text-deep-gray font-exo text-sm md:text-base">{label}</p>
//   </motion.div>
// );

// export default Hero;

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