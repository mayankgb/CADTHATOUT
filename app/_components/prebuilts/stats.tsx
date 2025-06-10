"use client"
import { motion } from "motion/react"


export default function Stats() {
    return (
        <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 mb-6 sm:mb-8 max-w-2xl mx-auto"
      >
        <div className="text-center p-3 sm:p-4 bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="text-xl sm:text-2xl font-bold text-violet-600">150+</div>
          <div className="text-xs sm:text-sm text-gray-600">CAD Models</div>
        </div>
        <div className="text-center p-3 sm:p-4 bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="text-xl sm:text-2xl font-bold text-yellow-600">80+</div>
          <div className="text-xs sm:text-sm text-gray-600">Circuit Models</div>
        </div>
        <div className="text-center p-3 sm:p-4 bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="text-xl sm:text-2xl font-bold text-green-600">120+</div>
          <div className="text-xs sm:text-sm text-gray-600">Code Libraries</div>
        </div>
        <div className="text-center p-3 sm:p-4 bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="text-xl sm:text-2xl font-bold text-gray-800">--</div>
          <div className="text-xs sm:text-sm text-gray-600">Downloads</div>
        </div>
      </motion.div>
    )
}