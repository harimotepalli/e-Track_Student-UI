import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, ChevronLeft, Send, Laptop, Smartphone, Router, Fan, Monitor, MousePointer } from 'lucide-react';

const ComplaintModal = ({ onClose }) => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    floor: '',
    wing: '',
    room: '',
    device: '',
    description: ''
  });

  // Available options for each step
  const floors = ['Floor 2', 'Floor 3', 'Floor 4', 'Floor 5'];
  
  const wings = {
    'Floor 2': ['Wing A', 'Wing B', 'Wing C'],
    'Floor 3': ['Wing A', 'Wing B', 'Wing C', 'Wing D'],
    'Floor 4': ['Wing A', 'Wing B'],
    'Floor 5': ['Wing A', 'Wing C']
  };
  
  const rooms = {
    'Wing A': ['Room 101', 'Room 102', 'Room 103', 'Room 104'],
    'Wing B': ['Room 201', 'Room 202', 'Room 203'],
    'Wing C': ['Room 301', 'Room 302', 'Room 303', 'Room 304', 'Room 305'],
    'Wing D': ['Room 401', 'Room 402']
  };
  
  const devices = [
    { id: 'monitor', name: 'Monitor', icon: <Monitor size={24} /> },
    { id: 'computer', name: 'Computer', icon: <Laptop size={24} /> },
    { id: 'mouse', name: 'Mouse', icon: <MousePointer size={24} /> },
    { id: 'smartphone', name: 'Smartphone', icon: <Smartphone size={24} /> },
    { id: 'router', name: 'Router', icon: <Router size={24} /> },
    { id: 'ac', name: 'Air Conditioner', icon: <Fan size={24} /> }
  ];

  const handleChange = (field, value) => {
    // Reset dependent fields when parent field changes
    if (field === 'floor') {
      setFormData({ ...formData, floor: value, wing: '', room: '', device: '', description: '' });
    } else if (field === 'wing') {
      setFormData({ ...formData, wing: value, room: '', device: '', description: '' });
    } else if (field === 'room') {
      setFormData({ ...formData, room: value, device: '', description: '' });
    } else if (field === 'device') {
      setFormData({ ...formData, device: value, description: '' });
    } else {
      setFormData({ ...formData, [field]: value });
    }
  };

  const handleNext = () => {
    if (canProceed()) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    setStep(Math.max(0, step - 1));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    onClose();
  };

  const canProceed = () => {
    switch (step) {
      case 0: return !!formData.floor;
      case 1: return !!formData.wing;
      case 2: return !!formData.room;
      case 3: return !!formData.device;
      case 4: return formData.description.length >= 10;
      default: return false;
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.2 } }
  };

  const contentVariants = {
    hidden: { x: 50, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.3 } },
    exit: { x: -50, opacity: 0, transition: { duration: 0.2 } }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <motion.div 
          className="glassmorphism w-full max-w-md rounded-lg relative overflow-hidden"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Header */}
          <div className="p-4 border-b border-cool-blue/20 flex justify-between items-center">
            <h3 className="font-orbitron text-xl text-white">Report an Issue</h3>
            <button 
              onClick={onClose}
              className="text-deep-gray hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Progress indicator */}
          <div className="w-full h-1 bg-darker-blue">
            <motion.div 
              className="h-full bg-neon-green"
              initial={{ width: `${(step / 4) * 100}%` }}
              animate={{ width: `${(step / 4) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Step content */}
          <form onSubmit={handleSubmit}>
            <div className="p-6">
              <AnimatePresence mode="wait">
                {step === 0 && (
                  <StepContent key="step0" title="Select Floor" variants={contentVariants}>
                    <div className="grid grid-cols-2 gap-3">
                      {floors.map((floor) => (
                        <SelectionButton
                          key={floor}
                          text={floor}
                          selected={formData.floor === floor}
                          onClick={() => handleChange('floor', floor)}
                        />
                      ))}
                    </div>
                  </StepContent>
                )}

                {step === 1 && (
                  <StepContent key="step1" title="Select Wing" variants={contentVariants}>
                    <div className="grid grid-cols-2 gap-3">
                      {wings[formData.floor].map((wing) => (
                        <SelectionButton
                          key={wing}
                          text={wing}
                          selected={formData.wing === wing}
                          onClick={() => handleChange('wing', wing)}
                        />
                      ))}
                    </div>
                  </StepContent>
                )}

                {step === 2 && (
                  <StepContent key="step2" title="Select Room" variants={contentVariants}>
                    <div className="grid grid-cols-2 gap-3">
                      {rooms[formData.wing].map((room) => (
                        <SelectionButton
                          key={room}
                          text={room}
                          selected={formData.room === room}
                          onClick={() => handleChange('room', room)}
                        />
                      ))}
                    </div>
                  </StepContent>
                )}

                {step === 3 && (
                  <StepContent key="step3" title="Select Device" variants={contentVariants}>
                    <div className="grid grid-cols-2 gap-3">
                      {devices.map((device) => (
                        <SelectionButton
                          key={device.id}
                          text={device.name}
                          icon={device.icon}
                          selected={formData.device === device.id}
                          onClick={() => handleChange('device', device.id)}
                        />
                      ))}
                    </div>
                  </StepContent>
                )}

                {step === 4 && (
                  <StepContent key="step4" title="Describe the Issue" variants={contentVariants}>
                    <div className="space-y-4">
                      <div className="flex flex-col">
                        <textarea
                          value={formData.description}
                          onChange={(e) => handleChange('description', e.target.value)}
                          className="bg-darker-blue border border-cool-blue/30 rounded-lg p-3 text-white h-28 focus:outline-none focus:border-neon-green focus:ring-1 focus:ring-neon-green/50 transition-all"
                          placeholder="Please describe the issue in detail..."
                        />
                        <p className="text-xs text-deep-gray mt-2">
                          Characters: {formData.description.length}/500
                        </p>
                      </div>

                      <div className="bg-darker-blue/50 p-4 rounded-lg">
                        <h4 className="font-orbitron text-sm text-white mb-2">Issue Summary</h4>
                        <ul className="space-y-1 text-sm">
                          <li className="text-deep-gray flex justify-between">
                            <span>Location:</span>
                            <span className="text-white">{formData.floor}, {formData.wing}, {formData.room}</span>
                          </li>
                          <li className="text-deep-gray flex justify-between">
                            <span>Device:</span>
                            <span className="text-white">
                              {devices.find(d => d.id === formData.device)?.name || ''}
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </StepContent>
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-cool-blue/20 flex justify-between">
              {step > 0 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="flex items-center space-x-1 text-deep-gray hover:text-white transition-colors"
                >
                  <ChevronLeft size={16} />
                  <span>Back</span>
                </button>
              ) : (
                <div></div>
              )}

              {step < 4 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className={`flex items-center space-x-1 px-4 py-2 rounded-md 
                    ${canProceed() 
                      ? 'bg-cool-blue text-white hover:bg-neon-green hover:text-darker-blue' 
                      : 'bg-darker-blue text-deep-gray cursor-not-allowed'} 
                    transition-colors`}
                >
                  <span>Next</span>
                  <ChevronRight size={16} />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!canProceed()}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md 
                    ${canProceed() 
                      ? 'bg-neon-green text-darker-blue hover:bg-cool-blue hover:text-white' 
                      : 'bg-darker-blue text-deep-gray cursor-not-allowed'} 
                    transition-colors`}
                >
                  <span>Submit</span>
                  <Send size={16} />
                </button>
              )}
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const StepContent = ({ title, children, variants }) => (
  <motion.div
    variants={variants}
    initial="hidden"
    animate="visible"
    exit="exit"
    className="space-y-4"
  >
    <h4 className="font-orbitron text-lg text-white">{title}</h4>
    {children}
  </motion.div>
);

const SelectionButton = ({ text, icon, selected, onClick }) => (
  <motion.button
    type="button"
    onClick={onClick}
    className={`p-3 rounded-lg flex items-center space-x-2 transition-all duration-200
      ${selected 
        ? 'bg-cool-blue/20 border border-cool-blue shadow-neon-blue' 
        : 'bg-darker-blue border border-cool-blue/10 hover:border-cool-blue/30'}`}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
  >
    {icon && <span>{icon}</span>}
    <span className={`font-exo ${selected ? 'text-white' : 'text-deep-gray'}`}>{text}</span>
    {selected && (
      <motion.div
        className="w-2 h-2 ml-auto bg-neon-green rounded-full"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 500, damping: 15 }}
      />
    )}
  </motion.button>
);

export default ComplaintModal;