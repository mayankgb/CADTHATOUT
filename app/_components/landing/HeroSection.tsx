"use client"
import { motion, Variants } from "motion/react"
import { Inter } from "next/font/google";
import { useRouter } from "next/navigation";

const inter = Inter({
  subsets: ['latin'],
  weight: ['100', '200', '400', '500', '600', '700', '800', '900']
})

const buttonVariants: Variants = {
  hover: {
    scale: 1.05,
    boxShadow: "0 10px 30px rgba(99, 21, 227, 0.3)",
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1]
    }
  },
  tap: {
    scale: 0.95,
    transition: {
      duration: 0.1
    }
  }
};

const secondaryButtonVariants: Variants = {
  hover: {
    scale: 1.05,
    borderColor: '#6315e3',
    color: '#6315e3',
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1]
    }
  },
  tap: {
    scale: 0.95,
    transition: {
      duration: 0.1
    }
  }
};

export function Hero() {
  const router = useRouter()

  return (
    <section className={`pt-20 sm:pt-24 md:pt-32 pb-8 md:pb-20 px-4 sm:px-6 h-fit lg:min-h-screen relative ${inter.className}`}>
      {/* Gradient Background */}
      <div className="absolute h-full inset-0 bg-gradient-to-br from-[#6315e3]/10 to-[#9d88b2]/10" />
      
      <div className="mt-8 sm:mt-5 flex flex-col h-full items-center justify-center text-center relative">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-3 sm:mb-6 leading-tight px-2 text-[#1f1926]"
        >
          Your Ideas, Our CAD.
          <br />
          <span className="text-[#6315e3]">Design & Electronic routing</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-base sm:text-xl text-gray-600 mb-6 sm:mb-12 max-w-2xl mx-auto leading-relaxed px-2 sm:px-4"
        >
          Expert CAD services for drones, robotics, and custom products — with advanced electronic routing, circuit design, and ready-to-use models.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center w-full px-2 sm:px-0"
        >
          {/* Primary Button */}
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className="w-full sm:w-auto text-white px-5 sm:px-8 py-2.5 sm:py-4 rounded-full font-semibold text-sm sm:text-lg bg-[#6315e3]"
            onClick={() => router.push("/request-custom")}
          >
            Get Started
          </motion.button>

          {/* Secondary Button */}
          <motion.button
            variants={secondaryButtonVariants}
            whileHover="hover"
            whileTap="tap"
            className="w-full sm:w-auto border-2 border-gray-300 text-gray-700 px-5 sm:px-8 py-2.5 sm:py-4 rounded-full font-semibold text-sm sm:text-lg"
            onClick={() => router.push("/pre-built-shop")}
          >
            View Pre-Built Models
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
