import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import api from '../API/Api';
import { MapPin, User, Phone, Mail, Home } from 'lucide-react';

const AddressInfo = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    country: "United States",
    state: "",
    postalCode: "",
    phone: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddAddress = async (e) => {
    e.preventDefault();
    const { firstName, lastName, postalCode, phone, address } = formData;
    const userId = localStorage.getItem("userId");
    try {
      const response = await api.post('/AddAddress', {
        userId,
        firstName,
        lastName,
        postalCode,
        phone,
        address
      });
      console.log("info stored:", response.data);
      navigate("../Front");
    } catch (error) {
      console.error("Error adding address:", error);
    }
  };

  const InputField = ({ icon: Icon, name, type = "text", placeholder }) => (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-300" htmlFor={name}>
        {name.split(/(?=[A-Z])/).join(' ').toUpperCase()}
      </label>
      <div className="relative">
        <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
          type={type}
          id={name}
          name={name}
          value={formData[name]}
          onChange={handleChange}
          className="w-full pl-10 pr-4 py-2 bg-black/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
          placeholder={placeholder}
          required
        />
      </div>
    </div>
  );

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
              Shipping Address
            </motion.h2>
            <p className="mt-2 text-gray-400">Please provide your shipping details</p>
          </div>

          <form onSubmit={handleAddAddress} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                icon={User}
                name="firstName"
                placeholder="Enter your first name"
              />
              
              <InputField
                icon={User}
                name="lastName"
                placeholder="Enter your last name"
              />
            </div>
            
            <InputField
              icon={Home}
              name="address"
              placeholder="Enter your street address"
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                icon={MapPin}
                name="city"
                placeholder="Enter your city"
              />
              
              <InputField
                icon={MapPin}
                name="state"
                placeholder="Enter your state"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                icon={Mail}
                name="postalCode"
                placeholder="Enter postal code"
              />
              
              <InputField
                icon={Phone}
                name="phone"
                placeholder="Enter phone number"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-lg shadow-lg transform transition-all duration-200"
            >
              Save Address
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default AddressInfo;