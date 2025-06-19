import React, { useState, useContext } from "react";
import {
  Monitor,
  WifiIcon,
  Keyboard,
  Mouse,
  Fan,
  Lightbulb,
  AirVent,
<<<<<<< HEAD
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
=======
  X,
  Check,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import BarcodeScannerComponent from "./BarcodeScannerComponent";
import BarcodeSearch from "./BarcodeSearch";
import LoginModal from "./LoginModal";
import AuthContext from "./context/AuthContext";
import { productData } from "../data/sampledata";
import { createPortal } from "react-dom";
import { cn } from "../utils/cn";
import { toast } from "react-toastify";

// ProductCardModal Component (extracted from BarcodeSearch)
const ProductCardModal = ({ product, onClose, triggerLoginModal }) => {
  const { isLoggedIn } = useContext(AuthContext);
  const [isReporting, setIsReporting] = useState(false);
  const [reportText, setReportText] = useState("");
  const [isSubmitted, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState("");

  const propertyIcons = {
    monitor: <Monitor className="h-8 w-8" />,
    keyboard: <Keyboard className="h-8 w-8" />,
    mouse: <Mouse className="h-8 w-8" />,
    fan: <Fan className="h-8 w-8" />,
    light: <Lightbulb className="h-8 w-8" />,
    router: <WifiIcon className="h-8 w-8" />,
    deviceType: <AirVent className="h-8 w-8" />,
  };

  const formatType = (type) => {
    return type
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const handleSubmit = () => {
    if (!reportText.trim()) {
      toast.error("Please provide a description of the issue");
      return;
    }
    if (!status) {
      toast.error("Please select a status");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      toast.success("Report submitted successfully!");
      setIsSubmitting(false);
      setIsReporting(false);
      setReportText("");
      setStatus("");
      onClose();
    }, 1000);
  };

  const modalContent = (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/80 backdrop-blur-sm p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="glassmorphism relative rounded-2xl w-full max-w-md overflow-hidden"
        >
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-orbitron font-bold text-neon-green">
                Product Details
              </h2>
              <button
                onClick={onClose}
                className="text-deep-gray hover:text-white"
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {!product ? (
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                className="text-center py-6"
              >
                <p className="text-lg text-red-500">Product not found.</p>
              </motion.div>
            ) : !isReporting && !isSubmitted ? (
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
              >
                <div className="flex items-center justify-start mb-6">
                  <div
                    className={cn(
                      "p-4 rounded-full mr-4",
                      product.property.status === "working"
                        ? "bg-neon-green/20 text-neon-green"
                        : "bg-red-500/20 text-red-500"
                    )}
                  >
                    {propertyIcons[product.property.type] || (
                      <Monitor className="h-8 w-8" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white">
                      {formatType(product.property.type)}
                    </h3>
                    <p className="text-sm text-deep-gray">
                      {product.property.brand} {product.property.model}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <h4 className="text-sm font-medium text-deep-gray mb-1">
                        Brand
                      </h4>
                      <p className="text-base text-white">
                        {product.property.brand}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-deep-gray mb-1">
                        Model
                      </h4>
                      <p className="text-base text-white">
                        {product.property.model}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <h4 className="text-sm font-medium text-deep-gray mb-1">
                        Status
                      </h4>
                      <p
                        className={cn(
                          "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium w-32",
                          product.property.status === "working"
                            ? "bg-neon-green/10 text-neon-green"
                            : "bg-red-500/10 text-red-500"
                        )}
                      >
                        {product.property.status === "working"
                          ? "Working"
                          : "Not Working"}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-deep-gray mb-1">
                        Location
                      </h4>
                      <p className="text-base text-white">
                        {product.location.floor.name},{" "}
                        {product.location.hall.name},{" "}
                        {product.location.room.name}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end mt-6">
                  <motion.button
                    type="button"
                    onClick={() => {
                      if (!isLoggedIn) {
                        toast.info("Please log in to report an issue.");
                        onClose(); // Close modal before opening login
                        triggerLoginModal(); // Open login modal
                      } else {
                        setIsReporting(true); // Continue to report flow
                      }
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 rounded-lg bg-gradient-to-r from-cool-blue to-neon-green text-charcoal font-medium"
                    aria-label="Report product issue"
                  >
                    Report Issue
                  </motion.button>
                </div>
              </motion.div>
            ) : isReporting && !isSubmitted ? (
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
              >
                <div className="mb-6">
                  <label className="w-full block text-sm font-medium text-deep-gray mb-2">
                    Status
                  </label>
                  <select
                    name="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full p-3 bg-charcoal/50 border border-deep-gray/30 rounded-lg focus:border-neon-green focus:ring focus:ring-neon-green/20 focus:outline-none text-white"
                    aria-label="Select product status"
                  >
                    <option value="" disabled>
                      Select Status
                    </option>
                    <option value="working">Working</option>
                    <option value="not-working">Not Working</option>
                  </select>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-deep-gray mb-2">
                    Issue Details
                  </label>
                  <textarea
                    value={reportText}
                    onChange={(e) => setReportText(e.target.value)}
                    className="w-full p-3 bg-charcoal/50 border border-deep-gray/30 rounded-lg focus:border-neon-green focus:ring focus:ring-neon-green/20 focus:outline-none text-white"
                    rows="4"
                    placeholder="Describe the issue you're experiencing..."
                    aria-label="Report issue description"
                  />
                </div>

                <div className="p-4 rounded-lg bg-charcoal border border-deep-gray/30 mb-6">
                  <h3 className="font-orbitron text-sm mb-2 text-white">
                    Summary
                  </h3>
                  <div className="grid grid-cols-2 gap-y-2 text-sm">
                    <span className="text-deep-gray">Type:</span>
                    <span className="text-white">
                      {formatType(product.property.type)}
                    </span>
                    <span className="text-deep-gray">Brand:</span>
                    <span className="text-white">{product.property.brand}</span>
                    <span className="text-deep-gray">Model:</span>
                    <span className="text-white">{product.property.model}</span>
                    <span className="text-deep-gray">Location:</span>
                    <span className="text-white">
                      {product.location.floor.name},{" "}
                      {product.location.hall.name}, {product.location.room.name}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between">
                  <motion.button
                    type="button"
                    onClick={() => setIsReporting(false)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 rounded-lg border border-deep-gray/30 hover:border-deep-gray/50 text-white"
                    aria-label="Cancel report"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    type="button"
                    onClick={handleSubmit}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 rounded-lg bg-gradient-to-r from-cool-blue to-neon-green text-charcoal font-medium"
                    aria-label="Submit report"
                  >
                    Submit
                  </motion.button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                className="text-center py-6"
              >
                <Check className="w-12 h-12 text-neon-green mx-auto mb-4" />
                <p className="text-lg text-white">
                  Report submitted successfully!
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
};
>>>>>>> 8b1f16b50cb5b0c35ad46ae1dd6d6d5423cbcb0e

const Hero = () => {
  const [showComplaintModal, setShowComplaintModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const { isLoggedIn } = useContext(AuthContext);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [notFound, setNotFound] = useState(false);

  const handleComplaintClick = () => {
    if (isLoggedIn) {
      setShowComplaintModal(true);
    } else {
      setShowLoginModal(true);
    }
  };

  const closeComplaintModal = () => {
    setShowComplaintModal(false);
  };

<<<<<<< HEAD
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
=======
  const closeLoginModal = () => {
    setShowLoginModal(false);
  };

  const electronicItems = {
    MONITOR: { icon: Monitor, name: "Monitor" },
    KEYBOARD: { icon: Keyboard, name: "Keyboard" },
    MOUSE: { icon: Mouse, name: "Mouse" },
    FAN: { icon: Fan, name: "Fan" },
    LIGHT: { icon: Lightbulb, name: "Light" },
    WIFI_ROUTER: { icon: WifiIcon, name: "Wi-Fi Router" },
    AC: { icon: AirVent, name: "Air Conditioner" },
  };

  const iconVariants = {
    initial: { scale: 1, rotate: 0, opacity: 0.8 },
    hover: {
      scale: 1.2,
      rotate: 10,
      opacity: 1,
      transition: { duration: 0.3, ease: "easeInOut" },
>>>>>>> 8b1f16b50cb5b0c35ad46ae1dd6d6d5423cbcb0e
    },
    initial: { opacity: 0 },
  };

<<<<<<< HEAD
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
=======
  const handleBarcodeDetected = (data) => {
    if (data && data.barcode && !data.property) {
      // Product not found
      setNotFound(true);
      setSelectedProduct(null);
    } else {
      setSelectedProduct(data);
      setNotFound(false);
    }
    setShowScanner(false);
  };

  const handleBarcodeSearch = (product) => {
    if (product) {
      setSelectedProduct(product);
      setNotFound(false);
    } else {
      setNotFound(true);
      setSelectedProduct(null);
    }
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setNotFound(false);
>>>>>>> 8b1f16b50cb5b0c35ad46ae1dd6d6d5423cbcb0e
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
      <section className="min-h-[80vh] w-full relative">
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/40 to-charcoal z-0"></div>

<<<<<<< HEAD
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
=======
        <div className="container mx-auto px-4 sm:px-6 py-24 relative z-10">
          <div className="flex flex-col items-center justify-center min-h-0 flex-1 text-center">
>>>>>>> 8b1f16b50cb5b0c35ad46ae1dd6d6d5423cbcb0e
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
              className="text-lg sm:text-xl md:text-2xl font-exo mb-2 sm:mb-4 max-w-3xl text-white"
            >
              Advanced IoT monitoring system for electronic devices across
              campus
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-2 sm:mb-4"
            >
              {Object.entries(electronicItems).map(
                ([key, { icon: Icon, name }]) => (
                  <motion.div
                    key={key}
                    variants={iconVariants}
                    initial="initial"
                    whileHover="hover"
                    className="flex flex-col items-center p-2 sm:p-4 rounded-lg bg-charcoal/50 hover:bg-charcoal/80 transition-colors shadow-neon-green/50"
                  >
                    <Icon className="w-10 h-10 text-neon-green" />
                    <span className="text-xs sm:text-sm font-exo text-white mt-2">
                      {name}
                    </span>
                  </motion.div>
                )
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex gap-4 mb-4"
            >
              <button
                onClick={() => setShowScanner(false)}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-cool-blue to-neon-green text-charcoal font-medium hover:scale-105 transition-transform"
              >
                Search Barcode
              </button>
              <button
                onClick={() => setShowScanner(true)}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-cool-blue to-neon-green text-charcoal font-medium hover:scale-105 transition-transform"
              >
                Scan Barcode
              </button>
            </motion.div>

            {showScanner ? (
              <BarcodeScannerComponent onDetected={handleBarcodeDetected} />
            ) : (
              <BarcodeSearch onSearch={handleBarcodeSearch} />
            )}

            {notFound && (
              <motion.p
                className="mt-4 text-red-500 font-medium text-center text-sm sm:text-base"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                Product not found.
              </motion.p>
            )}

            {selectedProduct && (
              <ProductCardModal
                product={selectedProduct}
                onClose={handleCloseModal}
                triggerLoginModal={() => setShowLoginModal(true)}
              />
            )}
          </div>
        </div>
        {showComplaintModal && <ComplaintModal onClose={closeComplaintModal} />}
        {showLoginModal && <LoginModal onClose={closeLoginModal} />}
      </section>
    </main>
  );
};

export default Hero;