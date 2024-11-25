




import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { ShoppingCart, Heart, Eye } from "lucide-react";
import { setWatch } from "../../SIDEBAR-data/WatchManagement";
import { getDatabase } from "../../SIDEBAR-data/DatabasedataManagement";
import { setUserId } from "../../SIDEBAR-data/UserId";
import { setImage } from "../../SIDEBAR-data/ImageManagement";

// Image import handling with debug logs
const imageImports = [];
function importAll(r) {
  try {
    const keys = r.keys();
    console.log("Available image keys:", keys); // Debug log for available images

    keys.sort((a, b) => {
      const indexA = parseInt(a.match(/(\d+)/)[0]);
      const indexB = parseInt(b.match(/(\d+)/)[0]);
      return indexA - indexB;
    });

    keys.forEach((key) => {
      try {
        const image = r(key);
        imageImports.push(image);
        console.log("Successfully imported:", key); // Log each successful import
      } catch (err) {
        console.error("Failed to import image:", key, err);
      }
    });

    console.log("Total images imported:", imageImports.length); // Log total imports
  } catch (error) {
    console.error("Error in importAll function:", error);
  }
}

try {
  const context = require.context("../Watchimages/", false, /\.(webp)$/);
  console.log("Context created successfully"); // Debug log for context creation
  importAll(context);
} catch (error) {
  console.error("Error creating context:", error);
}

const Card = () => {
  const [hoveredImage, setHoveredImage] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentData = useSelector((state) => state.Databasedata.currentData);

  // Database fetching with debug logs
  useEffect(() => {
    console.log("Fetching database data..."); // Debug log before fetch
    dispatch(getDatabase())
      .then(() => {
        console.log("Database fetch successful");
      })
      .catch((error) => {
        console.error("Database fetch failed:", error);
      });
  }, [dispatch]);

  // Debug log for current data changes
  useEffect(() => {
    console.log("Current database data:", currentData);
  }, [currentData]);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      console.log("Found stored userId:", storedUserId); // Debug log for userId
      dispatch(setUserId(storedUserId));
    } else {
      console.log("No stored userId found");
    }
  }, [dispatch]);

  const handleImageEnter = (id) => {
    setHoveredImage(id);
    console.log("Image hover entered:", id); // Debug log for hover state
  };

  const handleImageLeave = () => {
    setHoveredImage(null);
    console.log("Image hover left"); // Debug log for hover state
  };

  const handleClick = (watch) => {
    console.log("Watch clicked:", watch); // Debug log for click handling
    dispatch(setImage(watch.images[0]));
    dispatch(setWatch(watch));
    navigate("/Ordering");
  };

  const renderWatchImage = useCallback(
    (watch) => {
      console.log("Rendering images for watch:", watch.name); // Debug log for each watch's image render
      const imageUrl = `/${watch.images[hoveredImage === watch.id ? 1 : 0]}`;
      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="relative w-full pt-[100%] overflow-hidden bg-gray-800 rounded-t-lg"
        >
          <motion.img
            src={imageUrl}
            alt={watch.name}
            className="absolute top-0 left-0 w-full h-full object-contain"
            onMouseEnter={() => handleImageEnter(watch.id)}
            onMouseLeave={handleImageLeave}
            loading="lazy"
            layoutId={`watch-${watch.id}`}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onError={(e) => {
              console.error(
                "Image failed to load:",
                watch.images[hoveredImage === watch.id ? 1 : 0]
              );
              // You might want to set a fallback image here
            }}
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

  // Debug log for rendering
  console.log("Rendering cards with data length:", currentData?.length);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 p-4"
    >
      {currentData.map((watch) => {
        console.log("Rendering card for watch:", watch.name); // Debug log for each card

        return (
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

            <motion.div className="w-full flex flex-col items-center justify-start bg-gray-900 p-4 rounded-b-lg">
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
        );
      })}
    </motion.div>
  );
};

export default Card;
