import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, ChevronUp, ChevronDown, Plane, Calendar, Shield, Lock } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Selectedwatch } from "../../../SIDEBAR-data/WatchManagement";
import { TypeAnimation } from "react-type-animation";

const Addcart = () => {
  const [togglemenu, setTogglemenu] = useState(false);
  const navigate = useNavigate();
  const currentWatch = useSelector((state) => state.watch.currentWatch);
  const dispatch = useDispatch();

  const handleToggle = () => {
    setTogglemenu(!togglemenu);
  };

  const getSpecs = () => {
    return (
      <div className="w-full px-5 text-gray-300">
        <p>Case: 38mm Polycarbonate</p>
        <p>Crown: Brushed Stainless Steel Hexagon</p>
        <p>Dial: Teal W / White Markers</p>
        <p>Hands: Soft White</p>
        <p>Band: 18mm Nylon Interchangeable Pull Through Strap</p>
        <p>Buckle & Finishing: Brushed Stainless Steel Buckle And Finishing</p>
      </div>
    );
  };

  const buyingwatch = () => {
    if (currentWatch) {
      dispatch(Selectedwatch(currentWatch, navigate, 1));
    } else {
      console.error("No watch selected.");
    }
  };

  const specVariants = {
    open: {
      height: "auto",
      opacity: 1,
      transition: { 
        duration: 0.3,
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    closed: {
      height: 0,
      opacity: 0,
      transition: { 
        duration: 0.2 
      }
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center bg-black text-white p-4 rounded-lg w-[100vw] lg:w-[500px] lg:max-w-[90vw] 2xl:w-[38vw] 2xl:max-w-[1000px] 5xl:w-[25vw]"
    >
      <motion.div 
        className="w-full text-center mb-4"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <motion.h3 className="text-4xl mb-2">
          <TypeAnimation
            sequence={[
              currentWatch.name,
              1000,
              "",
              90,
              2000,
            ]}
            wrapper="span"
            cursor={true}
            repeat={Infinity}
            style={{ display: "inline-block" }}
          />
        </motion.h3>
        <p className="text-2xl text-red-700">
          ${currentWatch.price} USD
        </p>
      </motion.div>

      <motion.div 
        className="w-full border-t border-gray-500 py-4"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleToggle}
      >
        <div className="flex justify-between items-center">
          <h3 className="text-2xl">SPECIFICATIONS</h3>
          {togglemenu ? <ChevronUp /> : <ChevronDown />}
        </div>
      </motion.div>

      <AnimatePresence>
        {togglemenu && (
          <motion.div
            variants={specVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="w-full overflow-hidden"
          >
            {getSpecs()}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        className="w-full bg-blue-600 text-white py-3 rounded-full mt-4"
        onClick={buyingwatch}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="flex items-center justify-center gap-2">
          <ShoppingCart className="w-5 h-5" />
          ADD TO CART
        </div>
      </motion.button>

      <div className="w-full grid grid-cols-4 gap-4 mt-6 text-center">
        {[
          { icon: Plane, text: "Free Shipping" },
          { icon: Calendar, text: "30 Day Returns" },
          { icon: Shield, text: "Authorized Dealer" },
          { icon: Lock, text: "Secure Checkout" }
        ].map((item, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex flex-col items-center"
          >
            <item.icon className="text-4xl text-gray-300 mb-2" />
            <span className="text-sm">{item.text}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Addcart;