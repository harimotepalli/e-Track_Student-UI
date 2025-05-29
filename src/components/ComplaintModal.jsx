import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check } from 'lucide-react';
import { toast } from 'react-toastify';

const ComplaintModal = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    floor: '',
    wing: '',
    room: '',
    device: '',
    description: ''
  });

  const floors = ["2nd Floor", "3rd Floor", "4th Floor", "5th Floor"];
  
  const wings = {
    "2nd Floor": ["A Wing", "B Wing", "C Wing"],
    "3rd Floor": ["A Wing", "B Wing", "C Wing", "D Wing"],
    "4th Floor": ["A Wing", "B Wing"],
    "5th Floor": ["A Wing", "Main Wing"],
  };
  
  const rooms = {
    "A Wing": ["Room 101", "Room 102", "Room 103", "Lab 1", "Lab 2"],
    "B Wing": ["Room 201", "Room 202", "Room 203", "Conference Room"],
    "C Wing": ["Room 301", "Room 302", "Lab 3"],
    "D Wing": ["Room 401", "Room 402", "Server Room"],
    "Main Wing": ["Main Lab", "Auditorium", "Library"]
  };
  
  const devices = {
    "Monitor": ["Dell P2419H", "HP Z27", "LG UltraFine", "Samsung S32"],
    "Computer": ["Dell OptiPlex", "HP EliteDesk", "Apple Mac Mini"],
    "Router": ["Cisco SG300", "TP-Link Archer", "Netgear Nighthawk"],
    "AC": ["Daikin Inverter", "Mitsubishi MSZ", "Carrier Ductless"],
    "Projector": ["Epson PowerLite", "BenQ TH685", "Sony VPL"],
    "CCTV": ["Hikvision Dome", "Dahua Bullet", "Axis PTZ"]
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Reset dependent fields when parent field changes
    if (name === 'floor') {
      setFormData(prev => ({ ...prev, wing: '', room: '', device: '' }));
    } else if (name === 'wing') {
      setFormData(prev => ({ ...prev, room: '', device: '' }));
    } else if (name === 'room') {
      setFormData(prev => ({ ...prev, device: '' }));
    }
  };

  const nextStep = () => {
    if (step === 1 && !formData.floor) {
      toast.error("Please select a floor");
      return;
    }
    if (step === 2 && !formData.wing) {
      toast.error("Please select a wing");
      return;
    }
    if (step === 3 && !formData.room) {
      toast.error("Please select a room");
      return;
    }
    if (step === 4 && !formData.device) {
      toast.error("Please select a device");
      return;
    }
    
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.description) {
      toast.error("Please provide a description of the issue");
      return;
    }
    
    console.log("Form submitted:", formData);
    toast.success("Complaint submitted successfully!");
    onClose();
  };

  return (
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
              <h2 className="text-2xl font-orbitron font-bold text-neon-green">Device Issue Report</h2>
              <button 
                onClick={onClose}
                className="text-deep-gray hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="mb-6">
              <div className="flex justify-between relative mb-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div 
                    key={i}
                    className={`w-8 h-8 rounded-full flex items-center justify-center z-10 ${
                      step >= i ? 'bg-neon-green text-charcoal' : 'bg-deep-gray/30 text-deep-gray'
                    }`}
                  >
                    {i < step ? <Check className="w-4 h-4" /> : i}
                  </div>
                ))}
                <div className="absolute top-4 left-0 right-0 h-0.5 bg-deep-gray/30 -z-0"></div>
                <div 
                  className="absolute top-4 left-0 h-0.5 bg-neon-green -z-0 transition-all duration-300"
                  style={{ width: `${(step - 1) * 25}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-deep-gray">
                <span>Location</span>
                <span>Wing</span>
                <span>Room</span>
                <span>Device</span>
                <span>Details</span>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              {step === 1 && (
                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  className="mb-6"
                >
                  <label className="block text-sm font-medium text-deep-gray mb-2">
                    Select Floor
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {floors.map((floor) => (
                      <motion.button
                        key={floor}
                        type="button"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setFormData({ ...formData, floor })}
                        className={`p-4 rounded-lg border ${
                          formData.floor === floor
                            ? 'border-neon-green bg-neon-green/10 text-neon-green'
                            : 'border-deep-gray/30 hover:border-deep-gray/50'
                        }`}
                      >
                        {floor}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  className="mb-6"
                >
                  <label className="block text-sm font-medium text-deep-gray mb-2">
                    Select Wing
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {wings[formData.floor].map((wing) => (
                      <motion.button
                        key={wing}
                        type="button"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setFormData({ ...formData, wing })}
                        className={`p-4 rounded-lg border ${
                          formData.wing === wing
                            ? 'border-neon-green bg-neon-green/10 text-neon-green'
                            : 'border-deep-gray/30 hover:border-deep-gray/50'
                        }`}
                      >
                        {wing}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  className="mb-6"
                >
                  <label className="block text-sm font-medium text-deep-gray mb-2">
                    Select Room
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {rooms[formData.wing].map((room) => (
                      <motion.button
                        key={room}
                        type="button"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setFormData({ ...formData, room })}
                        className={`p-4 rounded-lg border ${
                          formData.room === room
                            ? 'border-neon-green bg-neon-green/10 text-neon-green'
                            : 'border-deep-gray/30 hover:border-deep-gray/50'
                        }`}
                      >
                        {room}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  className="mb-6"
                >
                  <label className="block text-sm font-medium text-deep-gray mb-2">
                    Select Device Type
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {Object.keys(devices).map((device) => (
                      <motion.button
                        key={device}
                        type="button"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setFormData({ ...formData, device })}
                        className={`p-4 rounded-lg border ${
                          formData.device === device
                            ? 'border-neon-green bg-neon-green/10 text-neon-green'
                            : 'border-deep-gray/30 hover:border-deep-gray/50'
                        }`}
                      >
                        {device}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 5 && (
                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  className="mb-6"
                >
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-deep-gray mb-2">
                      Issue Details
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      className="w-full p-3 bg-charcoal/50 border border-deep-gray/30 rounded-lg focus:border-neon-green focus:ring focus:ring-neon-green/20 focus:outline-none text-white"
                      rows="4"
                      placeholder="Describe the issue you're experiencing..."
                    ></textarea>
                  </div>

                  <div className="p-4 rounded-lg bg-charcoal border border-deep-gray/30">
                    <h3 className="font-orbitron text-sm mb-2">Summary</h3>
                    <div className="grid grid-cols-2 gap-y-2 text-sm">
                      <span className="text-deep-gray">Floor:</span>
                      <span>{formData.floor}</span>
                      <span className="text-deep-gray">Wing:</span>
                      <span>{formData.wing}</span>
                      <span className="text-deep-gray">Room:</span>
                      <span>{formData.room}</span>
                      <span className="text-deep-gray">Device:</span>
                      <span>{formData.device}</span>
                    </div>
                  </div>
                </motion.div>
              )}

              <div className="flex justify-between">
                {step > 1 && (
                  <motion.button
                    type="button"
                    onClick={prevStep}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 rounded-lg border border-deep-gray/30 hover:border-deep-gray/50"
                  >
                    Back
                  </motion.button>
                )}
                
                {step < 5 ? (
                  <motion.button
                    type="button"
                    onClick={nextStep}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 rounded-lg bg-gradient-to-r from-cool-blue to-neon-green text-charcoal font-medium ml-auto"
                  >
                    Next
                  </motion.button>
                ) : (
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 rounded-lg bg-gradient-to-r from-cool-blue to-neon-green text-charcoal font-medium ml-auto"
                  >
                    Submit
                  </motion.button>
                )}
              </div>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ComplaintModal;