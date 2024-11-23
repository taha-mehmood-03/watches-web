import React, { useEffect, memo, Suspense, lazy, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Filter, X, Sliders } from "lucide-react";
import Selectinputs from "../SIDEBAR-data/SelectedInputs/Selectinputs";
import AOS from "aos";
import "aos/dist/aos.css";

// Lazy load subcomponents
const Brands = lazy(() => import("./Allcomps/Brands"));
const Color = lazy(() => import("./Allcomps/Color"));
const Features = lazy(() => import("./Allcomps/Features"));
const Gender = lazy(() => import("./Allcomps/Gender"));
const MovType = lazy(() => import("./Allcomps/MovType"));
const CaseSizes = lazy(() => import("./Allcomps/Casesizes"));
const Strap = lazy(() => import("./Allcomps/Strap"));
const Crystal = lazy(() => import("./Allcomps/Crystal"));
const Resistances = lazy(() => import("./Allcomps/Resistances"));

const LoadingFallback = () => (
  <div className="flex items-center justify-center p-4">
    <motion.div
      animate={{
        rotate: 360,
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: "easeInOut",
        repeatType: "reverse",
      }}
    >
      <Sliders className="w-8 h-8 text-blue-500 animate-pulse" />
    </motion.div>
  </div>
);

const Sidebar = ({ toggle, onToggle }) => {
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [activeSection, setActiveSection] = useState(null);

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "smooth",
      once: true,
    });

    const updateScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    updateScreenSize();
    window.addEventListener("resize", updateScreenSize);
    return () => window.removeEventListener("resize", updateScreenSize);
  }, []);

  const sidebarVariants = {
    open: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 350,
        damping: 35,
        staggerChildren: 0.1,
      },
    },
    closed: {
      x: "-100%",
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 350,
        damping: 35,
      },
    },
  };

  const overlayVariants = {
    open: {
      opacity: 1,
      backdropFilter: "blur(4px)",
      transition: { duration: 0.3 },
    },
    closed: {
      opacity: 0,
      backdropFilter: "blur(0px)",
      transition: { duration: 0.2 },
    },
  };

  const components = [
    { Component: Brands, label: "Brands", icon: <Filter /> },
    { Component: Gender, label: "Gender", icon: <Filter /> },
    { Component: Color, label: "Color", icon: <Filter /> },
    { Component: MovType, label: "Movement Type", icon: <Filter /> },
    { Component: Features, label: "Features", icon: <Filter /> },
    { Component: CaseSizes, label: "Case Sizes", icon: <Filter /> },
    { Component: Strap, label: "Strap", icon: <Filter /> },
    { Component: Crystal, label: "Crystal", icon: <Filter /> },
    { Component: Resistances, label: "Resistances", icon: <Filter /> },
  ];

  return (
    <AnimatePresence>
      {/* Overlay */}
      {!isLargeScreen && (
        <motion.div
          className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
          variants={overlayVariants}
          initial="closed"
          animate={toggle ? "open" : "closed"}
          onClick={() => {
            if (toggle) {
              onToggle();
            }
          }}
        />
      )}

      {/* Sidebar */}
      <motion.div
        initial="closed"
        animate={isLargeScreen || toggle ? "open" : "closed"}
        variants={sidebarVariants}
        className={`
          fixed lg:relative top-0 left-0 
           lg:mt-32 
          w-[85vw] sm:w-[75vw] md:w-[65vw] lg:w-[30vw] xl:w-[25vw]
          h-screen bg-gray-900/95 
          shadow-2xl border-r border-gray-700
          z-50 overflow-hidden
        `}
      >
        {/* Header */}
        <motion.div
          className="sticky top-0 z-20 bg-gray-800/90 backdrop-blur-md p-4 flex justify-between items-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center space-x-3">
            <Sliders className="w-6 h-6 text-blue-400" />
            <h2 className="text-xl font-bold text-white">Filters</h2>
          </div>

          {!isLargeScreen && (
            <motion.button
              onClick={onToggle}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-6 h-6 text-red-400" />
            </motion.button>
          )}
        </motion.div>

        {/* Selected Inputs */}
        <motion.div
          className="p-4 bg-gray-800/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Selectinputs />
        </motion.div>

        {/* Filter Sections */}
        <motion.div
          className="
            overflow-y-auto 
            h-[calc(100vh-200px)] 
            custom-scrollbar 
            pr-2 pl-2 pb-2
          "
          initial="closed"
          animate="open"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "#1E40AF #1F2937",
          }}
        >
          {components.map(({ Component, label, icon }, index) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, x: -50 }}
              animate={{
                opacity: 1,
                x: 0,
                transition: { delay: 0.4 + index * 0.1 },
              }}
              className="mb-2"
            >
              <motion.div
                className={`
                  group cursor-pointer 
                  ${
                    activeSection === label
                      ? "bg-blue-900/30"
                      : "hover:bg-gray-700/50"
                  }
                  rounded-lg transition-all duration-300 ease-in-out
                `}
                onClick={() =>
                  setActiveSection(activeSection === label ? null : label)
                }
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center p-3 space-x-3">
                  {React.cloneElement(icon, {
                    className: `w-5 h-5 ${
                      activeSection === label
                        ? "text-blue-400"
                        : "text-gray-400 group-hover:text-blue-300"
                    }`,
                  })}
                  <span
                    className={`
                    text-sm font-medium 
                    ${
                      activeSection === label
                        ? "text-blue-300"
                        : "text-gray-300 group-hover:text-white"
                    }
                  `}
                  >
                    {label}
                  </span>
                </div>
              </motion.div>

              {activeSection === label && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{
                    opacity: 1,
                    height: "auto",
                    transition: { duration: 0.3 },
                  }}
                >
                  <Suspense fallback={<LoadingFallback />}>
                    <Component />
                  </Suspense>
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Mobile Toggle Button */}
      {!isLargeScreen && !toggle && (
        <motion.button
          onClick={onToggle}
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="
            fixed top-1/2 left-0 z-100
            bg-blue-600/80 backdrop-blur-sm 
            p-3 rounded-r-lg text-white
            shadow-2xl hover:bg-blue-700/90 
          "
        >
          <ChevronRight className="w-6 h-6 " />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

// Global CSS for custom scrollbar
const scrollbarStyles = `
  .custom-scrollbar::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: #1F2937;  /* Tailwind gray-800 */
    border-radius: 10px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: #1E40AF;  /* Tailwind blue-800 */
    border-radius: 10px;
    transition: background-color 0.3s ease;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background-color: #2563EB;  /* Tailwind blue-600 */
  }
`;

export default memo(Sidebar);
