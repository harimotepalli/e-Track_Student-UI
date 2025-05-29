


import React from 'react';
import { motion } from 'framer-motion';

const AboutSection = () => {
  // Animation variants for fade-up effect
  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' }
    }
  };

  // Animation variants for buttons
  const hoverEffect = {
    hover: {
      scale: 1.05,
      boxShadow: '0 0 10px rgba(0, 255, 204, 0.5)',
      transition: { duration: 0.3 }
    }
  };

return (
    <section id="about" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-orbitron text-3xl md:text-4xl font-bold text-white tracking-wider">
            About <span className="text-neon-green">ETrack</span> Property System
          </h2>
          <p className="text-deep-gray max-w-2xl mx-auto mt-4">
            A student-centric platform for managing campus infrastructure, smart facilities, and residential services with real-time insights.
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Content Section */}
          <motion.div
            className="md:w-1/2 bg-darker-blue/30 backdrop-blur-sm rounded-lg p-6 border border-cool-blue/30 shadow-neon-blue"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h3 className="font-orbitron text-xl font-semibold text-white mb-4">
              Empowering Campus Living
            </h3>
            <p className="text-deep-gray text-sm mb-4">
              ETrack revolutionizes campus management by providing students with a seamless digital platform to interact with university infrastructure. From reporting maintenance issues to accessing real-time room allocation data, ETrack ensures a hassle-free experience.
            </p>
            <h3 className="font-orbitron text-xl font-semibold text-white mb-4">
              Key Features
            </h3>
            <ul className="text-deep-gray text-sm list-disc list-inside space-y-2">
              <li>Real-time monitoring of campus facilities with automated alerts.</li>
              <li>Instant issue reporting for maintenance and infrastructure problems.</li>
              <li>Secure access to room assignments and facility dashboards.</li>
              <li>AI-powered analytics for predictive maintenance and optimal resource allocation.</li>
            </ul>
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <motion.a
                href="/learn-more"
                className="inline-block bg-cool-blue/20 text-white font-exo font-semibold py-3 px-6 rounded-lg shadow-neon-blue text-center border border-cool-blue/30 backdrop-blur-sm"
                variants={hoverEffect}
                whileHover="hover"
              >
                Learn More
              </motion.a>
              <motion.a
                href="/dashboard"
                className="inline-block bg-neon-green/20 text-white font-exo font-semibold py-3 px-6 rounded-lg shadow-neon-green text-center border border-neon-green/30 backdrop-blur-sm"
                variants={hoverEffect}
                whileHover="hover"
              >
                View Dashboard
              </motion.a>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            className="md:w-1/2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <img
              src={'data:image/jpeg;base64,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'}
              alt="ETrack Campus Technology"
              className="w-full h-auto rounded-lg shadow-xl object-cover"
            />
          </motion.div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-cool-blue/10 rounded-full blur-3xl"></div>
      <div className="absolute top-1/4 -right-32 w-64 h-64 bg-neon-green/10 rounded-full blur-3xl"></div>
    </section>
  );
};

export default AboutSection;