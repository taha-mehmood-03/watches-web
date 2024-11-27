import React from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
const ObjectInfo = () => {
  const currentCartData = useSelector(
    (state) => state.CartDatabasedata.currentCartData
  );

  const totalPrice = currentCartData.reduce((total, watch) => {
    // Ensure price is a number, default to 0 if not
    const price = Number(watch.price) || 0;
    const quantity = Number(watch.quantity) || 0;
    return total + price * quantity;
  }, 0);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-2xl p-8"
      >
        <div className="absolute inset-0 bg-white/10 backdrop-blur-lg rounded-2xl" />

        <div className="relative z-10 space-y-8">
          <div className="text-center">
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
            >
              Your Cart
            </motion.h2>
            <p className="mt-2 text-gray-400">Review your selected items</p>
          </div>

          <div className="space-y-4">
            {currentCartData.map((watch, index) => {
              const imageSrc = require(`../../../public/images/${watch.images[0]}`);

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center bg-black/50 border border-gray-600 rounded-lg p-4 space-x-4"
                >
                  <div className="relative">
                    <img
                      src={imageSrc}
                      alt={watch.name || "Product"}
                      className="w-20 h-20 object-contain rounded-md"
                    />
                    <div className="absolute -top-2 -right-2 bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">
                      {Number(watch.quantity) || 0}
                    </div>
                  </div>

                  <div className="flex-grow">
                    <h3 className="text-white font-medium text-lg uppercase">
                      {watch.name || "Unnamed Product"}
                    </h3>
                  </div>

                  <div className="text-blue-400 font-bold">
                    ${(Number(watch.price) || 0).toFixed(2)}
                  </div>
                </motion.div>
              );
            })}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: currentCartData.length * 0.1 }}
              className="flex justify-between items-center bg-black/50 border border-gray-600 rounded-lg p-4"
            >
              <span className="text-white text-xl font-bold">Total:</span>
              <span className="text-blue-400 text-2xl font-bold">
                ${totalPrice.toFixed(2)}
              </span>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ObjectInfo;
