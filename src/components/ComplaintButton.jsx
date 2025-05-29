import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

const ComplaintButton = ({ onClick }) => {
  return (
    <motion.button
      onClick={onClick}
      className="flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-cool-blue to-neon-green text-charcoal font-bold font-orbitron shadow-lg hover:shadow-neon transition-all"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <AlertCircle className="w-5 h-5 mr-2" />
      Report Device Issue
    </motion.button>
  );
};

export default ComplaintButton;