import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Globe from './Globe';
import ComplaintModal from './ComplaintModal';

const Hero = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <section className="relative min-h-screen grid-background pt-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-[20%] left-[10%] w-24 h-24 bg-cool-blue/5 rounded-full blur-xl"></div>
        <div className="absolute bottom-[30%] right-[5%] w-32 h-32 bg-neon-green/5 rounded-full blur-xl"></div>
      </div>

      <div className="container mx-auto px-4 py-12 flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="text-center mb-8"
        >
          <h1 className="font-orbitron text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-wider glow-text">
            <span className="text-cool-blue">E</span>TRACK SYSTEM
          </h1>
          <p className="font-exo text-deep-gray text-lg md:text-xl max-w-2xl mx-auto">
            The next generation IoT-based electronic devices management system for smart campus infrastructure.
          </p>
        </motion.div>

        {/* Globe Component */}
        <div className="relative w-full h-[40vh] md:h-[50vh] lg:h-[60vh] my-8">
          <Globe />
        </div>

        {/* CTA Buttons */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 mt-8 z-10"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <motion.button
            onClick={() => setShowModal(true)}
            className="holographic-button px-8 py-3 rounded-lg font-orbitron text-lg border border-cool-blue/30 shadow-neon-blue"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Report an Issue
          </motion.button>
          <motion.button
            className="holographic-button px-8 py-3 rounded-lg font-orbitron text-lg border border-neon-green/30 shadow-neon-green"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Monitor Devices
          </motion.button>
        </motion.div>

        {/* Stats Container */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mt-16 w-full max-w-4xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <StatCard value="500+" label="Devices" />
          <StatCard value="24/7" label="Monitoring" />
          <StatCard value="98.7%" label="Uptime" />
          <StatCard value="5" label="Campus Floors" />
        </motion.div>

        {/* Complaint Modal */}
        {showModal && <ComplaintModal onClose={() => setShowModal(false)} />}
      </div>
    </section>
  );
};

const StatCard = ({ value, label }) => (
  <motion.div 
    className="glassmorphism rounded-lg p-4 flex flex-col items-center justify-center neon-border"
    whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 255, 204, 0.1)' }}
  >
    <h3 className="font-orbitron text-2xl md:text-3xl font-bold text-neon-green">{value}</h3>
    <p className="text-deep-gray font-exo text-sm md:text-base">{label}</p>
  </motion.div>
);

export default Hero;