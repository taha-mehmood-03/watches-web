import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Heart, Eye } from "lucide-react";
import { setWatch } from "../../SIDEBAR-data/WatchManagement";
import { getDatabase } from "../../SIDEBAR-data/DatabasedataManagement";
import { setUserId } from "../../SIDEBAR-data/UserId";
import { setImage } from "../../SIDEBAR-data/ImageManagement";

// Circular Loader Component
const CircularLoader = ({ size = 40, color = "#3B82F6" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 40 40" 
    className="animate-spin"
  >
    <circle 
      cx="20" 
      cy="20" 
      r="18" 
      fill="none" 
      stroke={color} 
      strokeWidth="4" 
      strokeDasharray="113.097" 
      strokeDashoffset="56.548" 
      className="opacity-30"
    />
    <circle 
      cx="20" 
      cy="20" 
      r="18" 
      fill="none" 
      stroke={color} 
      strokeWidth="4" 
      strokeDasharray="113.097" 
      strokeDashoffset="113.097" 
      className="origin-center"
      style={{
        animation: 'spin 1s linear infinite',
        strokeDashoffset: '0'
      }}
    />
  </svg>
);

// Image Loader Component
const ImageLoader = ({ src, alt, className, onMouseEnter, onMouseLeave }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const image = new Image();
    image.src = src;
    image.onload = () => setIsLoading(false);
    image.onerror = () => {
      setIsLoading(false);
      setError(true);
    };
  }, [src]);

  if (error) {
    return (
      <div className="flex items-center justify-center w-full h-full bg-gray-200 text-red-500">
        Image Failed
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-10 bg-black/30">
          <CircularLoader />
        </div>
      )}
      <motion.img
        src={src}
        alt={alt}
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        style={{ transition: 'opacity 0.3s ease' }}
      />
    </div>
  );
};

// Skeleton Loading Component
const WatchCardSkeleton = () => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="bg-gray-800 rounded-lg overflow-hidden animate-pulse"
  >
    <div className="w-full pt-[100%] bg-gray-700 relative flex items-center justify-center">
      <CircularLoader size={50} color="#ffffff" />
    </div>
    <div className="p-4">
      <div className="h-6 bg-gray-600 rounded w-3/4 mx-auto mb-4"></div>
      <div className="flex justify-between items-center">
        <div className="h-5 bg-gray-600 rounded w-1/4"></div>
        <div className="h-10 bg-gray-600 rounded w-1/3"></div>
      </div>
    </div>
  </motion.div>
);

const Card = () => {
  const [hoveredImage, setHoveredImage] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentData = useSelector((state) => state.Databasedata.currentData);

  // Memoized image loading with context
  const loadImages = useMemo(() => {
    const context = require.context("../../../../public/images/", false, /\.(webp)$/);
    
    context.keys().sort((a, b) => {
      const indexA = parseInt(a.match(/(\d+)/)?.[0] || '0');
      const indexB = parseInt(b.match(/(\d+)/)?.[0] || '0');
      return indexA - indexB;
    }).forEach((key) => {
      importedImages[key] = context(key);
    });

    return importedImages;
  }, []);

  // Optimized initialization
  useEffect(() => {
    const initialize = async () => {
      try {
        await dispatch(getDatabase());
        
        const storedUserId = localStorage.getItem("userId");
        if (storedUserId) {
          dispatch(setUserId(storedUserId));
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error('Initialization failed:', error);
        setIsLoading(false);
      }
    };
  
    initialize();
  }, [dispatch]);
  

  // Image hover handlers
  const handleImageEnter = (id) => {
    setHoveredImage(id);
  };

  const handleImageLeave = () => {
    setHoveredImage(null);
  };

  // Memoized click handler
  const handleClick = useMemo(() => 
    (watch) => {
      dispatch(setImage(watch.images[0]));
      dispatch(setWatch(watch));
      navigate("/Ordering");
    }, [dispatch, navigate]
  );

  // Render method with image loader
  const renderWatchImage = useMemo(() => 
    (watch) => {
      const imageKey = watch.images[hoveredImage === watch.id ? 1 : 0];
      const imageUrl = loadImages[`./images/${imageKey}`] || '';

      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="relative w-full pt-[100%] overflow-hidden bg-gray-800 rounded-t-lg"
        >
          {imageUrl ? (
            <ImageLoader
              src={imageUrl}
              alt={watch.name}
              className="absolute top-0 left-0 w-full h-full object-contain"
              onMouseEnter={() => handleImageEnter(watch.id)}
              onMouseLeave={handleImageLeave}
            />
          ) : null}
          
          <AnimatePresence>
            {hoveredImage === watch.id && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute top-4 right-4 flex flex-col gap-2"
              >
                {[Heart, Eye].map((Icon, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 bg-white rounded-full shadow-lg"
                  >
                    <Icon className="w-5 h-5 text-gray-700" />
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      );
    }, 
    [hoveredImage, loadImages]
  );

  // Loading state with skeleton loaders
  if (isLoading) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 p-4"
      >
        {[...Array(6)].map((_, index) => (
          <WatchCardSkeleton key={index} />
        ))}
      </motion.div>
    );
  }

  // Main render
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
          className="group relative bg-black rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 z-40"
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