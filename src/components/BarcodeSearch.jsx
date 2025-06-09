
import { Button } from './ui/button';
import { cn } from '../utils/cn';


import { createPortal } from 'react-dom';
import {  AnimatePresence } from 'framer-motion';
import { X, Check, Monitor, Keyboard, Mouse, Fan, Lightbulb, Wifi, AirVent } from 'lucide-react';
import { toast } from 'react-toastify';





const propertyIcons = {
  monitor: <Monitor className="h-8 w-8" />,
  keyboard: <Keyboard className="h-8 w-8" />,
  mouse: <Mouse className="h-8 w-8" />,
  fan: <Fan className="h-8 w-8" />,
  light: <Lightbulb className="h-8 w-8" />,
  router: <Wifi className="h-8 w-8" />,
  deviceType: <AirVent className="h-8 w-8" />,
};

const ProductCard = ({ product, onClose }) => {
  const [isReporting, setIsReporting] = useState(false);
  const [reportText, setReportText] = useState('');
  const [isSubmitted, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState('');

  const formatType = (type) => {
    return type
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const handleSubmit = () => {
    if (!reportText.trim()) {
      toast.error('Please provide a description of the issue');
      return;
    }
    if (!status) {
      toast.error('Please select a status');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      toast.success('Report submitted successfully!');
      setIsSubmitting(false);
      setIsReporting(false);
      setReportText('');
      setStatus('');
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
              <h2 className="text-2xl font-orbitron font-bold text-neon-green">Product Details</h2>
              <button
                onClick={onClose}
                className="text-deep-gray hover:text-white"
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {!isReporting && !isSubmitted ? (
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
              >
                <div className="flex items-center justify-start mb-6">
                  <div
                    className={cn(
                      'p-4 rounded-full mr-4',
                      product.property.status === 'working'
                        ? 'bg-neon-green/20 text-neon-green'
                        : 'bg-red-500/20 text-red-500'
                    )}
                  >
                    {propertyIcons[product.property.type] || <Monitor className="h-8 w-8" />}
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white">{formatType(product.property.type)}</h3>
                    <p className="text-sm text-deep-gray">
                      {product.property.brand} {product.property.model}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <h4 className="text-sm font-medium text-deep-gray mb-1">Brand</h4>
                      <p className="text-base text-white">{product.property.brand}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-deep-gray mb-1">Model</h4>
                      <p className="text-base text-white">{product.property.model}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <h4 className="text-sm font-medium text-deep-gray mb-1">Status</h4>
                      <p
                        className={cn(
                          'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium w-32',
                          product.property.status === 'working'
                            ? 'bg-neon-green/10 text-neon-green'
                            : 'bg-red-500/10 text-red-500'
                        )}
                      >
                        {product.property.status === 'working' ? 'Working' : 'Not Working'}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-deep-gray mb-1">Location</h4>
                      <p className="text-base text-white">
                        {product.location.floor.name}, {product.location.hall.name}, {product.location.room.name}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end mt-6">
                  <motion.button
                    type="button"
                    onClick={() => setIsReporting(true)}
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
                  <label className="w-full block text-sm font-medium text-deep-gray mb-2">Status</label>
                  <select
                    name="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full p-3 bg-charcoal/50 border border-deep-gray/30 rounded-lg focus:border-neon-green focus:ring focus:ring-neon-green/20 focus:outline-none text-white"
                    aria-label="Select product status"
                  >
                    <option value="" disabled>Select Status</option>
                    <option value="working">Working</option>
                    <option value="not-working">Not Working</option>
                  </select>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-deep-gray mb-2">Issue Details</label>
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
                  <h3 className="font-orbitron text-sm mb-2 text-white">Summary</h3>
                  <div className="grid grid-cols-2 gap-y-2 text-sm">
                    <span className="text-deep-gray">Type:</span>
                    <span className="text-white">{formatType(product.property.type)}</span>
                    <span className="text-deep-gray">Brand:</span>
                    <span className="text-white">{product.property.brand}</span>
                    <span className="text-deep-gray">Model:</span>
                    <span className="text-white">{product.property.model}</span>
                    <span className="text-deep-gray">Location:</span>
                    <span className="text-white">
                      {product.location.floor.name}, {product.location.hall.name}, {product.location.room.name}
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
                <p className="text-lg text-white">Report submitted successfully!</p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
};

// const propertyIcons = {
//   monitor: <Monitor className="h-8 w-8" />,
//   keyboard: <Keyboard className="h-8 w-8" />,
//   mouse: <Mouse className="h-8 w-8" />,
//   fan: <Fan className="h-8 w-8" />,
//   light: <Lightbulb className="h-8 w-8" />,
//   router: <Wifi className="h-8 w-8" />,
//   deviceType: <AirVent className="h-8 w-8" />,
// };

// const ProductCard = ({ product, onClose }) => {
//   const [isReporting, setIsReporting] = useState(false);
//   const [reportText, setReportText] = useState('');
//   const [isSubmitted, setIsSubmitting] = useState(false);
//   const [status, setStatus] = useState('');

//   const formatType = (type) => {
//     return type
//       .split('-')
//       .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//       .join(' ');
//   };

//   const handleSubmit = () => {
//     if (!reportText.trim()) {
//       toast.error('Please provide a description of the issue');
//       return;
//     }
//     if (!status) {
//       toast.error('Please select a status');
//       return;
//     }
//     setIsSubmitting(true);
//     setTimeout(() => {
//       toast.success('Report submitted successfully!');
//       setIsSubmitting(false);
//       setIsReporting(false);
//       setReportText('');
//       setStatus('');
//       onClose();
//     }, 1000);
//   };

//   const modalContent = (
//     <AnimatePresence>
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/80 backdrop-blur-sm p-4"
//       >
//         <motion.div
//           initial={{ scale: 0.9, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//           exit={{ scale: 0.9, opacity: 0 }}
//           className="glassmorphism relative rounded-2xl w-full max-w-md overflow-hidden"
//         >
//           <div className="p-6">
//             <div className="flex justify-between items-center mb-6">
//               <h2 className="text-2xl font-orbitron font-bold text-neon-green">Product Details</h2>
//               <button
//                 onClick={onClose}
//                 className="text-deep-gray hover:text-white"
//                 aria-label="Close"
//               >
//                 <X className="w-6 h-6" />
//               </button>
//             </div>

//             {!isReporting && !isSubmitted ? (
//               <motion.div
//                 initial={{ x: 20, opacity: 0 }}
//                 animate={{ x: 0, opacity: 1 }}
//                 exit={{ x: -20, opacity: 0 }}
//               >
//                 <div className="flex items-center justify-start mb-6">
//                   <div
//                     className={cn(
//                       'p-4 rounded-full mr-4',
//                       product.property.status === 'working'
//                         ? 'bg-neon-green/20 text-neon-green'
//                         : 'bg-red-500/20 text-red-500'
//                     )}
//                   >
//                     {propertyIcons[product.property.type] || <Monitor className="h-8 w-8" />}
//                   </div>
//                   <div>
//                     <h3 className="text-lg font-medium text-white">{formatType(product.property.type)}</h3>
//                     <p className="text-sm text-deep-gray">
//                       {product.property.brand} {product.property.model}
//                     </p>
//                   </div>
//                 </div>

//                 <div className="space-y-4">
//                   <div className="grid grid-cols-2 gap-3">
//                     <div>
//                       <h4 className="text-sm font-medium text-deep-gray mb-1">Brand</h4>
//                       <p className="text-base text-white">{product.property.brand}</p>
//                     </div>
//                     <div>
//                       <h4 className="text-sm font-medium text-deep-gray mb-1">Model</h4>
//                       <p className="text-base text-white">{product.property.model}</p>
//                     </div>
//                   </div>

//                   <div className="grid grid-cols-2 gap-3">
//                     <div>
//                       <h4 className="text-sm font-medium text-deep-gray mb-1">Status</h4>
//                       <p
//                         className={cn(
//                           'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium w-32',
//                           product.property.status === 'working'
//                             ? 'bg-neon-green/10 text-neon-green'
//                             : 'bg-red-500/10 text-red-500'
//                         )}
//                       >
//                         {product.property.status === 'working' ? 'Working' : 'Not Working'}
//                       </p>
//                     </div>
//                     <div>
//                       <h4 className="text-sm font-medium text-deep-gray mb-1">Location</h4>
//                       <p className="text-base text-white">
//                         {product.location.floor.name}, {product.location.hall.name}, {product.location.room.name}
//                       </p>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="flex justify-end mt-6">
//                   <motion.button
//                     type="button"
//                     onClick={() => setIsReporting(true)}
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     className="px-4 py-2 rounded-lg bg-gradient-to-r from-cool-blue to-neon-green text-charcoal font-medium"
//                     aria-label="Report product issue"
//                   >
//                     Report Issue
//                   </motion.button>
//                 </div>
//               </motion.div>
//             ) : isReporting && !isSubmitted ? (
//               <motion.div
//                 initial={{ x: 20, opacity: 0 }}
//                 animate={{ x: 0, opacity: 1 }}
//                 exit={{ x: -20, opacity: 0 }}
//               >
//                 <div className="mb-6">
//                   <label className="block text-sm font-medium text-deep-gray mb-2">Status</label>
//                   <select
//                     name="status"
//                     value={status}
//                     onChange={(e) => setStatus(e.target.value)}
//                     className="w-full p-3 bg-charcoal/50 border border-deep-gray/30 rounded-lg focus:border-neon-green focus:ring focus:ring-neon-green/20 focus:outline-none text-white"
//                     aria-label="Select product status"
//                   >
//                     <option value="" disabled>Select Status</option>
//                     <option value="working">Working</option>
//                     <option value="not-working">Not Working</option>
//                   </select>
//                 </div>

//                 <div className="mb-6">
//                   <label className="block text-sm font-medium text-deep-gray mb-2">Issue Details</label>
//                   <textarea
//                     value={reportText}
//                     onChange={(e) => setReportText(e.target.value)}
//                     className="w-full p-3 bg-charcoal/50 border border-deep-gray/30 rounded-lg focus:border-neon-green focus:ring focus:ring-neon-green/20 focus:outline-none text-white"
//                     rows="4"
//                     placeholder="Describe the issue you're experiencing..."
//                     aria-label="Report issue description"
//                   />
//                 </div>

//                 <div className="p-4 rounded-lg bg-charcoal border border-deep-gray/30 mb-6">
//                   <h3 className="font-orbitron text-sm mb-2 text-white">Summary</h3>
//                   <div className="grid grid-cols-2 gap-y-2 text-sm">
//                     <span className="text-deep-gray">Type:</span>
//                     <span className="text-white">{formatType(product.property.type)}</span>
//                     <span className="text-deep-gray">Brand:</span>
//                     <span className="text-white">{product.property.brand}</span>
//                     <span className="text-deep-gray">Model:</span>
//                     <span className="text-white">{product.property.model}</span>
//                     <span className="text-deep-gray">Location:</span>
//                     <span className="text-white">
//                       {product.location.floor.name}, {product.location.hall.name}, {product.location.room.name}
//                     </span>
//                   </div>
//                 </div>

//                 <div className="flex justify-between">
//                   <motion.button
//                     type="button"
//                     onClick={() => setIsReporting(false)}
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     className="px-4 py-2 rounded-lg border border-deep-gray/30 hover:border-deep-gray/50 text-white"
//                     aria-label="Cancel report"
//                   >
//                     Cancel
//                   </motion.button>
//                   <motion.button
//                     type="button"
//                     onClick={handleSubmit}
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     className="px-4 py-2 rounded-lg bg-gradient-to-r from-cool-blue to-neon-green text-charcoal font-medium"
//                     aria-label="Submit report"
//                   >
//                     Submit
//                   </motion.button>
//                 </div>
//               </motion.div>
//             ) : (
//               <motion.div
//                 initial={{ x: 20, opacity: 0 }}
//                 animate={{ x: 0, opacity: 1 }}
//                 exit={{ x: -20, opacity: 0 }}
//                 className="text-center py-6"
//               >
//                 <Check className="w-12 h-12 text-neon-green mx-auto mb-4" />
//                 <p className="text-lg text-white">Report submitted successfully!</p>
//               </motion.div>
//             )}
//           </div>
//         </motion.div>
//       </motion.div>
//     </AnimatePresence>
//   );

//   return createPortal(modalContent, document.body);
// };




const BarcodeSearch = () => {
  const [barcode, setBarcode] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const inputRef = useRef(null);

  // Handle input change and filter suggestions
  const handleInputChange = (e) => {
    const value = e.target.value;
    setBarcode(value);

    if (value.trim()) {
      const filteredSuggestions = productData
        .filter(p => p.barcode.toLowerCase().includes(value.toLowerCase().trim()))
        .map(p => p.barcode)
        .slice(0, 5); // Limit to 5 suggestions
      setSuggestions(filteredSuggestions);
      setIsDropdownOpen(true);
    } else {
      setSuggestions([]);
      setIsDropdownOpen(false);
    }
  };

  // Handle suggestion selection
  const handleSuggestionClick = (suggestion) => {
    setBarcode(suggestion);
    setSuggestions([]);
    setIsDropdownOpen(false);
  };

  // Handle search (for button click)
  const handleSearch = () => {
    const found = productData.find(p => p.barcode === barcode.trim());
    if (found) {
      setSelectedProduct(found);
      setNotFound(false);
    } else {
      setSelectedProduct(null);
      setNotFound(true);
    }
    setIsDropdownOpen(false);
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle close
  const handleClose = () => {
    setSelectedProduct(null);
    setBarcode('');
    setSuggestions([]);
    setIsDropdownOpen(false);
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 relative z-10">
      <motion.div className="relative w-full max-w-[90vw] sm:max-w-[80vw] md:max-w-[60vw] lg:max-w-[50vw] xl:max-w-[40vw] mx-auto" ref={inputRef}>
        <div className="relative">
          <input
            type="text"
            placeholder="Enter barcode number..."
            value={barcode}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
            className="w-full px-4 py-3 pr-12 rounded-full border-2 border-gradient-to-r from-green-400 to-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white bg-black/80 backdrop-blur-md text-sm sm:text-base font-orbitron font-semibold shadow-lg shadow-neon-green/50 glow-text"
          />
          <motion.button
            onClick={handleSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-500"
            aria-label="Search product"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 sm:h-6 sm:w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </motion.button>
        </div>

        {/* Suggestions Dropdown */}
        {isDropdownOpen && suggestions.length > 0 && (
          <motion.ul
            className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-lg shadow-xl mt-2 z-20 max-h-60 overflow-y-auto"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="px-4 py-3 text-sm sm:text-base text-gray-800 hover:bg-blue-50 hover:text-blue-600 cursor-pointer transition-colors duration-200 border-b border-gray-100 last:border-b-0"
              >
                {suggestion}
              </li>
            ))}
          </motion.ul>
        )}
      </motion.div>

      {notFound && (
        <motion.p
          className="mt-4 text-red-500 font-medium text-center text-sm sm:text-base"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Product not found.
        </motion.p>
      )}

      {/* Fullscreen ProductCard Modal */}
      {selectedProduct && <ProductCard product={selectedProduct} onClose={handleClose} />}
    </div>
  );
};

export default BarcodeSearch;

