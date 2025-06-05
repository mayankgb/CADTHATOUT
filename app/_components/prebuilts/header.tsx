"use client"
import { motion } from "motion/react"


export default function Header() {
    return (
        <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8 sm:mb-12"
    >
        <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">
            Prebuilt <span className="text-violet-600">Models & Resources</span>
        </h1>
        <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-2">
            Ready-to-use CAD models, circuit designs, and code libraries for your next project.
            Professional quality, tested resources to accelerate your development.
        </p>
    </motion.div>
    )
}