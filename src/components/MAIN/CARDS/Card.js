import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { ShoppingCart, Heart, Eye } from "lucide-react";
import { setWatch } from "../../SIDEBAR-data/WatchManagement";
import { getDatabase } from "../../SIDEBAR-data/DatabasedataManagement";
import { setUserId } from "../../SIDEBAR-data/UserId";
import { setImage } from "../../SIDEBAR-data/ImageManagement";

// Import handling remains the same
const imageImports = [];
function importAll(r) {
  const keys = r.keys();
  keys.sort((a, b) => {
    const indexA = parseInt(a.match(/(\d+)/)[0]);
    const indexB = parseInt(b.match(/(\d+)/)[0]);
    return indexA - indexB;
  });
  keys.forEach((key) => imageImports.push(r(key)));
}
const context = require.context("../Watchimages/", false, /\.(webp)$/);
importAll(context);

const Card = () => {
  const [hoveredImage, setHoveredImage] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentData = useSelector((state) => state.Databasedata.currentData);

  useEffect(() => {
    dispatch(getDatabase());
  }, [dispatch]);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      dispatch(setUserId(storedUserId));
    }
  }, [dispatch]);

  const handleImageEnter = (id) => {
    setHoveredImage(id);
  };

  const handleImageLeave = () => {
    setHoveredImage(null);
  };

  const handleClick = (watch) => {
    dispatch(setImage(watch.images[0]));
    dispatch(setWatch(watch));
    navigate("/Ordering");
  };

  const renderWatchImage = useCallback(
    (watch) => {
      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="relative w-full pt-[100%] overflow-hidden bg-gray-800 rounded-t-lg"
        >
          <motion.img
            src={hoveredImage === watch.id ? watch.images[1] : watch.images[0]}
            alt={watch.name}
            className="absolute top-0 left-0 w-full h-full object-contain"
            onMouseEnter={() => handleImageEnter(watch.id)}
            onMouseLeave={handleImageLeave}
            loading="lazy"
            layoutId={`watch-${watch.id}`}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: hoveredImage === watch.id ? 1 : 0 }}
            className="absolute top-4 right-4 flex flex-col gap-2"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 bg-white rounded-full shadow-lg"
            >
              <Heart className="w-5 h-5 text-gray-700" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 bg-white rounded-full shadow-lg"
            >
              <Eye className="w-5 h-5 text-gray-700" />
            </motion.button>
          </motion.div>
        </motion.div>
      );
    },
    [hoveredImage]
  );

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 p-4"
    >
      {currentData.map((watch) => (
        <motion.div
          key={watch.id}
          layoutId={`card-${watch.id}`}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ y: -5 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="group relative bg-black rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
          onClick={() => handleClick(watch)}
        >
          {renderWatchImage(watch)}
          
          <motion.div 
            className="w-full flex flex-col items-center justify-start bg-gray-900 p-4 rounded-b-lg"
          >
            <motion.p 
              className="w-full text-center text-gray-100 font-semibold text-lg mb-2 truncate"
              layoutId={`name-${watch.id}`}
            >
              {watch.name}
            </motion.p>
            
            <motion.div className="flex items-center justify-between w-full">
              <motion.span 
                className="text-xl font-bold text-gray-300"
                layoutId={`price-${watch.id}`}
              >
                ${watch.price}
              </motion.span>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Add to Cart</span>
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default Card;