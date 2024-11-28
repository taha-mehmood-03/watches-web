import React from "react";
import { motion } from "framer-motion";
import { 
  Menu, 
  Search, 
  ShoppingBag, 
  User 
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {  useSelector } from "react-redux";
import Img1 from "./WDC-Email-Signature-400x50_300x.avif";

const Navbar = ({ handleClick }) => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); 

  const handleMenuClick = () => {
    if (window.matchMedia("(max-width: 1023px)").matches) {
      handleClick();
    }
  };

  const handleCartClick = () => {
    if (isAuthenticated) {
      // If logged in, go to the cart page
      navigate("../cart");
    } else {
      // If not logged in, redirect to login page
      navigate("./"); // Adjust this to your actual login page path
    }
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5,
        ease: "easeInOut"
      }}
      className="
        fixed top-0 left-0 right-0 
        flex w-full h-16 
        bg-gray-900/90 backdrop-blur-sm 
        justify-between items-center 
        z-60 
        border-b border-gray-700 
        shadow-lg
      "
    >
      {/* Mobile Menu Toggle */}
      <motion.div 
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="h-12 flex justify-center items-center mx-3"
      >
        <motion.button
          onClick={handleMenuClick}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="5xl:hidden"
        >
          <Menu className="text-white w-6 h-6 hover:text-blue-400 transition-colors" />
        </motion.button>
      </motion.div>

      {/* Logo */}
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="
          text-white w-68 lg:w-40 
          h-12 flex justify-center items-center 
          shadow-md rounded-lg
        "
      >
        <img 
          src={Img1} 
          className="h-full w-full object-contain" 
          alt="Logo" 
        />
      </motion.div>

      {/* Navigation Icons */}
      <motion.div 
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="
          w-36 gap-4 lg:w-40 lg:gap-6 
          2xl:w-44 2xl:gap-6 
          h-12 flex justify-center items-center
        "
      >
        {/* Profile Icon */}
        <motion.a 
          href="./" 
          className="hidden md:block"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <User className="text-white w-6 h-6 hover:text-blue-400 transition-colors" />
        </motion.a>

        {/* Search Icon */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Search className="text-white w-6 h-6 hover:text-blue-400 transition-colors" />
        </motion.button>

        {/* Cart Icon */}
        <motion.a 
          onClick={handleCartClick}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ShoppingBag className="text-white w-6 h-6 hover:text-blue-400 transition-colors" />
        </motion.a>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;