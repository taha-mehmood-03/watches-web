import React, { useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { getCartdata, setCartdata } from "../../SIDEBAR-data/Cartdatabase";
import api from "../../API/Api";
import { useDebounce } from "use-debounce";
import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";

const BoughtWatch = () => {
  const [quantity, setQuantity] = React.useState({});
  const [total, setTotal] = React.useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentCartData = useSelector(
    (state) => state.CartDatabasedata.currentCartData
  );

  const [debouncedQuantity] = useDebounce(quantity, 300);

  const updateQuantity = useCallback(
    async (name, userId, qty) => {
      try {
        const response = await api.put("/updatecart", {
          name: name,
          userId: userId,
          quantity: qty,
        });

        if (response.status === 200) {
          dispatch(getCartdata());
        } else {
          console.error("Error updating quantity:", response.data.message);
        }
      } catch (error) {
        console.error("Error updating quantity:", error);
      }
    },
    [dispatch]
  );

  useEffect(() => {
    Object.keys(debouncedQuantity).forEach((name) => {
      const userId = localStorage.getItem("userId");
      const qty = debouncedQuantity[name] || 1;
      updateQuantity(name, userId, qty);
    });
  }, [debouncedQuantity, updateQuantity]);

  const handleQuantity = useCallback(
    (e, name) => {
      const value = parseInt(e.target.value, 10) || 1;
      setQuantity((prevQuantity) => ({
        ...prevQuantity,
        [name]: value,
      }));
    },
    []
  );

  const calculateTotal = useCallback(() => {
    const total = currentCartData.reduce((acc, watch) => {
      const qty = quantity[watch.name] || 1;
      return acc + watch.price * qty;
    }, 0);
    setTotal(total);
  }, [currentCartData, quantity]);

  useEffect(() => {
    dispatch(getCartdata());
  }, [dispatch]);

  useEffect(() => {
    calculateTotal();
  }, [currentCartData, quantity, calculateTotal]);

  const deleteWatch = useCallback(
    async (name) => {
      try {
        const response = await api.delete("/deleting", {
          data: { name },
        });

        if (response.status === 200) {
          const newArray = currentCartData.filter((item) => item.name !== name);
          dispatch(setCartdata(newArray));
        } else {
          console.error("Error deleting the watch:", response.data.message);
        }
      } catch (error) {
        console.error("Error making delete request:", error);
      }
    },
    [currentCartData, dispatch]
  );

  const handleAddress = () => {
    navigate("../info");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-4xl pt-8"
      >
        <div className="absolute inset-0 bg-white/10 backdrop-blur-lg rounded-2xl" />
        
        <div className="relative z-10 space-y-8">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent text-center"
          >
            Your Cart
          </motion.h2>

          <div className="space-y-4 ">
            <AnimatePresence>
              {currentCartData && currentCartData.map((watch, index) => (
                <CartItem
                  key={index}
                  watch={watch}
                  quantity={quantity[watch.name] || 1}
                  handleQuantity={handleQuantity}
                  deleteWatch={deleteWatch}
                />
              ))}
            </AnimatePresence>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex justify-between items-center border-t border-gray-600 pt-4"
          >
            <div className="text-xl font-medium text-gray-300">Subtotal</div>
            <div className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              ${total.toFixed(2)}
            </div>
          </motion.div>

          <div className="flex justify-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={calculateTotal}
              className="py-3 px-6 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-medium rounded-lg shadow-lg transform transition-all duration-200"
            >
              Update Cart
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddress}
              className="py-3 px-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-lg shadow-lg transform transition-all duration-200"
            >
              Checkout
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};


  const CartItem = React.memo(({ watch, quantity, handleQuantity, deleteWatch }) => (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
      className="flex sm:items-center bg-black/30 border border-gray-700 rounded-lg p-4 space-x-4 "
    >
      {/* Image container */}
      <div className="w-1/4 min-w-[80px] min-h-[80px] sm:min-w-[100px] sm:min-h-[100px]">
        <motion.img
          whileHover={{ scale: 1.05 }}
          src={watch.images[0]}
          alt={watch.name}
          className="w-full h-auto object-contain rounded-md"
        />
      </div>
      
      {/* Content container */}
      <div className="flex-grow space-y-2 max-w-[75%] sm:max-w-[80%]">
        <h3 className="text-lg font-bold text-white uppercase tracking-wide truncate">
          {watch.name}
        </h3>
        <div className="flex items-center space-x-4">
          {/* Quantity input */}
          <div className="relative flex-grow max-w-16   sm:max-w-32">
            <input
              type="number"
              value={quantity}
              onChange={(e) => handleQuantity(e, watch.name)}
              className="w-full pl-3 pr-10 py-2 bg-black/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
            />
          </div>
  
          {/* Price */}
          <div className="text-lg text-gray-300">
            ${watch.price}
          </div>
  
          {/* Delete button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => deleteWatch(watch.name)}
            className="text-red-400 hover:text-red-500 transition-colors"
          >
            <Trash2 className="h-5 w-5" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  ));
  


export default BoughtWatch;