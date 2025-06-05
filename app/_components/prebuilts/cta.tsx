"use client"
import { Button } from "@/components/ui/button"
import { Cpu } from "lucide-react"
import { motion } from "motion/react"

export default function CTA() {
    return (
        <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mt-8 sm:mt-16 text-center bg-gradient-to-r from-violet-600 to-violet-700 rounded-xl sm:rounded-2xl p-4 sm:p-8 text-white"
      >
        <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">Need Custom Development?</h2>
        <p className="text-sm sm:text-base text-violet-100 mb-4 sm:mb-6 max-w-2xl mx-auto">
          Can't find what you're looking for? Our expert team can create custom CAD models, 
          circuit designs, and software solutions tailored to your specific requirements.
        </p>
        <Button size="lg" variant="secondary" className="bg-white text-violet-600 hover:bg-gray-100 text-sm sm:text-base">
          <Cpu className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" />
          Request Custom Development
        </Button>
      </motion.div>

    )
}