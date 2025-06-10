"use client"

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Send, Zap, Cpu, Code, Wrench, Mail, FileText } from 'lucide-react';
import { toast } from 'sonner';
import { createCustomOrder } from '../lib/server-actions/actions';

interface FormData {
  email: string;
  description: string;
  services: string[];
}

interface ServiceOption {
  id: string;
  label: string;
  icon: React.ElementType;
  color: string;
}

const CustomDevelopmentPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    description: '',
    services: []
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const serviceOptions: ServiceOption[] = [
    { id: 'cad', label: 'CAD Design', icon: Wrench, color: 'from-purple-400 to-purple-500' },
    { id: 'Circuit Design or Codes', label: 'Circuit Design or Codes', icon: Cpu, color: 'from-purple-400 to-purple-500' },
    { id: 'CAE Analysis', label: 'CAE Analysis', icon: Zap, color: 'from-purple-400 to-purple-500' },
  ];

  const handleServiceToggle = (serviceId: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(serviceId)
        ? prev.services.filter(s => s !== serviceId)
        : [...prev.services, serviceId]
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitted(true);
    if (!formData.description || !formData.services.length || !formData.email) {
      if (!formData.description) {
        toast.error("please provide a valid descriptions")
        return
      }else if (!formData.services.length) {
        toast.error("please select atleast one services")
        return
      }else if (!formData.email) {
        toast.error("please provide email")
        return
      }
      toast.error("somthing went wrong")

      return
    }
    const response = await createCustomOrder({
      serviceName: formData.services,
      description: formData.description
    })

    if (response.status > 400) {
      toast.error(response.message)
      setIsSubmitted(false)
      return 
    }
    toast.success(response.message)
    setIsSubmitted(false)
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const dropdownVariants = {
    hidden: { opacity: 0, scale: 0.95, y: -10 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { duration: 0.2 }
    },
    exit: { 
      opacity: 0, 
      scale: 0.95, 
      y: -10,
      transition: { duration: 0.15 }
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Hero Section */}
      <motion.div 
        className="relative overflow-hidden bg-gray-50 pt-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center"
          >
            <motion.h1 
              variants={itemVariants}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6 text-gray-900"
            >
              Request Custom Development
            </motion.h1>
            <motion.p 
              variants={itemVariants}
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-2 sm:px-0"
            >
              Transform your ideas into reality with our expert CAD services, circuit design, and custom development solutions
            </motion.p>
          </motion.div>
        </div>
      </motion.div>

      {/* Form Section */}
      <motion.div 
        className="max-w-4xl mx-auto px-6 py-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          variants={itemVariants}
          className="bg-white rounded-2xl border border-gray-200 p-8 md:p-12 shadow-sm"
        >
          <div className="space-y-8">
            {/* Email Field */}
            <motion.div variants={itemVariants} className="space-y-3">
              <label className="flex items-center text-lg font-medium text-gray-700">
                <Mail className="w-5 h-5 mr-2 text-purple-500" />
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                placeholder="your.email@example.com"
                required
              />
            </motion.div>

            {/* Services Dropdown */}
            <motion.div variants={itemVariants} className="space-y-3">
              <label className="flex items-center text-lg font-medium text-gray-700">
                <Zap className="w-5 h-5 mr-2 text-purple-500" />
                Services Required
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-left flex items-center justify-between hover:bg-gray-100 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <span className="text-gray-700">
                    {formData.services.length === 0 
                      ? 'Select services you need' 
                      : `${formData.services.length} service${formData.services.length > 1 ? 's' : ''} selected`
                    }
                  </span>
                  <motion.div
                    animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-sm max-h-80 overflow-y-auto"
                    >
                      {serviceOptions.map((service) => {
                        const Icon = service.icon;
                        const isSelected = formData.services.includes(service.id);
                        return (
                          <motion.button
                            key={service.id}
                            type="button"
                            onClick={() => handleServiceToggle(service.id)}
                            className={`w-full px-4 py-3 text-left flex items-center hover:bg-gray-50 transition-all duration-200 ${
                              isSelected ? 'bg-purple-50 text-purple-700' : 'text-gray-700'
                            }`}
                            whileHover={{ x: 4 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Icon className="w-4 h-4 mr-3 text-purple-500" />
                            {service.label}
                            {isSelected && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="ml-auto w-2 h-2 bg-purple-500 rounded-full"
                              />
                            )}
                          </motion.button>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Selected Services Display */}
              {formData.services.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="flex flex-wrap gap-2 mt-3"
                >
                  {formData.services.map(serviceId => {
                    const service = serviceOptions.find(s => s.id === serviceId);
                    return service ? (
                      <motion.span
                        key={serviceId}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="px-3 py-1 bg-purple-50 text-purple-700 text-sm rounded-full flex items-center"
                      >
                        <service.icon className="w-3 h-3 mr-1 text-purple-500" />
                        {service.label}
                      </motion.span>
                    ) : null;
                  })}
                </motion.div>
              )}
            </motion.div>

            {/* Description Field */}
            <motion.div variants={itemVariants} className="space-y-3">
              <label className="flex items-center text-lg font-medium text-gray-700">
                <FileText className="w-5 h-5 mr-2 text-purple-500" />
                Project Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={6}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 resize-none"
                placeholder="Describe your project requirements, specifications, and any specific details that would help us understand your needs better..."
                required
              />
            </motion.div>

            {/* Submit Button */}
            <motion.div variants={itemVariants} className="pt-4">
              <motion.button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitted}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-8 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-70"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <AnimatePresence mode="wait">
                  {isSubmitted ? (
                    <motion.div
                      key="submitted"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="flex items-center space-x-2"
                    >
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Request Submitted!</span>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="submit"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="flex items-center space-x-2"
                    >
                      <Send className="w-5 h-5" />
                      <span>Submit Request</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </motion.div>
          </div>
        </motion.div>

        {/* Additional Info */}
        <motion.div 
          variants={itemVariants}
          className="mt-12 text-center"
        >
          <p className="text-gray-600 text-lg">
            We'll review your request and get back to you within 24 hours with a detailed proposal
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CustomDevelopmentPage;