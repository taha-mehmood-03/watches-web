import React, { useState, useCallback, memo } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ToggleList = memo(({ title, items = [], onToggleItem, isChecked }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle the list visibility
  const handleToggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-md mx-auto"
    >
      <motion.div
        onClick={handleToggle}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="flex items-center justify-between p-4 bg-gray-900 text-white rounded-lg shadow-md cursor-pointer hover:bg-gray-800 transition-colors"
      >
        <h3 className="text-lg font-medium">{title}</h3>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-blue-400" />
        ) : (
          <ChevronDown className="w-5 h-5 text-blue-400" />
        )}
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-2 border border-gray-700 rounded-lg bg-gray-800"
          >
            {items.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center p-3 border-b border-gray-700 last:border-b-0 hover:bg-gray-700"
                onClick={() => onToggleItem(index)}
              >
                <input
                  type="checkbox"
                  checked={isChecked(index)}
                  readOnly
                  className="w-4 h-4 text-blue-600 border-gray-600 rounded focus:ring-blue-500 cursor-pointer"
                />
                <label className="ml-3 text-sm font-medium text-gray-300 cursor-pointer">
                  {item.name}
                </label>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
});

ToggleList.displayName = 'ToggleList';

export default ToggleList;