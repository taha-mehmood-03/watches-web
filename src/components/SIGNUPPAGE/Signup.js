import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Lock, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import api from '../API/Api';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  // ... [Previous state and handlers remain the same]
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    showPassword: false,
    isLoading: false,
  });
  
  const [errors, setErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});
  
  const navigate = useNavigate();

  // Form validation
  const validateForm = useCallback(() => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    } else if (formData.firstName.length < 2) {
      newErrors.firstName = 'First name must be at least 2 characters';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    } else if (formData.lastName.length < 2) {
      newErrors.lastName = 'Last name must be at least 2 characters';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (touchedFields[name]) {
      validateForm();
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouchedFields(prev => ({ ...prev, [name]: true }));
    validateForm();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the errors before submitting');
      return;
    }

    setFormData(prev => ({ ...prev, isLoading: true }));

    try {
      const { firstName, lastName, email, password } = formData;
      const response = await api.post('/auth/signup', {
        firstName,
        lastName,
        email,
        password
      });

      toast.success('Account created successfully!');
      setTimeout(() => navigate('../'), 1000);
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'An error occurred during signup';
      setErrors(prev => ({ ...prev, submit: errorMessage }));
      toast.error(errorMessage);
    } finally {
      setFormData(prev => ({ ...prev, isLoading: false }));
    }
  };

  const togglePasswordVisibility = () => {
    setFormData(prev => ({ ...prev, showPassword: !prev.showPassword }));
  };

  // Input field component
  const InputField = ({ icon: Icon, type, name, placeholder, value }) => (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-300" htmlFor={name}>
        {name.split(/(?=[A-Z])/).join(' ').toUpperCase()}
      </label>
      <div className="relative">
        <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
          type={name === 'password' ? (formData.showPassword ? 'text' : 'password') : type}
          id={name}
          name={name}
          value={value}
          onChange={handleInputChange}
          onBlur={handleBlur}
          className={`w-full pl-10 pr-4 py-2 bg-black/50 border ${
            errors[name] && touchedFields[name] ? 'border-red-500' : 'border-gray-600'
          } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400`}
          placeholder={placeholder}
        />
        {name === 'password' && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 focus:outline-none"
          >
            {formData.showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        )}
      </div>
      <AnimatePresence>
        {errors[name] && touchedFields[name] && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-red-400 text-sm mt-1"
          >
            {errors[name]}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-2xl p-8" // Increased from max-w-md to max-w-2xl
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
              Create Account
            </motion.h2>
            <p className="mt-2 text-gray-400">Sign up for a new account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                icon={User}
                type="text"
                name="firstName"
                placeholder="Enter your first name"
                value={formData.firstName}
              />
              
              <InputField
                icon={User}
                type="text"
                name="lastName"
                placeholder="Enter your last name"
                value={formData.lastName}
              />
            </div>
            
            <InputField
              icon={Mail}
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
            />
            
            <InputField
              icon={Lock}
              type="password"
              name="password"
              placeholder="Create a password"
              value={formData.password}
            />

            {errors.submit && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-red-400 text-sm"
              >
                <AlertCircle className="h-4 w-4" />
                <span>{errors.submit}</span>
              </motion.div>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={formData.isLoading}
              className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-lg shadow-lg transform transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              {formData.isLoading ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                'Create Account'
              )}
            </motion.button>

            <div className="flex items-center justify-center text-sm">
              <motion.a
                whileHover={{ scale: 1.05 }}
                href="../"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Already have an account? Sign in
              </motion.a>
            </div>
          </form>
        </div>
      </motion.div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default Signup;