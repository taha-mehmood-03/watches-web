import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { ArrowUpDown, ListFilter } from "lucide-react";
import { setData } from "../../SIDEBAR-data/DatabasedataManagement";

const Header = () => {
  const currentData = useSelector((state) => state.Databasedata.currentData);
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentData) {
      setCount(currentData.length);
    }
  }, [currentData]);

  const handleSelectChange = useCallback((event) => {
    const selectedOption = event.target.value;
    let sortedData = [...currentData]; // Create a copy of the array
    
    switch (selectedOption) {
      case "price-asc":
        sortedData = sortedData.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        sortedData = sortedData.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        sortedData = sortedData.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        sortedData = sortedData.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        sortedData = currentData;
    }
    
    dispatch(setData(sortedData));
  }, [currentData, dispatch]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5,
        ease: "easeInOut"
      }}
      className="flex justify-between items-center w-full p-4 bg-gray-900 text-white shadow-2xl rounded-lg"
    >
      {/* Product Count */}
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="flex items-center space-x-2"
      >
        <ListFilter className="w-6 h-6 text-blue-400" />
        <p className="text-lg font-semibold text-gray-200">
          {count} Products
        </p>
      </motion.div>

      {/* Sort Dropdown */}
      <motion.div 
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="relative w-72"
      >
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="relative"
        >
          <select
            className="
              w-full h-12 pl-10 pr-4 
              text-lg rounded-md 
              bg-gray-800 text-white 
              border border-gray-700 
              focus:outline-none 
              focus:ring-2 focus:ring-blue-500
              appearance-none
            "
            onChange={handleSelectChange}
          >
            <option value="sort" className="bg-gray-800">Sort</option>
            <option value="price-asc" className="bg-gray-800">Price: Low to High</option>
            <option value="price-desc" className="bg-gray-800">Price: High to Low</option>
            <option value="name-asc" className="bg-gray-800">Name: A to Z</option>
            <option value="name-desc" className="bg-gray-800">Name: Z to A</option>
          </select>
          
          {/* Custom dropdown icon */}
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <ArrowUpDown className="w-5 h-5 text-gray-400" />
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Header;