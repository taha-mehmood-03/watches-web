import React, { useState, Suspense, lazy } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";
import Footer from "../Footer/Footer";

const Navbar = lazy(() => import("../NAVIGATION-BAR/Navbar"));
const Sidebar = lazy(() => import("../SIDEBAR-data/Sidebar"));
const MainInterface = lazy(() => import("../MAIN/MainInterface"));

const LoadingSpinner = () => (
  <motion.div 
    className="flex justify-center items-center h-screen w-full"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <motion.div
      animate={{ 
        rotate: 360,
        scale: [1, 1.1, 1]
      }}
      transition={{ 
        duration: 1, 
        repeat: Infinity, 
        ease: "easeInOut",
        repeatType: "reverse"
      }}
    >
      <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
    </motion.div>
  </motion.div>
);

const Front = () => {
  const [toggle, setToggle] = useState(false);

  const handleClick = () => {
    setToggle(!toggle);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="
        min-h-screen 
        bg-gradient-to-br 
        from-gray-900 
        to-gray-800 
        text-white 
        overflow-x-hidden
      "
    >
      <AnimatePresence>
        <Suspense fallback={<LoadingSpinner />}>
          <Navbar handleClick={handleClick} />
        </Suspense>

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="
            pt-16 
            5xl:flex 5xl:justify-center 5xl:items-center 
            min-h-[calc(100vh-4rem)]
          "
        >
          <div className="
            flex gap-2 
            5xl:w-3/5 
            5xl:justify-center 
            w-full 
            max-w-screen-2xl 
            mx-auto
          ">
            <Suspense fallback={<LoadingSpinner />}>
              <Sidebar toggle={toggle} onToggle={handleClick} />
            </Suspense>

            <Suspense fallback={<LoadingSpinner />}>
              <MainInterface />
            </Suspense>
          </div>
        </motion.div>

        <Footer />
      </AnimatePresence>
    </motion.div>
  );
};

export default Front;